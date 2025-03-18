import { cn } from "@/lib/utils";

import { ReactNode } from "react";

export default function CustomBookTableInput({
  className,
  type,
  icon,
  ...props
}: React.ComponentProps<"input"> & {
  icon?: ReactNode;
}) {
  return (
    <div className="relative">
      <span className="absolute start-2 top-1/2 -translate-y-1/2">
        {icon && icon}
      </span>

      <input
        type={type}
        data-slot="input"
        className={cn(
          "file:text-foreground placeholder:capitalize placeholder:text-[#999999] selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-0 border bg-transparent pe-4 py-5 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          "focus-visible:border-primary focus-visible:ring-primary/50 focus-visible:ring-[3px]",
          "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
          className,
          icon && "ps-7"
        )}
        {...props}
      />
    </div>
  );
}
