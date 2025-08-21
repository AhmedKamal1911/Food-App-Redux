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
import { getResendEmailLogoUrl } from "@/lib/utils";
import { ContactSchema } from "@/lib/validation/contact-schema";

export const ContactEmailTemplate = ({
  email,
  subject,
  message,
  phone,
}: ContactSchema) => (
  <Html>
    <Head />
    <Preview>New contact request from {email}</Preview>
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

        <Text style={heading}>New Contact Request</Text>

        <Text style={messageText}>
          You have received a new message from <b>{email}</b>.
        </Text>

        <Section style={detailsBox}>
          <Text style={detailItem}>
            <b>Email:</b> {email}
          </Text>
          {phone && (
            <Text style={detailItem}>
              <b>Phone:</b> {phone}
            </Text>
          )}
          <Text style={detailItem}>
            <b>Subject:</b> {subject}
          </Text>
          <Text style={detailItem}>
            <b>Message:</b> {message}
          </Text>
        </Section>

        <Text style={messageText}>
          Please reply to the user as soon as possible.
        </Text>

        <Hr style={{ borderColor: "#22223b", margin: "32px 0" }} />
        <Text style={footer}>
          &copy; {new Date().getFullYear()} Food App. All rights reserved.
        </Text>
      </Container>
    </Body>
  </Html>
);

// ==== STYLES ====
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

const messageText = {
  fontSize: "15px",
  textAlign: "center" as const,
  margin: "16px 0",
  color: "#e5e7eb",
};

const detailsBox = {
  background: "#1f2937",
  borderRadius: "12px",
  padding: "16px",
  margin: "24px 0",
};

const detailItem = {
  fontSize: "14px",
  color: "#f3f4f6",
  marginBottom: "6px",
};

const footer = {
  fontSize: "12px",
  color: "#71717a",
  textAlign: "center" as const,
  margin: 0,
};
