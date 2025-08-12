"use client";
import CustomInputField from "@/components/common/custom-input-field";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Lock, LockKeyhole, Mail, User } from "lucide-react";
import Link from "next/link";
import { useForm } from "react-hook-form";

import {
  registerInputs,
  RegisterSchema,
} from "@/lib/validation/register-schema";
import PasswordIndicator from "@/components/common/password-indicator";
import CustomPasswordInputField from "@/components/common/custom-password-input-field";
import CustomEmailInputField from "@/components/common/custom-email-input-field";
import { useState } from "react";
import { PhoneInput } from "@/components/ui/phone-input";
import { cn } from "@/lib/utils";
import { registerAction } from "@/lib/server/actions/user/register-action";
import { toast } from "react-toastify";

import Or from "@/components/common/or";
import { useRouter } from "next/navigation";

export default function RegisterForm() {
  const router = useRouter();
  const form = useForm<RegisterSchema>({
    resolver: zodResolver(registerInputs),
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
  async function onSubmit(values: RegisterSchema) {
    form.trigger("email", {
      shouldFocus: true,
    });
    try {
      const res = await registerAction(values);

      if (res.success) {
        toast.success(res.message);
        router.push("/login");
        return;
      }

      if (!res.success && res.error.type === "error") {
        if (res.error.status === 409) {
          form.setError("root", {
            message: res.error.message,
          });
        } else {
          toast.error(res.error.message);
        }
      }
    } catch (error) {
      console.error(error);
      toast.error("An Network Error Occurred");
    }
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
          {form.formState.errors.root && (
            <div className="border-1 rounded-sm border-destructive p-2 capitalize text-destructive text-center">
              {form.formState.errors.root.message}
            </div>
          )}

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

          <FormField
            control={form.control}
            name={"phone"}
            render={({ field }) => (
              <FormItem>
                <FormLabel className="sr-only">{field.name}</FormLabel>
                <FormControl>
                  <PhoneInput
                    className={cn("bg-white")}
                    placeholder={"Enter phone number"}
                    {...field}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
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

          <Button
            disabled={!isEmailOk || form.formState.isSubmitting}
            type="submit"
          >
            {form.formState.isSubmitting ? "Submitting" : "Submit"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
