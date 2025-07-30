import * as React from "react";
import {
  Body,
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

type ResetPasswordSuccessTemplateProps = {
  username: string;
};

export const ResetPasswordSuccessTemplate = ({
  username,
}: ResetPasswordSuccessTemplateProps) => (
  <Html>
    <Head />
    <Preview>Your Pizzon password was reset successfully</Preview>
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
        <Text style={heading}>Password Reset Successful</Text>
        <Text style={subHeading}>
          Hi {username}, your password has been reset successfully.
        </Text>
        <Text style={message}>
          If you did not perform this action, please contact our support
          immediately.
          <br />
          Otherwise, you can now log in with your new password.
        </Text>
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
  color: "#22c55e",
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

const footer = {
  fontSize: "12px",
  color: "#71717a",
  textAlign: "center" as const,
  margin: 0,
};
