import IntroBanner from "@/components/common/intro-banner";

import ResetPasswordForm from "./components/reset-password-form";
import prisma from "@/lib/prisma";
import Link from "next/link";
import { FileWarning } from "lucide-react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type Props = {
  searchParams: Promise<{ token: string }>;
};
export default async function ResetPasswordPage({ searchParams }: Props) {
  const { token } = await searchParams;
  const user = await prisma.user.findFirst({
    where: {
      passwordResetToken: token,
      passwordTokenExpires: { gte: new Date() },
    },
  });
  console.log({ user });
  return (
    <main>
      <IntroBanner
        title="reset password"
        breadcrumbPaths={[{ name: "reset password", href: "" }]}
      />
      <div className="container flex justify-center items-center min-h-[60vh]">
        {!user ? (
          <Card className="max-w-sm text-center">
            <CardHeader>
              <CardTitle>Reset Link Invalid or Expired</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="w-full grid place-content-center py-4">
                <FileWarning size={56} className="text-destructive mx-auto" />
              </div>
              <p
                className="text-lg text-destructive font-semibold mb-2"
                style={{ textWrap: "balance" }}
              >
                Password Verification link is invalid or has expired.
              </p>
              <p className="text-muted-foreground text-sm">
                Please request a new verification email or contact support if
                you continue to have issues.
              </p>
            </CardContent>
            <CardFooter className="flex justify-center items-center">
              <Link
                href="/forget-password"
                className="inline-block bg-primary text-white px-6 py-2 rounded-lg font-semibold hover:bg-primary/90 transition"
              >
                Request New Reset Link
              </Link>
            </CardFooter>
          </Card>
        ) : (
          <div className="w-full max-w-md  border border-gray-100 bg-white rounded-lg shadow-lg p-2 sm:p-8">
            <span className="font-bold mb-3 block">Reset Password :</span>
            <ResetPasswordForm token={token} />
          </div>
        )}
      </div>
    </main>
  );
}
