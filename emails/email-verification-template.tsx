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
import { getBaseUrl, getResendEmailLogoUrl } from "@/lib/utils";

const baseUrl = getBaseUrl();

type VerificationTemplateProps = {
  username: string;
  emailVerificationToken: string;
};

export const VerificationTemplate = ({
  username,
  emailVerificationToken,
}: VerificationTemplateProps) => (
  <Html>
    <Head />
    <Preview>Confirm your email address to activate your account.</Preview>
    <Body style={main}>
      <Container style={container}>
        <Section style={logoSection}>
          <Img
            src={getResendEmailLogoUrl()}
            alt="Food App"
            width={150}
            height={100}
            style={{
              borderRadius: "12px",
              margin: "0 auto",
              objectFit: "contain",
            }}
          />
        </Section>
        <Text style={heading}>Welcome, {username} 👋</Text>
        <Text style={subHeading}>
          Thank you for registering at <b>Food App</b>!
        </Text>
        <Text style={message}>
          Please verify your email address to activate your account. <br />
          <span style={{ color: "#f43f5e", fontWeight: 500 }}>
            The verification link will expire after <b>10 minutes</b>.
          </span>
        </Text>
        <Section style={{ textAlign: "center", margin: "32px 0" }}>
          <Button
            href={`${baseUrl}/account/verify-email?token=${emailVerificationToken}`}
            style={button}
          >
            Verify Email
          </Button>
        </Section>
        <Text style={info}>
          If you did not create an account, you can safely ignore this email.
        </Text>
        <Hr style={{ borderColor: "#22223b", margin: "32px 0" }} />
        <Text style={footer}>
          &copy; {new Date().getFullYear()} Food App. All rights reserved.
        </Text>
      </Container>
    </Body>
  </Html>
);

export const VerificationSuccessTemplate = ({
  username,
}: {
  username: string;
}) => (
  <Html>
    <Head />
    <Preview>Your email has been verified. Welcome to Food App!</Preview>
    <Body style={main}>
      <Container style={container}>
        <Section style={logoSection}>
          <Img
            src={getResendEmailLogoUrl()}
            alt="Food App"
            width={150}
            height={100}
            style={{
              borderRadius: "12px",
              margin: "0 auto",
              objectFit: "contain",
            }}
          />
        </Section>
        <Text style={heading}>Email Verified 🎉</Text>
        <Text style={subHeading}>
          Hi {username}, your email address has been successfully verified!
        </Text>
        <Text style={message}>
          Thank you for confirming your account. You can now enjoy all features
          of <b>Food App</b>.<br />
          <span style={{ color: "#22c55e", fontWeight: 500 }}>
            Welcome aboard!
          </span>
        </Text>
        <Section style={{ textAlign: "center", margin: "32px 0" }}>
          <Button
            href={`${baseUrl}/account`}
            style={{ ...button, backgroundColor: "#22c55e" }}
          >
            Go to Your Account
          </Button>
        </Section>
        <Hr style={{ borderColor: "#22223b", margin: "32px 0" }} />
        <Text style={footer}>
          &copy; {new Date().getFullYear()} Food App. All rights reserved.
        </Text>
      </Container>
    </Body>
  </Html>
);

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
