"use client";

import { Button } from "@/components/ui/button";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import CustomBookTableField from "../custom-book-table-field";
import { Form } from "@/components/ui/form";
import { File, Mail, Phone, X } from "lucide-react";

import CustomTextArea from "../custom-text-area";
import { contactSchema, ContactSchema } from "@/lib/validation/contact-schema";

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
        <CustomBookTableField
          icon={<Mail className="text-primary size-4" />}
          control={form.control}
          name="email"
          placeholder="email"
        />
        <CustomBookTableField
          icon={<File className="text-primary size-4" />}
          control={form.control}
          name="subject"
          placeholder="subject"
        />
        <CustomBookTableField
          icon={<Phone className="text-primary size-4" />}
          control={form.control}
          name="phone"
          placeholder="phone"
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
