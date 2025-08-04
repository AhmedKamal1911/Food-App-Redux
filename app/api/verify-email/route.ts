import { VerificationSuccessTemplate } from "@/emails/email-verification-template";
import { PRISMA_CACHE_KEY } from "@/lib/cache/cache-keys";
import { getCurrentSession } from "@/lib/dal/user";
import prisma from "@/lib/prisma";

import { User } from "@prisma/client";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";

import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
const resend = new Resend(process.env.RESEND_API_KEY);
export async function POST(req: NextRequest) {
  const cook = await cookies();
  console.dir("Cookies:", cook.getAll());
  const searchParams = req.nextUrl.searchParams;
  const token = searchParams.get("token");
  if (!token) {
    return NextResponse.json({ error: "Token is required" }, { status: 400 });
  }
  const session = await getCurrentSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  if (session.user.emailVerified) {
    return NextResponse.json(
      { message: "Email already verified" },
      { status: 200 }
    );
  }
  try {
    const user = await findUserById(session.user.id);
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }
    if (
      !isValidToken(token, {
        emailVerificationToken: user.emailVerificationToken,
        emailVerificationExpires: user.emailVerificationExpires,
      })
    ) {
      return NextResponse.json(
        { error: "Invalid or expired token" },
        { status: 400 }
      );
    }
    await prisma.user.update({
      where: { id: user.id },
      data: {
        emailVerified: new Date(),
        emailVerificationToken: null,
        emailVerificationExpires: null,
      },
    });
    revalidateTag(PRISMA_CACHE_KEY.USERS);
    revalidateTag(`${PRISMA_CACHE_KEY.USERS}-${user.id}`);
    await resend.emails.send({
      from: "Pizzon <onboarding@resend.dev>",
      to: [user.email],
      subject: "Email Verification Success!",
      react: VerificationSuccessTemplate({
        username: user.name,
      }),
    });
    return NextResponse.json({ message: "Email Verification Success!" });
  } catch (error) {
    console.error("Error verifying email:", error);
    return NextResponse.json(
      {
        error: "Internal Server Error",
      },
      { status: 500 }
    );
  }
}

function isValidToken(
  token: string,
  userTokenInfo: {
    emailVerificationToken: User["emailVerificationToken"];
    emailVerificationExpires: User["emailVerificationExpires"];
  }
) {
  console.log("token expires at:", userTokenInfo.emailVerificationExpires);

  return (
    userTokenInfo.emailVerificationToken &&
    userTokenInfo.emailVerificationExpires &&
    userTokenInfo.emailVerificationToken === token &&
    userTokenInfo.emailVerificationExpires > new Date()
  );
}

async function findUserById(id: string) {
  return await prisma.user.findUnique({
    where: {
      id: id,
    },
  });
}
