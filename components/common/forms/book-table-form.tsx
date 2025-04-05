"use client";

import { Button } from "@/components/ui/button";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import CustomBookTableField from "../custom-book-table-field";
import { Form } from "@/components/ui/form";
import { Mail, X } from "lucide-react";
import CustomSelectField from "../custom-select-field";
import { SelectItem } from "@/components/ui/select";
import { DateTimePicker } from "../date-picker/date-time-picker";
import {
  bookTableSchema,
  BookTableSchema,
} from "@/lib/validation/book-table-schema";
import { numberOfPersons } from "@/lib/data";

export default function BookTableForm() {
  // 1. Define your form.
  const form = useForm<BookTableSchema>({
    resolver: zodResolver(bookTableSchema),
    defaultValues: {
      name: "",
      email: "",
      numberOfCustomers: "empty",
      bookingDate: new Date(),
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof bookTableSchema>) {
    console.log(values);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex-1 space-y-8 flex flex-col"
      >
        <CustomBookTableField
          icon={<X className="text-primary size-4" />}
          control={form.control}
          name="name"
          placeholder="name"
        />
        <CustomBookTableField
          icon={<Mail className="text-primary size-4" />}
          control={form.control}
          name="email"
          placeholder="email"
        />
        <CustomSelectField
          control={form.control}
          name="numberOfCustomers"
          placeholder="how many persons?"
        >
          {Array.from({ length: numberOfPersons }).map((_, i) => (
            <SelectItem
              className="capitalize"
              key={i}
              value={i === 0 ? "empty" : String(i)}
            >
              {i === 0 ? "how many persons?" : i}
            </SelectItem>
          ))}
        </CustomSelectField>
        <DateTimePicker
          control={form.control}
          name="bookingDate"
          placeholder="pick up date"
        />
        <Button
          variant={"outline"}
          type="submit"
          className="font-semibold text-xl self-center text-white rounded-4xl border bg-secondary hover:text-secondary border-secondary hover:border-secondary py-6 px-8 md:py-7 md:px-10 transition-all"
        >
          Book Now
        </Button>
      </form>
    </Form>
  );
}
