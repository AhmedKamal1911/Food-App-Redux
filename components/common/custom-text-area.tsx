import { Control, FieldValues, Path } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Textarea } from "../ui/textarea";
import { cn } from "@/lib/utils";

type Props<T extends FieldValues> = {
  control: Control<T>;
  name: Path<T>; // ensures type-safe field name
  placeholder?: string;
  className?: string;
};

export default function CustomTextArea<T extends FieldValues>({
  control,
  name,
  placeholder,
  className,
}: Props<T>) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel className="sr-only">{name}</FormLabel>
          <FormControl>
            <Textarea
              placeholder={placeholder}
              className={cn(
                "bg-white min-h-[150px] max-h-[300px] rounded-none border-gray-600/60 focus-visible:ring-primary/50 focus-visible:border-primary",
                className
              )}
              {...field}
            />
          </FormControl>

          <FormMessage />
        </FormItem>
      )}
    />
  );
}
