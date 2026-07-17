import * as React from "react";
import {
  Body,
  Column,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Preview,
  Row,
  Section,
  Text,
} from "react-email";

export interface OtpEmailProps {
  otp: string;
  type: "change-email" | "email-verification" | "forget-password" | "sign-in";
}

export default function OtpEmail({ otp, type }: OtpEmailProps) {
  const isForgetPassword = type === "forget-password";

  const title = isForgetPassword
    ? "Reset your password"
    : "Verify your identity";

  const subtitle = isForgetPassword
    ? "Reset code for your account"
    : "One-Time Password (OTP) for sign-in";

  const introText = isForgetPassword
    ? "We received a request to reset your password. Use the following verification code to complete the process:"
    : "To complete your sign-in, please use the following one-time password (OTP) code:";

  const warningText = isForgetPassword
    ? "If you did not request a password reset, you can safely ignore this email. Your password will remain unchanged."
    : "If you did not attempt to sign in to your account, you can safely ignore this email.";

  return (
    <Html lang="en">
      <Head />

      <Preview>
        {isForgetPassword
          ? "Reset your Client Core password"
          : "Your Client Core verification code"}
      </Preview>

      <Body style={styles.body}>
        <Container style={styles.container}>
          {/* Header */}
          <Section style={styles.header}>
            <Row>
              <Column width={40}>
                <Text style={styles.logo}>C</Text>
              </Column>

              <Column style={{ paddingLeft: 12 }}>
                <Text style={styles.brand}>Client Core</Text>
              </Column>
            </Row>
          </Section>

          {/* Content */}
          <Section style={styles.content}>
            <Heading style={styles.heading}>{title}</Heading>

            <Text style={styles.subtitle}>{subtitle}</Text>

            <Text style={styles.paragraph}>{introText}</Text>

            {/* OTP Card */}
            <Section style={styles.otpCard}>
              <Text style={styles.otpLabel}>Your Verification Code</Text>

              <Text style={styles.otp}>{otp}</Text>

              <Text style={styles.expire}>
                This code will expire in{" "}
                <span style={{ fontWeight: 600 }}>10 minutes</span>.
              </Text>
            </Section>

            <Hr style={styles.hr} />

            <Text style={styles.securityTitle}>Security Notice</Text>

            <Text style={styles.paragraph}>
              For your security, never share this code with anyone. Client Core
              staff will never ask for this code.
            </Text>

            <Text style={styles.paragraph}>{warningText}</Text>
          </Section>

          {/* Footer */}
          <Section style={styles.footer}>
            <Text style={styles.footerBrand}>Client Core</Text>

            <Text style={styles.footerSubtitle}>Secure Workspace Portal</Text>

            <Text style={styles.footerText}>
              This is an automated security transmission.
              <br />
              Replies to this email are not monitored.
            </Text>

            <Text style={styles.footerCopyright}>
              © 2026 Client Core. All rights reserved.
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}

const styles: Record<string, React.CSSProperties> = {
  body: {
    margin: 0,
    padding: 0,
    width: "100%",
    backgroundColor: "#f8fafc",
    fontFamily:
      "-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,'Helvetica Neue',Arial,sans-serif",
    WebkitFontSmoothing: "antialiased",
    MozOsxFontSmoothing: "grayscale",
  },

  container: {
    width: "560px",
    maxWidth: "100%",
    margin: "24px auto",
    backgroundColor: "#ffffff",
    border: "1px solid #e2e8f0",
    borderRadius: 16,
    overflow: "hidden",
  },

  header: {
    padding: "32px 32px 20px",
    borderBottom: "1px solid #f1f5f9",
  },

  logo: {
    width: 40,
    height: 40,
    margin: 0,
    backgroundColor: "#2563eb",
    borderRadius: 10,
    color: "#ffffff",
    textAlign: "center",
    lineHeight: "40px",
    fontSize: 20,
    fontWeight: 700,
  },

  brand: {
    margin: 0,
    fontSize: 20,
    fontWeight: 700,
    color: "#0f172a",
  },

  content: {
    padding: "40px 32px 32px",
  },

  heading: {
    margin: 0,
    fontSize: 22,
    lineHeight: "30px",
    fontWeight: 700,
    color: "#0f172a",
  },

  subtitle: {
    marginTop: 8,
    marginBottom: 24,
    fontSize: 13,
    color: "#64748b",
    fontWeight: 600,
    textTransform: "uppercase",
    letterSpacing: "0.05em",
  },

  paragraph: {
    margin: "0 0 24px",
    fontSize: 15,
    lineHeight: "24px",
    color: "#334155",
  },

  otpCard: {
    backgroundColor: "#eff6ff",
    border: "1px dashed #bfdbfe",
    borderRadius: 12,
    padding: 24,
    textAlign: "center",
    marginBottom: 24,
  },

  otpLabel: {
    margin: 0,
    marginBottom: 12,
    fontSize: 12,
    fontWeight: 600,
    color: "#1e3a8a",
    textTransform: "uppercase",
    letterSpacing: "0.05em",
  },

  otp: {
    margin: 0,
    fontSize: 36,
    lineHeight: "40px",
    fontWeight: 800,
    letterSpacing: 8,
    color: "#2563eb",
    fontFamily:
      "SFMono-Regular,Consolas,'Liberation Mono',Menlo,Courier,monospace",
  },

  expire: {
    marginTop: 12,
    marginBottom: 0,
    fontSize: 13,
    color: "#1e40af",
  },

  hr: {
    borderColor: "#f1f5f9",
    margin: "32px 0",
  },

  securityTitle: {
    margin: "0 0 8px",
    fontSize: 14,
    fontWeight: 600,
    color: "#475569",
  },

  footer: {
    padding: "24px 32px 32px",
    backgroundColor: "#f8fafc",
    borderTop: "1px solid #f1f5f9",
    textAlign: "center",
  },

  footerBrand: {
    margin: 0,
    fontWeight: 600,
    color: "#64748b",
    fontSize: 13,
  },

  footerSubtitle: {
    marginTop: 4,
    marginBottom: 16,
    color: "#94a3b8",
    fontSize: 13,
  },

  footerText: {
    margin: 0,
    fontSize: 11,
    lineHeight: "18px",
    color: "#94a3b8",
  },

  footerCopyright: {
    marginTop: 8,
    marginBottom: 0,
    fontSize: 11,
    color: "#94a3b8",
  },
};
