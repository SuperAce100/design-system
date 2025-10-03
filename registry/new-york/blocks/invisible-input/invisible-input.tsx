import * as React from "react";
import { cn } from "@/lib/utils";

export type InvisibleInputProps = React.InputHTMLAttributes<HTMLInputElement>;

const InvisibleInput = React.forwardRef<HTMLInputElement, InvisibleInputProps>(
  ({ className, ...props }, ref) => {
    return (
      <input
        ref={ref}
        data-slot="invisible-input"
        className={cn(
          "bg-transparent border-0 p-0 m-0 w-full min-w-0 outline-none focus:outline-none focus:ring-0 appearance-none",
          "placeholder:opacity-60",
          className
        )}
        {...props}
      />
    );
  }
);

InvisibleInput.displayName = "InvisibleInput";

export { InvisibleInput };

