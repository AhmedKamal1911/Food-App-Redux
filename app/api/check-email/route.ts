import { EmailStatus } from "@/components/common/custom-email-input";

import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

export type EmailCheckResponse = { status: EmailStatus; message: string };
export async function POST(req: NextRequest) {
  const email = req.nextUrl.searchParams.get("email");
  const emailParseResult = z
    .string()
    .email({ message: "Invalid Email" })
    .safeParse(email);
  if (!emailParseResult.success)
    return NextResponse.json<EmailCheckResponse>(
      { message: emailParseResult.error.errors[0].message, status: "error" },
      { status: 400, statusText: "Bad Request" }
    );
  try {
    // TODO: check for email in users table
    const isEmailExist = await prisma.user.findUnique({
      where: {
        email: emailParseResult.data,
      },
    });

    if (isEmailExist)
      return NextResponse.json<EmailCheckResponse>(
        { message: "email is not avaliable", status: "inavaliable" },
        { status: 409, statusText: "Conflict" }
      );

    return NextResponse.json<EmailCheckResponse>({
      message: "Email is Avaliable",
      status: "available",
    });
  } catch (error) {
    console.log({ error });
    return NextResponse.json<EmailCheckResponse>(
      { message: "Having Server Problem!", status: "error" },
      { status: 500, statusText: "Internal Server Error" }
    );
  }
}
