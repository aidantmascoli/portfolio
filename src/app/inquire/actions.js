'use server'

import {headers} from "next/headers";
import {Resend} from "resend";
import {z} from "zod";
import {interestKeys} from "@/app/inquire/interests";
import InquiryNotification from "@/emails/inquiry-notification";
import InquiryConfirmation from "@/emails/inquiry-confirmation";

const resend = new Resend(process.env.RESEND_API_KEY);

const inquirySchema = z.object({
    name: z.string().trim().min(1, "Name is required").max(100, "Name is too long"),
    email: z.string().trim().pipe(z.email("Must be a valid email")),
    interest: z.array(z.enum(interestKeys)).min(1, "Please select an area of interest"),
    message: z.string().trim().min(1, "Message is required").max(5000, "Message is too long (5,000 characters max)"),
});

const GENERIC_ERROR = "Failed to send message. Please try again, or email me directly.";

async function verifyTurnstile(token) {
    if (!token) return false;

    const body = new URLSearchParams({
        secret: process.env.TURNSTILE_SECRET_KEY,
        response: token,
    });
    const ip = (await headers()).get("x-forwarded-for")?.split(",")[0]?.trim();
    if (ip) body.append("remoteip", ip);

    try {
        const res = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {method: "POST", body});
        const result = await res.json();
        return result.success === true;
    } catch {
        return false;
    }
}

/**
 * Called directly from the inquire form.
 * Returns { ok: true } or { ok: false, errors: { field?: string, submit?: string } }.
 */
export async function sendInquiry(input) {
    // Honeypot: real visitors never see or fill this field. Pretend it worked so bots move on.
    if (input?.company) return {ok: true};

    const parsed = inquirySchema.safeParse(input);
    if (!parsed.success) {
        const errors = {};
        for (const issue of parsed.error.issues) {
            const field = issue.path[0];
            if (field && !errors[field]) errors[field] = issue.message;
        }
        return {ok: false, errors};
    }

    if (!(await verifyTurnstile(input.turnstileToken))) {
        return {ok: false, errors: {submit: "Verification failed. Please try again."}};
    }

    const {name, email, interest, message} = parsed.data;
    const from = process.env.CONTACT_FROM_EMAIL; // e.g. "Aidan Mascoli <contact@aidanmascoli.com>"

    // Notification to me — replying goes straight to the visitor.
    const {error} = await resend.emails.send({
        from,
        to: process.env.CONTACT_TO_EMAIL,
        replyTo: email,
        subject: `New inquiry from ${name}`,
        react: <InquiryNotification name={name} email={email} interest={interest} message={message}/>,
    });

    if (error) {
        console.error("Resend notification failed:", error);
        return {ok: false, errors: {submit: GENERIC_ERROR}};
    }

    // Confirmation to the visitor. Only reached after Turnstile passes, so it can't be
    // used to spam arbitrary addresses. A failure here shouldn't fail the submission.
    const confirmation = await resend.emails.send({
        from,
        to: email,
        // Public address (forwarded by Cloudflare Email Routing) so your personal inbox stays private
        replyTo: process.env.CONTACT_REPLY_TO_EMAIL || process.env.CONTACT_TO_EMAIL,
        subject: "Thanks for reaching out!",
        react: <InquiryConfirmation name={name} interest={interest} message={message}/>,
    });
    if (confirmation.error) console.error("Resend confirmation failed:", confirmation.error);

    return {ok: true};
}
