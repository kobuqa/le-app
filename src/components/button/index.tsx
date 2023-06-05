import React, { ButtonHTMLAttributes, FC, forwardRef } from "react";
import { type VariantProps, cva } from "class-variance-authority";
import { cn } from "../../shared/utils";

interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

const buttonVariants = cva("p-4 rounded-sm", {
  variants: {
    intent: {
      primary: [
        "bg-primary",
        "text-black",
        "border-transparent",
        "hover:brightness-75",
        "active:brightness-50",
        "disabled:bg-slate-300",
        "disabled:text-white",
        "transition-colors",
      ],
    },
    size: {
      small: ["text-sm", "py-1", "px-2"],
      medium: ["text-base", "py-2", "px-4"],
    },
  },
  compoundVariants: [{ intent: "primary", size: "medium", class: "uppercase" }],
  defaultVariants: {
    intent: "primary",
    size: "medium",
  },
});

const Button: FC<ButtonProps> = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, intent, size, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(buttonVariants({ intent, size, className }))}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
