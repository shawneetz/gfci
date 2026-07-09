import { cn } from "@/lib/utils";

interface AmountOptionProps {
  amount: number;
  selected: boolean;
  onClick: () => void;
  currency?: string;
  className?: string;
}

export function AmountOption({
  amount,
  selected,
  onClick,
  currency = "₱",
  className,
}: AmountOptionProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={selected}
      className={cn(
        "flex-1 rounded-none border-2 py-3 text-center font-headline text-lg font-bold transition-colors duration-150",
        selected
          ? "border-brand bg-brand-subtle text-brand"
          : "border-border bg-surface text-ink hover:border-ink",
        className
      )}
    >
      {currency}
      {amount}
    </button>
  );
}