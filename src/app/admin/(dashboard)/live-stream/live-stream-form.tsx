"use client";

// Admin form for the single Live Stream row. It stays on the page after saving,
// so it shows a "Saved." message and has no Cancel link.
import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";

import { FieldLabel } from "@/components/ui/field-label";
import { TextField } from "@/components/ui/text-field";
import { AdminFormActions } from "../_components/admin-form-actions";
import { updateLiveStream, type LiveStreamInput } from "@/server/mutations/live-stream";

interface LiveStreamFormProps {
  initial: LiveStreamInput;
}

export function LiveStreamForm({ initial }: LiveStreamFormProps) {
  const router = useRouter();
  const [form, setForm] = useState<LiveStreamInput>(initial);
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [error, setError] = useState("");

  function updateField<K extends keyof LiveStreamInput>(field: K, value: LiveStreamInput[K]) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");

    const result = await updateLiveStream(form);

    if (result.success) {
      setStatus("success");
      router.refresh();
    } else {
      setStatus("error");
      setError(result.error ?? "Something went wrong.");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-lg space-y-5">
      <div>
        <FieldLabel>Title</FieldLabel>
        <TextField value={form.title} onChange={(e) => updateField("title", e.target.value)} required />
      </div>

      <div>
        <FieldLabel>Schedule</FieldLabel>
        <TextField value={form.schedule} onChange={(e) => updateField("schedule", e.target.value)} required />
      </div>

      <div>
        <FieldLabel>Location</FieldLabel>
        <TextField value={form.location} onChange={(e) => updateField("location", e.target.value)} required />
      </div>

      <AdminFormActions status={status} error={error} successMessage="Saved." />
    </form>
  );
}