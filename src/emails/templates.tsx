import {
    Html,
    Head,
    Body,
    Container,
    Section,
    Text,
    Heading,
    Hr,
    Link,
} from '@react-email/components';

interface AdminEmailProps {
    name: string;
    email: string;
    company?: string;
    phone?: string;
    subject?: string;
    message: string;
}

export function AdminEmailTemplate({
    name,
    email,
    company,
    phone,
    subject,
    message,
}: AdminEmailProps) {
    return (
        <Html>
            <Head />
            <Body style={main}>
                <Container style={container}>
                    <Heading style={h1}>New Contact Form Submission</Heading>

                    <Text style={text}>
                        You have received a new message from your website contact form.
                    </Text>

                    <Hr style={hr} />

                    <Section style={section}>
                        <Text style={label}>Name:</Text>
                        <Text style={value}>{name}</Text>
                    </Section>

                    <Section style={section}>
                        <Text style={label}>Email:</Text>
                        <Link href={`mailto:${email}`} style={link}>
                            {email}
                        </Link>
                    </Section>

                    {company && (
                        <Section style={section}>
                            <Text style={label}>Company:</Text>
                            <Text style={value}>{company}</Text>
                        </Section>
                    )}

                    {phone && (
                        <Section style={section}>
                            <Text style={label}>Phone:</Text>
                            <Text style={value}>{phone}</Text>
                        </Section>
                    )}

                    {subject && (
                        <Section style={section}>
                            <Text style={label}>Subject:</Text>
                            <Text style={value}>{subject}</Text>
                        </Section>
                    )}

                    <Hr style={hr} />

                    <Section style={section}>
                        <Text style={label}>Message:</Text>
                        <Text style={messageText}>{message}</Text>
                    </Section>

                    <Hr style={hr} />

                    <Text style={footer}>
                        This email was sent from the ITEDA Solutions contact form.
                        <br />
                        Reply directly to this email to respond to {name}.
                    </Text>
                </Container>
            </Body>
        </Html>
    );
}

interface CustomerEmailProps {
    name: string;
}

export function CustomerEmailTemplate({ name }: CustomerEmailProps) {
    return (
        <Html>
            <Head />
            <Body style={main}>
                <Container style={container}>
                    <Heading style={h1}>Thank You for Contacting ITEDA Solutions</Heading>

                    <Text style={text}>Dear {name},</Text>

                    <Text style={text}>
                        Thank you for reaching out to us. We have received your message and
                        our team will review it shortly.
                    </Text>

                    <Text style={text}>
                        We typically respond within 24-48 hours during business days. If your
                        inquiry is urgent, please feel free to call us directly.
                    </Text>

                    <Hr style={hr} />

                    <Section style={section}>
                        <Text style={label}>ITEDA Solutions</Text>
                        <Text style={value}>IoT Innovation for Agriculture</Text>
                        <Link href="https://itedasolutions.com" style={link}>
                            www.itedasolutions.com
                        </Link>
                    </Section>

                    <Hr style={hr} />

                    <Text style={footer}>
                        This is an automated confirmation email. Please do not reply to this message.
                    </Text>
                </Container>
            </Body>
        </Html>
    );
}

// Styles
const main = {
    backgroundColor: '#f6f9fc',
    fontFamily:
        '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
};

const container = {
    backgroundColor: '#ffffff',
    margin: '0 auto',
    padding: '20px 0 48px',
    marginBottom: '64px',
    maxWidth: '600px',
};

const h1 = {
    color: '#2E865F',
    fontSize: '24px',
    fontWeight: 'bold',
    margin: '40px 0',
    padding: '0 40px',
};

const text = {
    color: '#333',
    fontSize: '16px',
    lineHeight: '26px',
    padding: '0 40px',
};

const section = {
    padding: '0 40px',
    marginBottom: '16px',
};

const label = {
    color: '#666',
    fontSize: '14px',
    fontWeight: 'bold',
    marginBottom: '4px',
};

const value = {
    color: '#333',
    fontSize: '16px',
    margin: '0',
};

const link = {
    color: '#2E865F',
    textDecoration: 'underline',
};

const messageText = {
    color: '#333',
    fontSize: '16px',
    lineHeight: '24px',
    whiteSpace: 'pre-wrap' as const,
    backgroundColor: '#f9fafb',
    padding: '16px',
    borderRadius: '4px',
    border: '1px solid #e5e7eb',
};

const hr = {
    borderColor: '#e6ebf1',
    margin: '20px 40px',
};

const footer = {
    color: '#8898aa',
    fontSize: '12px',
    lineHeight: '16px',
    padding: '0 40px',
    marginTop: '32px',
};
