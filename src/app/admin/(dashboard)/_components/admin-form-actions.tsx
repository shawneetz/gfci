"use client";

// Shared bottom block for every admin form: status banner, Save button,
// and an optional Cancel link (single-form screens like Live Stream omit it).
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { FormStatusBanner } from "@/components/ui/form-status-banner";

interface AdminFormActionsProps {
  status: "idle" | "submitting" | "success" | "error";
  error?: string;
  successMessage?: string;
  cancelHref?: string;
}

export function AdminFormActions({
  status,
  error,
  successMessage,
  cancelHref,
}: AdminFormActionsProps) {
  return (
    <>
      {/* Banner: shows the success text (if one was given) or the server's error. */}
      {status === "success" && successMessage && (
        <FormStatusBanner status="success" message={successMessage} />
      )}
      {status === "error" && (
        <FormStatusBanner status="error" message={error || "Something went wrong."} />
      )}

      <div className="flex gap-3">
        <Button
          type="submit"
          fill="brand"
          text="inverse"
          border="brand"
          shadow="grey"
          disabled={status === "submitting"}
        >
          {status === "submitting" ? "Saving..." : "Save"}
        </Button>

        {cancelHref && (
          <Link
            href={cancelHref}
            className="inline-flex items-center justify-center rounded-lg border border-frame px-6 py-3 text-sm font-bold uppercase tracking-[0.14em] text-ink"
          >
            Cancel
          </Link>
        )}
      </div>
    </>
  );
}
