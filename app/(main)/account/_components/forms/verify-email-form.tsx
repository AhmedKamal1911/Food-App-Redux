"use client";

import { Button } from "@/components/ui/button";

import { resendVerificationEmailAction } from "@/lib/server/actions/user/resend-verification-email-action";
import { useActionState, useEffect } from "react";

import { toast } from "react-toastify";

type Props = {
  text?: string;
};

export default function VerifyEmailForm({
  text = "Resend Verification Email",
}: Props) {
  const [state, action, isPending] = useActionState(
    resendVerificationEmailAction,
    undefined
  );
  useEffect(() => {
    if (state?.success) return void toast.success(state.data.message);

    if (state?.error) toast.error(state.error.message);
  }, [state]);

  return (
    <form action={action}>
      <Button
        disabled={isPending}
        className={"bg-primary capitalize text-sm font-semibold w-full py-5"}
      >
        {isPending ? "submitting" : text}
      </Button>
    </form>
  );
}
