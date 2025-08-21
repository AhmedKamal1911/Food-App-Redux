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

type OrderCancelProps = {
  name: string;
  totalAmount: number;
  currency: string;
};

export const OrderCancelTemplate = ({
  name = "Valued Customer",
  totalAmount,
  currency,
}: OrderCancelProps) => {
  const formattedAmount = `${(totalAmount / 100).toFixed(2)} ${currency.toUpperCase()}`;

  return (
    <Html>
      <Head />
      <Preview>Your order has been canceled</Preview>
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

          <Text style={heading}>Order Canceled ❌</Text>
          <Text style={subHeading}>
            Hi {name}, your order has been canceled.
          </Text>

          <Text style={message}>
            We&apos;re sorry your order couldn’t be completed. If this was a
            mistake or you&apos;d like to place a new order, feel free to visit
            our website anytime.
          </Text>

          <Section style={orderSummary}>
            <Text>
              <strong>Total:</strong> {formattedAmount}
            </Text>
            <Text>
              <strong>Status:</strong>{" "}
              <span style={{ color: "#ef4444" }}>Canceled</span>
            </Text>
          </Section>

          <Section style={{ textAlign: "center", margin: "32px 0" }}>
            <Button href={`${baseUrl}`} style={button}>
              Return to Homepage
            </Button>
          </Section>

          <Hr style={{ borderColor: "#444", margin: "32px 0" }} />
          <Text style={footer}>
            &copy; {new Date().getFullYear()} Food App. All rights reserved.
          </Text>
        </Container>
      </Body>
    </Html>
  );
};

// --- Styles ---
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
  color: "#ef4444", // red for cancel
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

const orderSummary = {
  backgroundColor: "#1f2937",
  borderRadius: "12px",
  padding: "16px",
  marginTop: "24px",
  fontSize: "14px",
  color: "#d1d5db",
};

const button = {
  backgroundColor: "#0ea5e9",
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

const footer = {
  fontSize: "12px",
  color: "#9ca3af",
  textAlign: "center" as const,
  margin: 0,
};
