import { Resend } from "resend";
if (!process.env.RESEND_API_KEY)
  throw new Error("RESEND_API_KEY is not defined");
export const resend = new Resend(process.env.RESEND_API_KEY);
if (!process.env.SENDER_EMAIL) throw new Error("SENDER_EMAIL is not defined");
export const SENDER_EMAIL = process.env.SENDER_EMAIL;
