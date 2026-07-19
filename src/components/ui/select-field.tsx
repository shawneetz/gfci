import { ChevronDown } from "lucide-react";
import { SelectHTMLAttributes } from "react";
import { cn } from "@/lib/utils";
import { ICON_SIZE } from "@/lib/icon-sizes";

interface SelectFieldProps extends SelectHTMLAttributes<HTMLSelectElement> {
  className?: string;
}

export function SelectField({ className, children, ...props }: SelectFieldProps) {
  return (
    <div className="relative">
      <select
        className={cn(
          "w-full appearance-none rounded-lg border border-border bg-surface px-4 py-3 pr-10 text-body text-ink transition-colors focus:border-brand",
          className
        )}
        {...props}
      >
        {children}
      </select>
      <ChevronDown
        size={ICON_SIZE.inline}
        className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-ink-muted"
      />
    </div>
  );
}