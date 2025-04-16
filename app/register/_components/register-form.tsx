"use client";
import CustomInputField from "@/components/common/custom-input-field";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Lock, LockKeyhole, Mail, User } from "lucide-react";
import Link from "next/link";
import { useForm } from "react-hook-form";

import Or from "./or";
import {
  registerSchema,
  RegisterSchema,
} from "@/lib/validation/register-schema";
import PasswordIndicator from "@/components/common/password-indicator";
import CustomPasswordInputField from "@/components/common/custom-password-input-field";
import CustomEmailInputField from "@/components/common/custom-email-input-field";
import { useState } from "react";

export default function RegisterForm() {
  const form = useForm<RegisterSchema>({
    resolver: zodResolver(registerSchema),
    mode: "onBlur",
    defaultValues: {
      firstName: "",
      lastName: "",
      password: "",
      confirmPassword: "",
      email: "",
      phone: "",
    },
  });
  const [isEmailOk, setIsEmailOk] = useState(true);
  const password = form.watch("password");

  // 2. Define a submit handler.
  function onSubmit(values: RegisterSchema) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-3 mb-5">
          <Button asChild>
            <Link
              href={"/login"}
              className="text-center p-2 rounded-sm text-white font-semibold"
            >
              Sign in
            </Link>
          </Button>
          <Or />
          <span className="text-center font-semibold text-[18px]">
            Register Now
          </span>
        </div>
        <div className="space-y-6">
          <div className="flex gap-3 max-md:gap-6 max-md:flex-col">
            <div className="flex-1">
              <CustomInputField
                placeholder="frist name"
                control={form.control}
                name="firstName"
                icon={<User className="size-4" />}
                className="p-2 "
              />
            </div>
            <div className="flex-1">
              <CustomInputField
                placeholder="last name"
                control={form.control}
                name="lastName"
                icon={<User className="size-4" />}
                className="p-2 "
              />
            </div>
          </div>
          <CustomEmailInputField
            placeholder="email"
            control={form.control}
            name="email"
            icon={<Mail className="size-4" />}
            setIsEmailStatusOk={setIsEmailOk}
            className="py-2 rounded-sm"
          />
          <CustomInputField
            placeholder="phone number"
            control={form.control}
            name="phone"
            icon={<Mail className="size-4" />}
            className="py-2 rounded-sm"
          />
          <div className="flex flex-col gap-2">
            <CustomPasswordInputField
              placeholder="password"
              control={form.control}
              name="password"
              icon={<Lock className="size-4" />}
              className="py-2 rounded-sm"
            />

            <PasswordIndicator password={password} />
          </div>
          <CustomPasswordInputField
            placeholder="confirm password"
            control={form.control}
            name="confirmPassword"
            icon={<LockKeyhole className="size-4" />}
            className="py-2 rounded-sm"
          />

          <Button disabled={!isEmailOk} type="submit">
            Submit
          </Button>
        </div>
      </form>
    </Form>
  );
}
