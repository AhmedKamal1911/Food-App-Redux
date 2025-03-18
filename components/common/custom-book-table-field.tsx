import { Control, FieldPath, FieldValues } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";

import { HTMLInputTypeAttribute, ReactNode } from "react";
import CustomBookTableInput from "./custom-book-table-input";

type Props<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> = {
  control: Control<TFieldValues>;
  name: TName;
  placeholder?: string;
  type?: HTMLInputTypeAttribute | undefined;
  icon?: ReactNode;
};
export default function CustomBookTableField<
  T extends FieldValues = FieldValues,
  K extends FieldPath<T> = FieldPath<T>
>({ control, name, placeholder, type, icon }: Props<T, K>) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel className="sr-only">{field.name}</FormLabel>
          <FormControl>
            <CustomBookTableInput
              icon={icon}
              type={type}
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
