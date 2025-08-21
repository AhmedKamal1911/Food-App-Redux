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
import { Mail, X } from "lucide-react";
import CustomSelectField from "../custom-select-field";
import { SelectItem } from "@/components/ui/select";
import { DateTimePicker } from "../date-picker/date-time-picker";

import { numberOfPersons } from "@/lib/data";
import { sendBookTableEmailAction } from "@/lib/server/actions/emails/send-book-table-email-action";
import { toast } from "react-toastify";
import { PhoneInput } from "@/components/ui/phone-input";
import { cn } from "@/lib/utils";
import {
  reservationSchema,
  ReservationSchema,
} from "@/lib/validation/reservation-table-schema";

export default function BookTableForm() {
  // 1. Define your form.
  const form = useForm<ReservationSchema>({
    resolver: zodResolver(reservationSchema),
    defaultValues: {
      name: "",
      email: "",
      numberOfCustomers: "empty",
      bookingDate: new Date(),
      phoneNumber: "",
    },
  });

  // 2. Define a submit handler.

  async function onSubmit(values: ReservationSchema) {
    try {
      const response = await sendBookTableEmailAction(values);
      if (response.status === "validationError") return;
      if (response.status === "success") {
        toast.success(response.message);
        form.reset();
        return;
      }
      toast.error(response.error.message);

      console.log(values);
    } catch (error) {
      console.error(error);
      toast.error("Network Error Occurred");
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex-1 space-y-8 flex flex-col"
      >
        <CustomInputField
          icon={<X className="text-primary size-4" />}
          control={form.control}
          name="name"
          placeholder="name"
        />
        <CustomInputField
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
        <Button
          disabled={form.formState.isSubmitting}
          variant={"outline"}
          type="submit"
          className="font-semibold text-xl self-center text-white rounded-4xl border bg-secondary hover:text-secondary border-secondary hover:border-secondary py-6 px-8 md:py-7 md:px-10 transition-all"
        >
          {form.formState.isSubmitting ? "Booking.." : "Book Now"}
        </Button>
      </form>
    </Form>
  );
}
