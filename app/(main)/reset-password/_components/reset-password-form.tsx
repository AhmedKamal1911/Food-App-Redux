"use client";
import CustomPasswordInputField from "@/components/common/custom-password-input-field";
import PasswordIndicator from "@/components/common/password-indicator";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { resetPasswordAction } from "@/lib/server/actions/user/reset-password-action";
import {
  ResetPasswordInputs,
  resetPasswordSchema,
} from "@/lib/validation/reset-password-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Lock } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

type Props = {
  token: string;
};
export default function ResetPasswordForm({ token }: Props) {
  const [isSendSuccess, setIsSendSuccess] = useState(false);
  const router = useRouter();
  const form = useForm<ResetPasswordInputs>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      token: token,
      newPassword: "",
      confirmNewPassword: "",
    },
  });
  const password = form.watch("newPassword");
  // 2. Define a submit handler.
  async function onSubmit(values: ResetPasswordInputs) {
    try {
      const res = await resetPasswordAction(values);
      if (res.status === "success") {
        toast.success(res.message);
        setIsSendSuccess(true);
        return router.push("/login");
      }
      if (res.status === "validationError") {
        form.setError("root", { message: res.error.message });
      }
      if (res.status === "error") {
        form.setError("root", {
          message: "Something went wrong, please try again.",
        });
        toast.error("Something went wrong, please try again.");
      }
    } catch (error) {
      console.error(error);
      toast.error("An Network Error Occured");
    }
  }
  return (
    <div>
      {form.formState.errors.root?.message && (
        <div className="border border-destructive rounded-sm p-1 text-center">
          <span className="text-red-500 capitalize">
            {form.formState.errors.root.message}
          </span>
        </div>
      )}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
          <div className="flex flex-col gap-2">
            <CustomPasswordInputField
              placeholder="new password"
              control={form.control}
              name="newPassword"
              icon={<Lock className="size-4" />}
              className="py-2 rounded-sm"
            />

            <PasswordIndicator password={password} />
          </div>

          <CustomPasswordInputField
            className="rounded-sm py-2 pl-3"
            control={form.control}
            name={"confirmNewPassword"}
            placeholder="confirm new password"
          />

          <Button disabled={form.formState.isSubmitting || isSendSuccess}>
            {form.formState.isSubmitting ? "Saving.." : "Save changes"}
          </Button>
        </form>
      </Form>
    </div>
  );
}
