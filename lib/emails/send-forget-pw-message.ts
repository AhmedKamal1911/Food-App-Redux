import { ResetPasswordTemplate } from "@/emails";
import { resend, SENDER_EMAIL } from "../resend";
type ForgetPwInfo = {
  email: string;
  resetPwToken: string;
  username: string;
};
export async function sendForgetPasswordMessage({
  email,
  resetPwToken,
  username,
}: ForgetPwInfo) {
  await resend.emails.send({
    from: `Pizzon ${SENDER_EMAIL}`,
    to: [email],
    subject: "Reset your password",
    react: ResetPasswordTemplate({
      username: username,
      resetToken: resetPwToken,
    }),
  });
}
