"use client";
import CustomInput from "@/components/common/custom-input";
import { Button } from "@/components/ui/button";

import { forgetPasswordAction } from "@/lib/server/actions/user/forget-password-action";
import { Mail } from "lucide-react";
import Link from "next/link";
import {
  startTransition,
  useActionState,
  useEffect,
  useState,
  useTransition,
} from "react";
import { toast } from "react-toastify";

type Props = {};
export default function ForgetPasswordForm({}: Props) {
  // const [isLoading, startTransition] = useTransition();
  const [email, setEmail] = useState("");
  const [state, action, isPending] = useActionState(forgetPasswordAction, null);
  const isValidationError = !state?.success && state?.error.status === 400;
  const serverError =
    !state?.success &&
    (state?.error.status === 404 || state?.error.status === 500);

  const forgetPasswordAct = action.bind(null, email);
  const isSuccess = state?.success;

  useEffect(() => {
    if (isSuccess) {
      toast.success("tas");
    }
    if (serverError) {
      toast.error(state.error.message);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccess, serverError]);
  return (
    <form
      // onSubmit={(e) => e.preventDefault()}
      className="flex flex-col gap-2"
      action={forgetPasswordAct}
    >
      <div className="space-y-1">
        <CustomInput
          defaultValue={serverError || isValidationError ? state.email : ""}
          className="py-2 rounded-sm"
          placeholder="enter your recovery email"
          name="recoveryEmail"
          onBlur={(e) => setEmail(e.target.value)}
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
        Send
      </Button>
      {serverError && (
        <div className="border-1 border-destructive rounded-sm p-2 text-destructive">
          {state.error.message}
        </div>
      )}
    </form>
  );
}
