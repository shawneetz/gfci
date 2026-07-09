import { cn } from "@/lib/utils";

interface RadioOptionProps {
  label: string;
  name: string;
  value: string;
  checked: boolean;
  onChange: () => void;
  className?: string;
}

export function RadioOption({
  label,
  name,
  value,
  checked,
  onChange,
  className,
}: RadioOptionProps) {
  return (
    <label className={cn("flex cursor-pointer select-none items-center gap-2", className)}>
      <input
        type="radio"
        name={name}
        value={value}
        checked={checked}
        onChange={onChange}
        className="sr-only"
      />
      <span
        className={cn(
          "flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 transition-colors",
          checked ? "border-brand" : "border-border"
        )}
      >
        {checked && <span className="h-2.5 w-2.5 rounded-full bg-brand" />}
      </span>
      <span
        className={cn(
          "text-body-sm font-semibold",
          checked ? "text-ink" : "text-ink-muted"
        )}
      >
        {label}
      </span>
    </label>
  );
}