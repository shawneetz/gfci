import { CheckCircle2, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface FormStatusBannerProps {
  status: "success" | "error";
  message: string;
  className?: string;
}

export function FormStatusBanner({
  status,
  message,
  className,
}: FormStatusBannerProps) {
  const isSuccess = status === "success";

  return (
    <div
      role="status"
      className={cn(
        "flex items-start gap-3 border-2 p-4",
        isSuccess
          ? "border-brand bg-brand-subtle text-brand"
          : "border-ink bg-surface-alt text-ink",
        className
      )}
    >
      {isSuccess ? (
        <CheckCircle2 size={20} className="mt-0.5 shrink-0" />
      ) : (
        <AlertCircle size={20} className="mt-0.5 shrink-0" />
      )}
      <p className="text-body-sm">{message}</p>
    </div>
  );
}