import { OrderSuccessTemplate } from "@/emails";
import { resend, SENDER_EMAIL } from "../resend";

type OrderConfirmation = {
  email: string;

  username: string;
  totalAmount: number;
  currency: string;
  receiptUrl: string;
  isRegistered: boolean;
};
export async function sendOrderConfirmationMessage({
  currency,
  email,
  isRegistered,
  receiptUrl,

  totalAmount,
  username,
}: OrderConfirmation) {
  await resend.emails.send({
    from: `Pizzon ${SENDER_EMAIL}`,
    to: email,
    subject: "Your Order Confirmation",
    react: OrderSuccessTemplate({
      name: username,
      totalAmount: totalAmount,
      currency: currency,
      receiptUrl: receiptUrl,
      isRegistered: isRegistered,
    }),
  });
}
