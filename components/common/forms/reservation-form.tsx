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
import { toast } from "react-toastify";
import { sendBookTableEmailAction } from "@/lib/server/actions/emails/send-book-table-email-action";

export default function ReservationForm() {
  // 1. Define your form.
  const form = useForm<ReservationSchema>({
    resolver: zodResolver(reservationSchema),
    defaultValues: {
      name: "",
      email: "",
      bookingDate: new Date(),
      numberOfCustomers: "empty",
      phoneNumber: "",
    },
  });

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
          name="name"
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
          name="email"
          placeholder="email address"
        />
        <CustomTextArea
          control={form.control}
          name="comments"
          placeholder="comments"
        />
        <Button
          disabled={form.formState.isSubmitting}
          className="rounded-[3px] font-semibold"
          type="submit"
        >
          {form.formState.isSubmitting ? "Booking.." : "Book Now"}
        </Button>
      </form>
    </Form>
  );
}
