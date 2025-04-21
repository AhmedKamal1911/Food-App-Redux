import { FormField, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { HTMLInputTypeAttribute } from "react";
import Dropzone from "react-dropzone";
import { Control, FieldPath, FieldValues } from "react-hook-form";

type Props<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> = {
  control: Control<TFieldValues>;
  name: TName;
  placeholder?: string;
  type?: HTMLInputTypeAttribute;
  className?: string;
  maxSize?: number;
};

export default function DropZoneField<
  T extends FieldValues = FieldValues,
  K extends FieldPath<T> = FieldPath<T>
>({ control, name, placeholder, maxSize = 5000000, className }: Props<T, K>) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <div className="space-y-2">
          <Dropzone
            accept={{ "image/*": [".jpg", ".jpeg", ".png"] }}
            multiple={false}
            maxSize={maxSize}
            onDrop={(acceptedFiles) => {
              // Update the field value with the selected file

              field.onChange(acceptedFiles[0]);
              console.log(acceptedFiles[0]);
            }}
          >
            {({ getRootProps, getInputProps }) => (
              <div
                {...getRootProps({
                  className: cn(
                    "p-3 flex flex-col items-center  justify-center h-[200px] rounded-md cursor-pointer border border-dashed border-gray-400",
                    className
                  ),
                })}
              >
                <span className=" font-bold capitalize">{placeholder}</span>
                <FormLabel
                  htmlFor={name}
                  className="cursor-pointer font-bold capitalize sr-only"
                >
                  {placeholder}
                </FormLabel>
                <Input {...getInputProps()} placeholder={placeholder} />
              </div>
            )}
          </Dropzone>
          <FormMessage />
        </div>
      )}
    />
  );
}
