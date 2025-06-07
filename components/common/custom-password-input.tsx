import { cn } from "@/lib/utils";

import { Eye, EyeClosed } from "lucide-react";

import { ReactNode, useState } from "react";

export default function CustomPasswordInput({
  className,

  icon,
  enableShowPassword = true,
  ...props
}: React.ComponentProps<"input"> & {
  icon?: ReactNode;
  enableShowPassword?: boolean;
}) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="relative flex">
      <span className="absolute start-2 top-1/2 -translate-y-1/2">
        {icon && icon}
      </span>

      <input
        data-slot="input"
        className={cn(
          "file:text-foreground placeholder:capitalize placeholder:text-[#999999] selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-gray-600/50 flex h-9 w-full min-w-0 rounded-none border bg-transparent pe-4 py-5 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          "focus-visible:border-primary focus-visible:ring-primary/50 focus-visible:ring-[3px]",
          "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
          {
            "pl-7": icon,
            "p-5": !icon,
            "pr-7": enableShowPassword,
          },
          className
        )}
        type={showPassword ? "text" : "password"}
        {...props}
      />
      {enableShowPassword && (
        <button
          type="button"
          tabIndex={-1}
          onClick={() => setShowPassword((prev) => !prev)}
          className="absolute end-2 top-1/2 -translate-y-1/2 cursor-pointer"
        >
          {showPassword ? (
            <Eye className="size-3.5  text-primary" />
          ) : (
            <EyeClosed className="size-3.5 " />
          )}
        </button>
      )}
    </div>
  );
}
