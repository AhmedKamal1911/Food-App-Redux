"use client";

import CustomPasswordInputField from "@/components/common/custom-password-input-field";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Form } from "@/components/ui/form";
import { changePasswordAction } from "@/lib/server/actions/user/change-password-action";
import {
  ChangePasswordInputs,
  changePasswordSchema,
} from "@/lib/validation/change-password-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { PencilLine } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

export default function ChangePasswordForm() {
  const [open, setOpen] = useState(false);
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const form = useForm<ChangePasswordInputs>({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmNewPassword: "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: ChangePasswordInputs) {
    try {
      const res = await changePasswordAction(values);
      if (res.status === "success") {
        toast.success(res.message);
        closeBtnRef.current?.click();
        return;
      }
      if (res.status === "validationError") return;

      if (res.error.status === 404) {
        form.setError("root", {
          message: res.error.message,
        });
        toast.error(res.error.message);
      }

      if (res.error.status === 401) {
        form.setError("currentPassword", { message: res.error.message });
      }
    } catch (error) {
      console.error(error);
      toast.error("An Network Error Occured");
    }
  }
  useEffect(() => {
    if (!open) {
      form.reset();
    }
  }, [open, form]);
  return (
    <Dialog onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="text-white font-semibold">
          <PencilLine />
          Change Password
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Change Password</DialogTitle>
          <DialogDescription>Make changes to your passowrd</DialogDescription>
          <DialogClose ref={closeBtnRef} />
        </DialogHeader>
        {form.formState.errors.root?.message && (
          <div className="border border-destructive rounded-sm p-1 text-center">
            <span className="text-red-500 capitalize">
              {form.formState.errors.root.message}
            </span>
          </div>
        )}
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
            <CustomPasswordInputField
              className="rounded-sm py-2 pl-3"
              control={form.control}
              name={"currentPassword"}
              placeholder="current password"
            />
            <CustomPasswordInputField
              className="rounded-sm py-2 pl-3"
              control={form.control}
              name={"newPassword"}
              placeholder="new password"
            />
            <CustomPasswordInputField
              className="rounded-sm py-2 pl-3"
              control={form.control}
              name={"confirmNewPassword"}
              placeholder="confirm new password"
            />
            <DialogFooter>
              <Button disabled={form.formState.isSubmitting}>
                {form.formState.isSubmitting ? "Saving.." : "Save changes"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
