"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { FormStatusBanner } from "@/components/ui/form-status-banner";

interface AdminFormActionsProps {
  status: "idle" | "submitting" | "error";
  error?: string;
  cancelHref: string;
}

export function AdminFormActions({ status, error, cancelHref }: AdminFormActionsProps) {
  return (
    <>
      {status === "error" && <FormStatusBanner status="error" message={error || "Something went wrong."} />}
      <div className="flex gap-3">
        <Button type="submit" fill="brand" text="inverse" border="brand" shadow="grey" disabled={status === "submitting"}>
          {status === "submitting" ? "Saving..." : "Save"}
        </Button>
        <Link href={cancelHref} className="inline-flex items-center justify-center rounded-lg border border-frame px-6 py-3 text-sm font-bold uppercase tracking-[0.14em] text-ink">
          Cancel
        </Link>
      </div>
    </>
  );
}
