"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";

import { FieldLabel } from "@/components/ui/field-label";
import { TextField } from "@/components/ui/text-field";
import { TextAreaField } from "@/components/ui/textarea-field";
import { SelectField } from "@/components/ui/select-field";
import { Button } from "@/components/ui/button";
import { FormStatusBanner } from "@/components/ui/form-status-banner";
import { ImageField } from "../../_components/image-field";
import { resizeImageFile } from "@/lib/resize-image";
import { createEvent, updateEvent, type EventInput } from "@/server/mutations/events";
import type { ChurchEvent } from "@/server/queries/events";
import { EVENT_CATEGORIES } from "@/types";

interface EventFormProps {
  event: ChurchEvent | null;
}

export function EventForm({ event }: EventFormProps) {
  const router = useRouter();
  const [form, setForm] = useState<EventInput>({
    title: event?.title ?? "",
    date: event?.date ?? new Date().toISOString().slice(0, 10),
    time: event?.time ?? "",
    category: event?.category ?? EVENT_CATEGORIES[0],
    location: event?.location ?? "",
    description: event?.description ?? "",
    featured: event?.featured ?? false,
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [status, setStatus] = useState<"idle" | "submitting" | "error">("idle");
  const [error, setError] = useState("");

  function updateField<K extends keyof EventInput>(field: K, value: EventInput[K]) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!event && !imageFile) {
      setStatus("error");
      setError("An image is required.");
      return;
    }

    setStatus("submitting");
    const resized = imageFile ? await resizeImageFile(imageFile) : null;

    const result = event
      ? await updateEvent(event.id, form, resized, event.image)
      : await createEvent(form, resized);

    if (result.success) {
      router.push("/admin/events");
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

      <div className="grid grid-cols-2 gap-4">
        <div>
          <FieldLabel>Date</FieldLabel>
          <TextField type="date" value={form.date} onChange={(e) => updateField("date", e.target.value)} required />
        </div>
        <div>
          <FieldLabel>Time</FieldLabel>
          <TextField value={form.time} onChange={(e) => updateField("time", e.target.value)} placeholder="7:00 PM" required />
        </div>
      </div>

      <div>
        <FieldLabel>Category</FieldLabel>
        <SelectField value={form.category} onChange={(e) => updateField("category", e.target.value as EventInput["category"])}>
          {EVENT_CATEGORIES.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </SelectField>
      </div>

      <div>
        <FieldLabel>Location</FieldLabel>
        <TextField value={form.location} onChange={(e) => updateField("location", e.target.value)} required />
      </div>

      <ImageField label="Image" currentUrl={event?.image} onChange={setImageFile} />

      <div>
        <FieldLabel>Description</FieldLabel>
        <TextAreaField rows={3} value={form.description} onChange={(e) => updateField("description", e.target.value)} required />
      </div>

      <label className="flex items-center gap-2 text-body-sm font-semibold text-ink">
        <input
          type="checkbox"
          checked={form.featured}
          onChange={(e) => updateField("featured", e.target.checked)}
          className="h-5 w-5 border-2 border-border accent-brand"
        />
        Featured event (only one at a time)
      </label>

      {status === "error" && <FormStatusBanner status="error" message={error} />}

      <div className="flex gap-3">
        <Button type="submit" fill="brand" text="inverse" border="brand" shadow="grey" disabled={status === "submitting"}>
          {status === "submitting" ? "Saving..." : "Save"}
        </Button>
        <Button type="button" onClick={() => router.push("/admin/events")} fill="transparent" text="ink" border="ink" shadow="transparent">
          Cancel
        </Button>
      </div>
    </form>
  );
}