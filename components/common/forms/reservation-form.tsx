"use client";
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
import { useForm } from "react-hook-form";
import CustomInputField from "../custom-input-field";
import CustomSelectField from "../custom-select-field";
import { SelectItem } from "@/components/ui/select";
import { numberOfPersons } from "@/lib/data";
import { DateTimePicker } from "../date-picker/date-time-picker";
import CustomTextArea from "../custom-text-area";
import {
  reservationSchema,
  ReservationSchema,
} from "@/lib/validation/reservation-table-schema";
import { PhoneInput } from "@/components/ui/phone-input";
import { cn } from "@/lib/utils";

export default function ReservationForm() {
  // 1. Define your form.
  const form = useForm<ReservationSchema>({
    resolver: zodResolver(reservationSchema),
    defaultValues: {
      username: "",
      emailAddress: "",
      bookingDate: new Date(),
      numberOfCustomers: "empty",
      phoneNumber: "",
      comments: "",
    },
  });

  function onSubmit(values: ReservationSchema) {
    console.log(values);
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
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
        <CustomInputField
          control={form.control}
          name="username"
          placeholder="name"
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

        <CustomInputField
          control={form.control}
          name="emailAddress"
          placeholder="email address"
        />
        <CustomTextArea
          control={form.control}
          name="comments"
          placeholder="comments"
        />
        <Button className="rounded-[3px] font-semibold" type="submit">
          Book Now
        </Button>
      </form>
    </Form>
  );
}
