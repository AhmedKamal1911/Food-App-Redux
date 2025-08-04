import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FileWarning } from "lucide-react";
import Link from "next/link";

export default function InvalidTokenCard() {
  return (
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
          Please request a new verification email or contact support if you
          continue to have issues.
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
  );
}
