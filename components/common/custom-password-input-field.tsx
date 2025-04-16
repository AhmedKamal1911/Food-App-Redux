import { Control, FieldPath, FieldValues } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";

import { ReactNode } from "react";

import { cn } from "@/lib/utils";
import CustomPasswordInput from "./custom-password-input";

type Props<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> = {
  control: Control<TFieldValues>;
  name: TName;
  placeholder?: string;

  icon?: ReactNode;

  className?: string;
};
export default function CustomPasswordInputField<
  T extends FieldValues = FieldValues,
  K extends FieldPath<T> = FieldPath<T>
>({
  control,
  name,
  placeholder,

  icon,

  className,
}: Props<T, K>) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel className="sr-only">{field.name}</FormLabel>
          <FormControl>
            <CustomPasswordInput
              className={cn("bg-white", className)}
              icon={icon}
              placeholder={placeholder}
              {...field}
            />
          </FormControl>

          <FormMessage />
        </FormItem>
      )}
    />
  );
}
