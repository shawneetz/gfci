import { InputHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

interface TextFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  icon?: ReactNode;
  className?: string;
}

export function TextField({ icon, className, ...props }: TextFieldProps) {
  return (
    <div className="relative">
      {icon && (
        <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 font-bold text-ink-muted">
          {icon}
        </span>
      )}
      <input
        className={cn(
          "w-full rounded-none border-2 border-border bg-surface py-3 text-body text-ink placeholder:text-ink-muted transition-colors focus:border-ink",
          icon ? "pl-10 pr-4" : "px-4",
          className
        )}
        {...props}
      />
    </div>
  );
}