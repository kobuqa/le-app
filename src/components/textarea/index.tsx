import React, { FC, TextareaHTMLAttributes, forwardRef } from "react";
import { type VariantProps, cva } from "class-variance-authority";
import { cn } from "../../shared/utils";

interface TextAreaProps
  extends TextareaHTMLAttributes<HTMLTextAreaElement>,
    VariantProps<typeof textAreaVariants> {}

const textAreaVariants = cva("p-2 rounded-sm", {
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

const TextArea: FC<TextAreaProps> = forwardRef<
  HTMLTextAreaElement,
  TextAreaProps
>(({ className, intent, ...props }, ref) => {
  return (
    <textarea
      ref={ref}
      className={cn(textAreaVariants({ intent, className }))}
      {...props}
    />
  );
});

TextArea.displayName = "TextArea";

export { TextArea, textAreaVariants };
