"use client";

import { ChangeEvent } from "react";
import { FieldLabel } from "@/components/ui/field-label";

interface ImageFieldProps {
  label: string;
  currentUrl?: string;
  onChange: (file: File | null) => void;
  // Ministry/Sermon/Event images are required by their schema, so that's
  // the default. Pass required={false} for fields like Person.imageUrl
  // that are genuinely optional — otherwise the helper text below would
  // wrongly say "Required." for a field that isn't.
  required?: boolean;
}

export function ImageField({ label, currentUrl, onChange, required = true }: ImageFieldProps) {
  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    onChange(e.target.files?.[0] ?? null);
  }

  return (
    <div>
      <FieldLabel>{label}</FieldLabel>
      {currentUrl && (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={currentUrl} alt="" className="mb-3 h-24 w-24 border-2 border-frame object-cover" />
      )}
      <input
        type="file"
        accept="image/*"
        onChange={handleChange}
        className="block w-full text-body-sm text-ink-secondary file:mr-4 file:border-2 file:border-frame file:bg-surface file:px-4 file:py-2 file:text-sm file:font-bold file:uppercase file:tracking-wide"
      />
      <p className="mt-1 text-caption text-ink-muted">
        {currentUrl ? "Leave blank to keep the current image." : required ? "Required." : "Optional."}
      </p>
    </div>
  );
}