"use client";

import { useEffect, ReactNode } from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title?: string; // used for aria-label — render your own visible header in children if you need one
  children: ReactNode;
  className?: string;
}

export function Modal({ open, onClose, title, children, className }: ModalProps) {
  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={title}
      className="fixed inset-0 z-100 flex items-end justify-center sm:items-center sm:p-6"
    >
      <div
        onClick={onClose}
        aria-hidden="true"
        className="absolute inset-0 bg-ink/70"
      />

      <div
        className={cn(
          "relative max-h-[90vh] w-full max-w-lg overflow-y-auto border-2 border-ink bg-surface shadow-[6px_6px_0_0_var(--color-ink)]",
          className
        )}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute right-4 top-4 z-10 flex h-9 w-9 items-center justify-center border-2 border-ink bg-surface text-ink transition-colors hover:bg-surface-alt"
        >
          <X size={18} />
        </button>

        {children}
      </div>
    </div>
  );
}