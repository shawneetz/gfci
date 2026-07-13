"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";

import { FieldLabel } from "@/components/ui/field-label";
import { TextField } from "@/components/ui/text-field";
import { Button } from "@/components/ui/button";
import { FormStatusBanner } from "@/components/ui/form-status-banner";
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

      {status === "success" && <FormStatusBanner status="success" message="Saved." />}
      {status === "error" && <FormStatusBanner status="error" message={error} />}

      <Button type="submit" fill="brand" text="inverse" border="brand" shadow="grey" disabled={status === "submitting"}>
        {status === "submitting" ? "Saving..." : "Save"}
      </Button>
    </form>
  );
}