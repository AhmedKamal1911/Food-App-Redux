"use server";

import { ContactEmailTemplate } from "@/emails/contact-email-template";
import { resend } from "@/lib/resend";
import { ActionResponse } from "@/lib/types/shared";
import { contactSchema, ContactSchema } from "@/lib/validation/contact-schema";

export async function sendContactEmailAction(
  inputs: ContactSchema
): ActionResponse {
  const result = contactSchema.safeParse(inputs);
  if (!result.success) {
    return {
      status: "validationError",
      error: {
        message: "Some inputs missed!",
        status: 400,
      },
    };
  }
  const data = result.data;
  try {
    await resend.emails.send({
      from: "Pizzon <onboarding@resend.dev>",
      to: [data.email],
      subject: `New Contact Request from ${data.email}`,
      react: ContactEmailTemplate(data),
    });

    return {
      status: "success",
      message: "Message Sent Successfully!",
    };
  } catch (error) {
    console.error(error);
    return {
      status: "error",
      error: {
        message: "Internal Server Error",
        status: 500,
      },
    };
  }
}
