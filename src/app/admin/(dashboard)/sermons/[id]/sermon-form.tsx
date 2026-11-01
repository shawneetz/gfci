"use client";

// Admin form for creating and editing a sermon.
import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";

import { FieldLabel } from "@/components/ui/field-label";
import { TextField } from "@/components/ui/text-field";
import { TextAreaField } from "@/components/ui/textarea-field";
import { SelectField } from "@/components/ui/select-field";
import { ImageField } from "../../_components/image-field";
import { AdminFormActions } from "../../_components/admin-form-actions";
import { resizeImageFile } from "@/lib/resize-image";
import { createSermon, updateSermon, type SermonInput } from "@/server/mutations/sermons";
import type { SermonWithSpeaker } from "@/server/queries/sermons";
import type { Person } from "@/server/queries/people";

interface SermonFormProps {
  sermon: SermonWithSpeaker | null;
  people: Person[];
}

export function SermonForm({ sermon, people }: SermonFormProps) {
  const router = useRouter();
  const [form, setForm] = useState<SermonInput>({
    title: sermon?.title ?? "",
    series: sermon?.series ?? "",
    date: sermon?.date ?? new Date().toISOString().slice(0, 10),
    videoUrl: sermon?.videoUrl ?? "",
    summary: sermon?.summary ?? "",
    speakerId: sermon?.speakerId ?? people[0]?.id ?? "",
  });
  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);
  const [status, setStatus] = useState<"idle" | "submitting" | "error">("idle");
  const [error, setError] = useState("");

  function updateField<K extends keyof SermonInput>(field: K, value: SermonInput[K]) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!sermon && !thumbnailFile) {
      setStatus("error");
      setError("A thumbnail image is required.");
      return;
    }

    setStatus("submitting");
    const resized = thumbnailFile ? await resizeImageFile(thumbnailFile) : null;

    const result = sermon
      ? await updateSermon(sermon.id, form, resized)
      : await createSermon(form, resized);

    if (result.success) {
      router.push("/admin/sermons");
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
        <FieldLabel>Series</FieldLabel>
        <TextField value={form.series} onChange={(e) => updateField("series", e.target.value)} required />
      </div>

      <div>
        <FieldLabel>Date</FieldLabel>
        <TextField type="date" value={form.date} onChange={(e) => updateField("date", e.target.value)} required />
      </div>

      <ImageField label="Thumbnail" currentUrl={sermon?.thumbnail} onChange={setThumbnailFile} />

      <div>
        <FieldLabel>Speaker</FieldLabel>
        <SelectField value={form.speakerId} onChange={(e) => updateField("speakerId", e.target.value)} required>
          {people.map((person) => (
            <option key={person.id} value={person.id}>
              {person.displayName}
            </option>
          ))}
        </SelectField>
      </div>

      <div>
        <FieldLabel>Video URL or Embed Code</FieldLabel>
        <TextAreaField
          rows={2}
          value={form.videoUrl}
          onChange={(e) => updateField("videoUrl", e.target.value)}
          placeholder="Paste a Facebook or YouTube video link, or the <iframe> embed code from Facebook/YouTube's Share → Embed option (optional)"
        />
      </div>

      <div>
        <FieldLabel>Summary</FieldLabel>
        <TextAreaField rows={3} value={form.summary} onChange={(e) => updateField("summary", e.target.value)} />
      </div>

      <AdminFormActions status={status} error={error} cancelHref="/admin/sermons" />
    </form>
  );
}