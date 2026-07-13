"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Modal } from "@/components/ui/modal";
import { FormStatusBanner } from "@/components/ui/form-status-banner";
import type { MutationResult } from "@/server/mutations/types";

interface DeleteButtonProps {
  label: string;
  onDelete: () => Promise<MutationResult>;
}

export function DeleteButton({ label, onDelete }: DeleteButtonProps) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  function handleConfirm() {
    setError(null);
    startTransition(async () => {
      const result = await onDelete();
      if (result.success) {
        setOpen(false);
        router.refresh();
      } else {
        setError(result.error ?? "Something went wrong. Please try again.");
      }
    });
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label={`Delete ${label}`}
        className="text-ink-muted transition-colors hover:text-ink"
      >
        <Trash2 size={16} />
      </button>

      <Modal open={open} onClose={() => setOpen(false)} title={`Delete ${label}?`}>
        <div className="p-6 pt-10">
          <h2 className="text-lg font-bold text-ink">Delete {label}?</h2>
          <p className="mt-2 text-body-sm text-ink-secondary">This can&apos;t be undone.</p>

          {error && <FormStatusBanner status="error" message={error} className="mt-4" />}

          <div className="mt-6 flex gap-3">
            <Button
              type="button"
              onClick={handleConfirm}
              fill="ink"
              text="inverse"
              border="ink"
              shadow="grey"
              disabled={isPending}
              className="flex-1"
            >
              {isPending ? "Deleting..." : "Delete"}
            </Button>
            <Button
              type="button"
              onClick={() => setOpen(false)}
              fill="transparent"
              text="ink"
              border="ink"
              shadow="transparent"
              className="flex-1"
            >
              Cancel
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
}