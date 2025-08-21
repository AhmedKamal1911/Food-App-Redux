"use server";

import { BookTableTemplate } from "@/emails";
import { resend } from "@/lib/resend";
import { ActionResponse } from "@/lib/types/shared";

import {
  reservationSchema,
  ReservationSchema,
} from "@/lib/validation/reservation-table-schema";

export async function sendBookTableEmailAction(
  inputs: ReservationSchema
): ActionResponse {
  const result = reservationSchema.safeParse(inputs);
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
      subject: `Table Booking Request - ${data.name}`,
      react: BookTableTemplate(data),
    });

    return {
      status: "success",
      message: "Table Booked Successfully!",
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
