import { TextareaHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface TextAreaFieldProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  className?: string;
}

export function TextAreaField({ className, ...props }: TextAreaFieldProps) {
  return (
    <textarea
      className={cn(
        "w-full rounded-lg border border-border bg-surface px-4 py-3 text-body text-ink placeholder:text-ink-muted transition-colors focus:border-brand",
        className
      )}
      {...props}
    />
  );
}