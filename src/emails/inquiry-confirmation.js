import {Body, Container, Head, Heading, Hr, Html, Link, Preview, Text} from "@react-email/components";
import {getInterests} from "@/app/inquire/interests";
import {colors, fontStack} from "@/emails/theme";

export default function InquiryConfirmation({name, interest = [], message}) {
    const firstName = name.split(" ")[0];
    const topics = getInterests(interest).map((i) => i.label).join(", ");

    return (
        <Html lang="en">
            <Head/>
            <Preview>Thanks for reaching out. I'll get back to you soon.</Preview>
            <Body style={{backgroundColor: colors.background, fontFamily: fontStack, color: colors.foreground, margin: 0, padding: "32px 0"}}>
                <Container style={{maxWidth: 560, backgroundColor: colors.card, border: `1px solid ${colors.border}`, padding: 32}}>
                    <Heading as="h1" style={{fontSize: 26, margin: "0 0 16px"}}>Thanks, {firstName}!</Heading>
                    <Text style={{fontSize: 16, lineHeight: "26px"}}>
                        I got your message{topics ? ` about ${topics}` : ""} and will get back to you as soon as I can,
                        usually within a couple of days.
                    </Text>
                    <Text style={{fontSize: 16, lineHeight: "26px"}}>
                        If you need to add anything, just reply to this email.
                    </Text>
                    <Text style={{fontSize: 16, lineHeight: "26px", margin: "24px 0 0"}}>
                        Aidan Mascoli<br/>
                        <Link href="https://aidanmascoli.com" style={{color: colors.indigo}}>aidanmascoli.com</Link>
                    </Text>

                    <Hr style={{borderColor: colors.border, margin: "24px 0 16px"}}/>
                    <Text style={{color: colors.muted, fontSize: 12, textTransform: "uppercase", letterSpacing: 2, margin: "0 0 8px"}}>
                        Your message
                    </Text>
                    <Text style={{color: colors.muted, fontSize: 14, lineHeight: "22px", whiteSpace: "pre-wrap", margin: 0}}>{message}</Text>
                </Container>
            </Body>
        </Html>
    );
}

InquiryConfirmation.PreviewProps = {
    name: "Jordan Lee",
    interest: ["webdev", "video"],
    message: "Hi Aidan,\n\nI came across your portfolio and would love to talk about a summer internship on our web team.\n\nBest,\nJordan",
};
