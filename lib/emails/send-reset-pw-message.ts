import { ResetPasswordSuccessTemplate } from "@/emails";
import { resend, SENDER_EMAIL } from "../resend";
type UserInfo = {
  email: string;
  name: string;
};
export async function sendResetPwMessage({ email, name }: UserInfo) {
  await resend.emails.send({
    from: `Pizzon ${SENDER_EMAIL}`,
    to: [email],
    subject: "Password Reset Success!",
    react: ResetPasswordSuccessTemplate({
      username: name,
    }),
  });
}
