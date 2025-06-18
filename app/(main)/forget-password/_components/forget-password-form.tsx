"use client";
import CustomInput from "@/components/common/custom-input";
import { Button } from "@/components/ui/button";

import { forgetPasswordAction } from "@/lib/server/actions/user/forget-password-action";
import { Mail } from "lucide-react";
import Link from "next/link";
import { useActionState, useEffect } from "react";
import { toast } from "react-toastify";

export default function ForgetPasswordForm() {
  const [state, action, isPending] = useActionState(forgetPasswordAction, null);
  const isValidationError = !state?.success && state?.error.status === 400;
  const serverError =
    !state?.success &&
    (state?.error.status === 404 || state?.error.status === 500);

  useEffect(() => {
    if (!state) return;
    if (state.success) {
      toast.success(`A password reset link has been sent to your email.`);
    } else {
      toast.error(
        state.error.message || "Something went wrong, please try again."
      );
    }
  }, [state]);
  return (
    <form className="flex flex-col gap-2" action={action}>
      {serverError && (
        <div className="border-1 border-destructive rounded-sm p-2 text-destructive">
          {state.error.message}
        </div>
      )}
      <div className="space-y-1">
        <CustomInput
          defaultValue={state?.email ?? ""}
          className="py-2 rounded-sm"
          placeholder="enter your recovery email"
          name="email"
          icon={<Mail className="size-4" />}
        />
        {isValidationError && (
          <span className="text-destructive">{state.error.message}</span>
        )}
      </div>

      <Button
        asChild
        variant={"link"}
        disabled={isPending}
        className="block font-semibold rounded-sm px-1 h-auto  self-start capitalize text-blue-500"
      >
        <Link href={"/login"}>return to login page</Link>
      </Button>
      <Button
        disabled={isPending}
        className="font-semibold rounded-sm px-4 py-2 h-auto"
      >
        {isPending ? "Sending" : "Send"}
      </Button>
    </form>
  );
}
