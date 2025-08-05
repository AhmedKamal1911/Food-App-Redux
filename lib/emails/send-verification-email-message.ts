import { VerificationSuccessTemplate, VerificationTemplate } from "@/emails";
import { resend, SENDER_EMAIL } from "../resend";

type EmailVerificationInfo = {
  email: string;

  username: string;
  emailVerificationToken: string;
};
export async function sendVerificationEmailMessage({
  emailVerificationToken,
  email,
  username,
}: EmailVerificationInfo) {
  await resend.emails.send({
    from: `Pizzon ${SENDER_EMAIL}`,
    to: [email],
    subject: "Verify your email address",
    react: VerificationTemplate({
      username: username,
      emailVerificationToken: emailVerificationToken,
    }),
  });
}

type EmailVerificationSuccess = Omit<
  EmailVerificationInfo,
  "emailVerificationToken"
>;
export async function sendVerificationEmailSuccessMessage({
  email,
  username,
}: EmailVerificationSuccess) {
  await resend.emails.send({
    from: `Pizzon ${SENDER_EMAIL}`,
    to: [email],
    subject: "Email Verification Success!",
    react: VerificationSuccessTemplate({
      username: username,
    }),
  });
}
