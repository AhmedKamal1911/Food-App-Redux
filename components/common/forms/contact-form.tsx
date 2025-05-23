"use client";

import { Button } from "@/components/ui/button";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import CustomInputField from "../custom-input-field";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { File, Mail, Phone, X } from "lucide-react";

import CustomTextArea from "../custom-text-area";
import { contactSchema, ContactSchema } from "@/lib/validation/contact-schema";
import { PhoneInput } from "@/components/ui/phone-input";
import { cn } from "@/lib/utils";

export default function ContactForm() {
  // 1. Define your form.
  const form = useForm<ContactSchema>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      email: "",
      subject: "",
      message: "",
      phone: "",
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: ContactSchema) {
    console.log(values);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex-1 space-y-8 flex flex-col"
      >
        <CustomInputField
          icon={<Mail className="text-primary size-4" />}
          control={form.control}
          name="email"
          placeholder="email"
        />
        <CustomInputField
          icon={<File className="text-primary size-4" />}
          control={form.control}
          name="subject"
          placeholder="subject"
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
        <CustomTextArea
          control={form.control}
          name="message"
          placeholder="message"
        />
        <Button
          variant={"outline"}
          type="submit"
          className="capitalize font-semibold text-xl self-center text-white rounded-4xl border bg-primary hover:bg-white hover:text-primary border-primary  py-6 px-8 md:py-7 md:px-10 transition-all"
        >
          send message
        </Button>
      </form>
    </Form>
  );
}
