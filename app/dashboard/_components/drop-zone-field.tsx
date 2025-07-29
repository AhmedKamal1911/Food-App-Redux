import { FormField, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { HTMLInputTypeAttribute } from "react";
import Dropzone from "react-dropzone";
import {
  Control,
  FieldPath,
  FieldValues,
  useFormContext,
} from "react-hook-form";

type Props<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = {
  control: Control<TFieldValues>;
  name: TName;
  placeholder?: string;
  type?: HTMLInputTypeAttribute;
  className?: string;

  setPreviewImage?: (url: string) => void;
};

export default function DropZoneField<
  T extends FieldValues = FieldValues,
  K extends FieldPath<T> = FieldPath<T>,
>({ control, name, placeholder, className, setPreviewImage }: Props<T, K>) {
  const { trigger } = useFormContext(); // Get `trigger` function from useFormContext to trigger validation

  return (
    <FormField
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <div className="space-y-2">
          <Dropzone
            multiple={false}
            onDrop={async (acceptedFiles) => {
              // Update the field value with the selected file

              const file = acceptedFiles[0];
              // console.log({ acceptedFiles, rej });
              field.onChange(file);
              await trigger(name);
              if (!fieldState.invalid) {
                setPreviewImage?.(URL.createObjectURL(file));
              }
            }}
          >
            {({ getRootProps, getInputProps, isDragActive }) => (
              <div
                {...getRootProps({
                  className: cn(
                    `${
                      isDragActive ? "bg-primary/10" : ""
                    } p-3 flex flex-col items-center hover:bg-primary/10 transition-colors  justify-center h-[150px] rounded-md cursor-pointer border border-dashed border-gray-400`,
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
                <Input
                  {...getInputProps()}
                  accept="image/jpg,image/jpeg,image/png"
                  placeholder={placeholder}
                />
              </div>
            )}
          </Dropzone>
          <FormMessage />
        </div>
      )}
    />
  );
}
