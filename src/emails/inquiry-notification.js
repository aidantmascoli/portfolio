import {Body, Container, Head, Heading, Hr, Html, Link, Preview, Text} from "@react-email/components";
import {colors, fontStack} from "@/emails/theme";

export default function InquiryNotification({name, email, subject, message}) {
    return (
        <Html lang="en">
            <Head/>
            <Preview>{`${name}: ${subject}`}</Preview>
            <Body style={{backgroundColor: colors.background, fontFamily: fontStack, color: colors.foreground, margin: 0, padding: "32px 0"}}>
                <Container style={{maxWidth: 560, backgroundColor: colors.card, border: `1px solid ${colors.border}`, padding: 32}}>
                    <Text style={{color: colors.indigo, fontSize: 12, letterSpacing: 2, textTransform: "uppercase", margin: 0}}>
                        aidanmascoli.com · New inquiry
                    </Text>
                    <Heading as="h1" style={{fontSize: 26, margin: "8px 0 4px"}}>{name}</Heading>
                    <Link href={`mailto:${email}`} style={{color: colors.indigo, fontSize: 15}}>{email}</Link>

                    <Text style={{fontSize: 18, fontWeight: 600, margin: "20px 0 0", paddingLeft: 12, borderLeft: `4px solid ${colors.indigo}`}}>
                        {subject}
                    </Text>

                    <Hr style={{borderColor: colors.border, margin: "20px 0"}}/>
                    <Text style={{fontSize: 16, lineHeight: "26px", whiteSpace: "pre-wrap", margin: 0}}>{message}</Text>
                    <Hr style={{borderColor: colors.border, margin: "20px 0"}}/>

                    <Text style={{color: colors.muted, fontSize: 13, margin: 0}}>
                        Reply to this email to respond to {name} directly.
                    </Text>
                </Container>
            </Body>
        </Html>
    );
}

InquiryNotification.PreviewProps = {
    name: "Jordan Lee",
    email: "jordan@example.com",
    subject: "Summer internship opportunity",
    message: "Hi Aidan,\n\nI came across your portfolio and would love to talk about a summer internship on our web team.\n\nBest,\nJordan",
};
