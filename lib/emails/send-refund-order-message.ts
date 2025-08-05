import { OrderCancelTemplate } from "@/emails";
import { resend, SENDER_EMAIL } from "../resend";

type RefundOrderInfo = {
  email: string;
  totalAmount: number;
  username: string;
  currency: string;
};
export async function sendRefundOrderMessage({
  currency,
  email,
  totalAmount,
  username,
}: RefundOrderInfo) {
  await resend.emails.send({
    from: `Pizzon ${SENDER_EMAIL}`,
    to: email,
    subject: "Your Order Refunded",
    react: OrderCancelTemplate({
      name: username,
      totalAmount: totalAmount,
      currency: currency,
    }),
  });
}
export async function sendFailedOrderMessage({
  currency,
  email,
  totalAmount,
  username,
}: RefundOrderInfo) {
  await resend.emails.send({
    from: `Pizzon ${SENDER_EMAIL}`,
    to: email,
    subject: "Your Order failed",
    react: OrderCancelTemplate({
      name: username,
      totalAmount: totalAmount,
      currency: currency,
    }),
  });
}
