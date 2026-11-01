"use client";

import { ChangeEvent, useEffect, useState } from "react";
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
  const [preview, setPreview] = useState<string>();
  const [error, setError] = useState("");
  useEffect(() => () => { if (preview?.startsWith("blob:")) URL.revokeObjectURL(preview); }, [preview]);
  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0] ?? null;
    setError("");
    if (file && (!file.type.startsWith("image/") || file.size > 15 * 1024 * 1024)) {
      setError(file.type.startsWith("image/") ? "Images must be 15 MB or smaller." : "Please choose an image file.");
      e.target.value = "";
      onChange(null);
      return;
    }
    if (preview?.startsWith("blob:")) URL.revokeObjectURL(preview);
    setPreview(file ? URL.createObjectURL(file) : undefined);
    onChange(file);
  }

  return (
    <div>
      <FieldLabel>{label}</FieldLabel>
      {(preview || currentUrl) && (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={preview || currentUrl} alt="" className="mb-3 h-24 w-24 border-2 border-frame object-cover" />
      )}
      <input
        type="file"
        accept="image/*"
        onChange={handleChange}
        className="block w-full text-body-sm text-ink-secondary file:mr-4 file:border-2 file:border-frame file:bg-surface file:px-4 file:py-2 file:text-sm file:font-bold file:uppercase file:tracking-wide"
      />
      {error && <p role="status" className="mt-1 text-caption text-red-700">{error}</p>}
      <p className="mt-1 text-caption text-ink-muted">
        {currentUrl ? "Leave blank to keep the current image." : required ? "Required." : "Optional."}
      </p>
    </div>
  );
}