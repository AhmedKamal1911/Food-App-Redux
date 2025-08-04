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
import { Edit } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

import { editPersonalInfoAction } from "@/lib/server/actions/user/edit-personal-info-action";
import { UserInfo } from "../settings-tabs";

type Props = {
  user: UserInfo;
};
export default function EditPersonalInformationForm({ user }: Props) {
  const [open, setOpen] = useState(false);

  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const form = useForm<PersonalInformationInputs>({
    resolver: zodResolver(personalInformationSchema),
    defaultValues: {
      fullName: user.name,
      phoneNumber: user.phone,
    },
  });

  async function onSubmit(values: PersonalInformationInputs) {
    const isNotValuesChanged =
      values.fullName === user.name && values.phoneNumber === user.phone;
    if (isNotValuesChanged) {
      toast.success("Personal information updated successfully.");
      closeBtnRef.current?.click();
      return;
    }
    try {
      const res = await editPersonalInfoAction(values);

      if (res.success) {
        toast.success(res.data.message);
        closeBtnRef.current?.click();
        return;
      }

      if (res.error.status === 404) {
        form.setError("root", {
          message: "Something went wrong, please try again.",
        });
        toast.error("Something went wrong, please try again.");
      }

      if (res.error.status === 409) {
        form.setError("phoneNumber", { message: res.error.message });
      } else if (res.error.status === 400) {
        form.setError("root", { message: res.error.message });
      }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
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
