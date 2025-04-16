"use server";

import { loginSchema, LoginSchema } from "@/lib/validation/login-schema";

export async function loginAction(inputs: LoginSchema) {
  try {
    const result = loginSchema.safeParse(inputs);
    if (!result.success) {
      return { message: "invalid credentials", success: false };
    }
    await new Promise((res, rej) => setTimeout(() => res("loged in"), 3000));
    return { message: "login success", success: true };
  } catch (error) {
    console.log({ error });
    return { message: "internal server error", success: false };
  }
}
