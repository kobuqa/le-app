import React, { FC, InputHTMLAttributes, forwardRef } from "react";
import { type VariantProps, cva } from "class-variance-authority";
import { cn } from "../../shared/utils";

interface InputProps
  extends InputHTMLAttributes<HTMLInputElement>,
    VariantProps<typeof inputVariants> {}

const inputVariants = cva("p-2 rounded-sm", {
  variants: {
    intent: {
      primary: ["bg-transparent", "border", "border-slate-400"],
      secondary: [
        "bg-white",
        "text-gray-800",
        "border-gray-400",
        "hover:bg-gray-100",
      ],
    },
  },
  defaultVariants: {
    intent: "primary",
  },
});

const Input: FC<InputProps> = forwardRef<HTMLInputElement, InputProps>(
  ({ className, intent, ...props }, ref) => {
    return (
      <input
        ref={ref}
        className={cn(inputVariants({ intent, className }))}
        {...props}
      />
    );
  }
);

Input.displayName = "Input";

export { Input, inputVariants };
