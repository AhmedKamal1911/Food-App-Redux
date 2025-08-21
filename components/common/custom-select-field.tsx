import { ReactNode } from "react";
import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Control, FieldPath, FieldValues } from "react-hook-form";

type Props<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = {
  control: Control<TFieldValues>;
  name: TName;
  placeholder?: string;
  icon?: ReactNode;
  children: ReactNode;
};

export default function CustomSelectField<
  T extends FieldValues = FieldValues,
  K extends FieldPath<T> = FieldPath<T>,
>({ control, name, placeholder, children }: Props<T, K>) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel className="sr-only">{field.name}</FormLabel>
          <Select onValueChange={field.onChange} value={field.value}>
            <SelectTrigger className="bg-white py-5 w-full border-gray-500/40 focus-visible:ring-primary/50 focus-visible:border-primary capitalize">
              <SelectValue className="py-4" placeholder={placeholder} />
            </SelectTrigger>
            <SelectContent className="rounded-sm">{children}</SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
