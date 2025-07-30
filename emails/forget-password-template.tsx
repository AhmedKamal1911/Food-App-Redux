import * as React from "react";
import {
  Body,
  Button,
  Container,
  Head,
  Hr,
  Html,
  Img,
  Preview,
  Section,
  Text,
} from "@react-email/components";
import { getBaseUrl } from "@/lib/utils";

const baseUrl = getBaseUrl();

type ResetPasswordTemplateProps = {
  username: string;
  resetToken: string;
};

export const ResetPasswordTemplate = ({
  username,
  resetToken,
}: ResetPasswordTemplateProps) => (
  <Html>
    <Head />
    <Preview>Reset your Food App password</Preview>
    <Body style={main}>
      <Container style={container}>
        <Section style={logoSection}>
          <Img
            src={`${baseUrl}/_next/image?url=%2Fimages%2Flogo.png&w=256&q=75`}
            alt="Food App"
            width={60}
            height={60}
            style={{ borderRadius: "12px", margin: "0 auto" }}
          />
        </Section>
        <Text style={heading}>Reset Your Password</Text>
        <Text style={subHeading}>
          Hi {username}, we received a request to reset your password.
        </Text>
        <Text style={message}>
          Click the button below to reset your password. <br />
          <span style={{ color: "#f43f5e", fontWeight: 500 }}>
            This link will expire after <b>10 minutes</b>.
          </span>
        </Text>
        <Section style={{ textAlign: "center", margin: "32px 0" }}>
          <Button
            href={`${baseUrl}/reset-password?token=${resetToken}`}
            style={button}
          >
            Reset Password
          </Button>
        </Section>
        <Text style={info}>
          If you did not request a password reset, you can safely ignore this
          email.
        </Text>
        <Hr style={{ borderColor: "#22223b", margin: "32px 0" }} />
        <Text style={footer}>
          &copy; {new Date().getFullYear()} Food App. All rights reserved.
        </Text>
      </Container>
    </Body>
  </Html>
);

// يمكنك إعادة استخدام نفس الـ styles من قالب التفعيل أو نسخها هنا:
const main = {
  backgroundColor: "#18181b",
  color: "#fff",
  fontFamily:
    '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif',
  padding: 0,
};

const container = {
  margin: "0 auto",
  padding: "32px 0 32px",
  maxWidth: "420px",
  background: "#23232b",
  borderRadius: "18px",
  boxShadow: "0 4px 32px 0 #0002",
};

const logoSection = {
  textAlign: "center" as const,
  marginBottom: "16px",
};

const heading = {
  fontSize: "24px",
  fontWeight: 700,
  textAlign: "center" as const,
  margin: "16px 0 8px",
  color: "#fbbf24",
};

const subHeading = {
  fontSize: "16px",
  textAlign: "center" as const,
  marginBottom: "8px",
  color: "#fff",
};

const message = {
  fontSize: "15px",
  textAlign: "center" as const,
  margin: "16px 0",
  color: "#e5e7eb",
};

const button = {
  backgroundColor: "#f43f5e",
  color: "#fff",
  fontWeight: 600,
  fontSize: "16px",
  padding: "14px 32px",
  borderRadius: "8px",
  border: "none",
  cursor: "pointer",
  textDecoration: "none",
  display: "inline-block",
};

const info = {
  fontSize: "13px",
  color: "#a1a1aa",
  textAlign: "center" as const,
  margin: "0 0 8px",
};

const footer = {
  fontSize: "12px",
  color: "#71717a",
  textAlign: "center" as const,
  margin: 0,
};
