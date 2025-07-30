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

type OrderSuccessProps = {
  name: string;
  totalAmount: number;
  currency: string;
  receiptUrl: string;
  isRegistered: boolean;
};

export const OrderSuccessTemplate = ({
  name = "Valued Customer",
  totalAmount,
  currency,
  receiptUrl,
  isRegistered,
}: OrderSuccessProps) => {
  const formattedAmount = `${(totalAmount / 100).toFixed(2)} ${currency.toUpperCase()}`;
  return (
    <Html>
      <Head />
      <Preview>Your order has been confirmed. Thank you!</Preview>
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

          <Text style={heading}>Order Confirmed ✅</Text>
          <Text style={subHeading}>
            Hi {name}, your order was placed successfully!
          </Text>

          <Text style={message}>
            We&apos;re processing your order and will update you once it&apos;s
            on the way. You can view your receipt below.
          </Text>

          <Section style={orderSummary}>
            <Text>
              <strong>Total:</strong> {formattedAmount}
            </Text>
            <Text>
              <strong>Status:</strong>{" "}
              <span style={{ color: "#22c55e" }}>Succeeded</span>
            </Text>
            {receiptUrl && (
              <Text>
                <strong>Receipt:</strong>{" "}
                <a
                  href={receiptUrl}
                  style={{ color: "#0ea5e9" }}
                  target="_blank"
                >
                  View Receipt
                </a>
              </Text>
            )}
          </Section>
          {isRegistered && (
            <Section style={{ textAlign: "center", margin: "32px 0" }}>
              <Button href={`${baseUrl}/account/orders`} style={button}>
                View My Orders
              </Button>
            </Section>
          )}

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
