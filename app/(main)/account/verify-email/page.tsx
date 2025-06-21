import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { authOptions } from "@/lib/auth";
import { verifyUserEmailAction } from "@/lib/server/actions/user/verify-user-email-action";
import { Check, FileWarning } from "lucide-react";
import { getServerSession } from "next-auth";

import Link from "next/link";
import { redirect } from "next/navigation";
import VerifyEmailForm from "../components/forms/verify-email-form";

type Props = {
  searchParams: Promise<{
    token: string;
  }>;
};
export default async function VerifyEmailPage({ searchParams }: Props) {
  const { token } = await searchParams;
  const session = await getServerSession(authOptions);
  if (session && session.user.emailVerified) return redirect("/");
  const res = await verifyUserEmailAction(token);
  if (!res.success) {
    return (
      <main className="bg-gray-950 flex items-center justify-center min-h-[65vh] ">
        <Card className="max-w-sm text-center">
          <CardHeader>
            <CardTitle>Email Verification Failed</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="w-full grid place-content-center py-4">
              <FileWarning size={56} className="text-destructive mx-auto" />
            </div>
            <p
              className="text-lg text-destructive font-semibold mb-2"
              style={{ textWrap: "balance" }}
            >
              Verification link is invalid or has expired.
            </p>
            <p className="text-muted-foreground text-sm">
              Please request a new verification email or contact support if you
              continue to have issues.
            </p>
          </CardContent>
          <CardFooter className="flex justify-center items-center">
            {session && !session.user.emailVerified && <VerifyEmailForm />}
          </CardFooter>
        </Card>
      </main>
    );
  }

  return (
    <main className="bg-secondary grid place-content-center py-40 min-h-[70vh]">
      <Card className="max-w-sm w-full text-center shadow-lg border-0">
        <CardHeader>
          <CardTitle className="text-2xl font-bold tracking-tight">
            Email Verified!
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="w-full flex justify-center py-4 ">
            <div className="border-2 p-2 border-green-500 rounded-full">
              <Check
                size={56}
                className="text-green-500 animate-in fade-in-50 scale-110"
              />
            </div>
          </div>
          <p
            className="text-lg text-muted-foreground mb-2"
            style={{ textWrap: "balance" }}
          >
            Your email has been successfully verified. Thank you for confirming
            your account!
          </p>
          <p className="text-sm text-gray-500">
            You can now enjoy all features of your account.
          </p>
        </CardContent>
        <CardFooter>
          {session ? (
            session.user.role !== "user" && (
              <Link
                href="/"
                className="bg-primary text-white text-sm font-medium hover:bg-primary/90 h-10 px-4 py-2 rounded-lg w-full text-center transition-colors"
              >
                Go to Dashboard
              </Link>
            )
          ) : (
            <Link
              href="/login"
              className="bg-primary text-white text-sm font-medium hover:bg-primary/90 h-10 px-4 py-2 rounded-lg w-full text-center transition-colors"
            >
              Sign in
            </Link>
          )}
        </CardFooter>
      </Card>
    </main>
  );
}
