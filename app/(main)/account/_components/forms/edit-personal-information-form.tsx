"use client";

import CustomInputField from "@/components/common/custom-input-field";

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
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { PhoneInput } from "@/components/ui/phone-input";

import { cn } from "@/lib/utils";

import {
  PersonalInformationInputs,
  personalInformationSchema,
} from "@/lib/validation/personal-information-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Edit, Mail } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

import { editPersonalInfoAction } from "@/lib/server/actions/user/edit-personal-info-action";
import { UserInfo } from "../settings-tabs";
// import { useRefreshClientSession } from "@/hooks/use-refresh-client-session";
import CustomEmailInputField from "@/components/common/custom-email-input-field";
import { useSession } from "next-auth/react";

type Props = {
  user: UserInfo;
};
export default function EditPersonalInformationForm({ user }: Props) {
  const [isEmailOk, setIsEmailOk] = useState(true);
  const session = useSession();
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const form = useForm<PersonalInformationInputs>({
    resolver: zodResolver(personalInformationSchema),
    defaultValues: {
      fullName: user.name,
      phoneNumber: user.phone,
      email: user.email,
    },
  });

  async function onSubmit(values: PersonalInformationInputs) {
    const isNotValuesChanged =
      values.fullName === user.name &&
      values.phoneNumber === user.phone &&
      values.email === user.email;
    if (isNotValuesChanged) {
      toast.success("Personal information updated successfully.");
      closeBtnRef.current?.click();
      return;
    }
    try {
      const res = await editPersonalInfoAction(values);

      if (res.status === "success") {
        toast.success(res.message);
        closeBtnRef.current?.click();

        session.update();
        return;
      }
      if (res.status === "validationError") return;
      if (res.error.status === 401) {
        form.setError("root", {
          message: res.error.message,
        });
        toast.error(res.error.message);
      }

      if (res.error.status === 409) {
        form.setError("phoneNumber", { message: res.error.message });
      }
    } catch (error) {
      console.error(error);
      toast.error("An Network Error Occured");
    }
  }

  useEffect(() => {
    form.reset({
      fullName: user.name,
      phoneNumber: user.phone,
      email: user.email,
    });
  }, [form, user]);
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={"ghost"} className="flex items-center gap-2">
          <Edit />
          <span className="text-[17px] capitalize">edit</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Personal Info</DialogTitle>
          <DialogDescription>
            Make changes to your Personal Info
          </DialogDescription>
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
            <CustomInputField
              className="rounded-sm py-2 pl-3"
              control={form.control}
              name={"fullName"}
              placeholder="full name"
            />
            <CustomEmailInputField
              placeholder="email"
              control={form.control}
              initialEmail={user.email}
              name="email"
              icon={<Mail className="size-4" />}
              setIsEmailStatusOk={setIsEmailOk}
              className="py-2 rounded-sm"
            />
            <FormField
              control={form.control}
              name={"phoneNumber"}
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
            <DialogFooter>
              <Button disabled={!isEmailOk || form.formState.isSubmitting}>
                {form.formState.isSubmitting ? "Saving.." : "Save changes"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
