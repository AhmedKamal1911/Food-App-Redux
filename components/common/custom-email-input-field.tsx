import {
  Control,
  FieldPath,
  FieldValues,
  useFormContext,
} from "react-hook-form";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";

import { HTMLInputTypeAttribute, ReactNode, useRef } from "react";

import { cn } from "@/lib/utils";
import CustomEmailInput from "./custom-email-input";

import { useCheckEmail } from "@/hooks/use-check-email";
import { Button } from "../ui/button";

type Props<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = {
  control: Control<TFieldValues>;
  name: TName;
  placeholder?: string;
  type?: HTMLInputTypeAttribute | undefined;
  icon?: ReactNode;
  className?: string;
  setIsEmailStatusOk?: (statusFlag: boolean) => void;
  initialEmail?: string;
};
export default function CustomEmailInputField<
  T extends FieldValues = FieldValues,
  K extends FieldPath<T> = FieldPath<T>,
>({
  control,
  name,
  placeholder,
  setIsEmailStatusOk,
  type,
  icon,
  className,
  initialEmail,
}: Props<T, K>) {
  const emailRef = useRef<string | null>(null);
  const form = useFormContext();

  const { checkEmail, error, latestStatusRef, status, setStatus } =
    useCheckEmail({
      setIsEmailStatusOk,
    });
  return (
    <FormField
      control={control}
      name={name}
      render={({ field: { onBlur, ...restField }, fieldState }) => (
        <FormItem>
          <FormLabel className="sr-only">{restField.name}</FormLabel>
          <FormControl>
            <CustomEmailInput
              onBlur={async (e) => {
                onBlur();
                await form.trigger(restField.name);
                const isValid = !fieldState.invalid;
                if (e.target.value === initialEmail) {
                  setStatus("idle"); // or reset to idle
                  return;
                }
                if (
                  (fieldState.isTouched &&
                    isValid &&
                    emailRef.current === e.target.value &&
                    latestStatusRef.current === "available") ||
                  (latestStatusRef.current === "inavaliable" && !error)
                ) {
                  setStatus(latestStatusRef.current);
                }
                if (
                  fieldState.isTouched &&
                  isValid &&
                  emailRef.current !== e.target.value
                ) {
                  emailRef.current = e.target.value;
                  checkEmail(e.target.value);
                }
                if (fieldState.invalid && fieldState.isTouched) {
                  setStatus("idle");
                }
              }}
              status={status}
              className={cn("bg-white", className)}
              icon={icon}
              type={type}
              placeholder={placeholder}
              {...restField}
            />
          </FormControl>
          {status === "available" ? (
            <span className="text-green-500">email is available to use</span>
          ) : status === "inavaliable" ? (
            <span className="text-destructive">email is already in use</span>
          ) : status === "error" ? (
            <div className="flex items-center gap-2">
              <span className="text-destructive">{error}</span>
              <Button
                variant={"destructive"}
                className="p-1.5 h-auto capitalize rounded-sm"
                onClick={() => checkEmail(restField.value)}
                type="button"
              >
                retry
              </Button>
            </div>
          ) : (
            <FormMessage />
          )}
        </FormItem>
      )}
    />
  );
}
