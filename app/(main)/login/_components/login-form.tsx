"use client";
import CustomInputField from "@/components/common/custom-input-field";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Lock, Mail } from "lucide-react";
import Link from "next/link";
import { useForm } from "react-hook-form";

import Or from "./or";

import CustomPasswordInputField from "@/components/common/custom-password-input-field";

import { LoginSchema, loginSchema } from "@/lib/validation/login-schema";
import { loginAction } from "@/lib/server/actions/user/login-action";
import { toast } from "react-toastify";
import { useState } from "react";

export default function LoginForm() {
  const [isSubmitSuccess, setIsSubmitSuccess] = useState(false);
  const form = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    mode: "onBlur",
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: LoginSchema) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    const res = await loginAction(values);
    if (res.success) {
      toast.success("Login success");
      setIsSubmitSuccess(true);
    } else {
      form.setError("root", { message: res.message });
      toast.error("Login Faild");
      setIsSubmitSuccess(false);
    }
    console.log({ res });
    console.log(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="space-y-6">
          <CustomInputField
            placeholder="email"
            control={form.control}
            name="email"
            icon={<Mail className="size-4" />}
            className="py-2 rounded-sm"
          />

          <CustomPasswordInputField
            placeholder="password"
            control={form.control}
            name="password"
            icon={<Lock className="size-4" />}
            className="py-2 rounded-sm"
          />

          <Button
            disabled={form.formState.isSubmitting || isSubmitSuccess}
            type="submit"
            className="w-full"
          >
            Sign in
          </Button>

          {form.formState.errors.root?.message && (
            <div className="border-1 border-destructive p-2 rounded-sm text-destructive capitalize">
              {form.formState.errors.root.message}
            </div>
          )}
          <Link href={"/forget-password"} className="text-blue-500 capitalize">
            Forget password ?
          </Link>
        </div>
        <div className="flex flex-col gap-3 mt-5">
          <Or />
          <Button asChild>
            <Link
              href={"/register"}
              className="text-center p-2 rounded-sm text-white font-semibold"
            >
              Sign up
            </Link>
          </Button>
        </div>
      </form>
    </Form>
  );
}
