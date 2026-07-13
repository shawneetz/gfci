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
import { createMinistry, updateMinistry, type MinistryInput } from "@/server/mutations/ministries";
import type { MinistryWithLeader } from "@/server/queries/ministries";
import type { Person } from "@/server/queries/people";

interface MinistryFormProps {
  ministry: MinistryWithLeader | null;
  people: Person[];
}

export function MinistryForm({ ministry, people }: MinistryFormProps) {
  const router = useRouter();
  const [form, setForm] = useState<MinistryInput>({
    title: ministry?.title ?? "",
    tagline: ministry?.tagline ?? "",
    overview: ministry?.overview ?? "",
    imageAlt: ministry?.imageAlt ?? "",
    audience: ministry?.audience ?? "",
    schedule: ministry?.schedule ?? "",
    location: ministry?.location ?? "",
    contactEmail: ministry?.contactEmail ?? "",
    order: ministry?.order ?? 0,
    leaderId: ministry?.leaderId ?? people[0]?.id ?? "",
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [status, setStatus] = useState<"idle" | "submitting" | "error">("idle");
  const [error, setError] = useState("");

  function updateField<K extends keyof MinistryInput>(field: K, value: MinistryInput[K]) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!ministry && !imageFile) {
      setStatus("error");
      setError("An image is required.");
      return;
    }

    setStatus("submitting");
    const resized = imageFile ? await resizeImageFile(imageFile) : null;

    const result = ministry
      ? await updateMinistry(ministry.id, form, resized, ministry.image)
      : await createMinistry(form, resized);

    if (result.success) {
      router.push("/admin/ministries");
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
        <FieldLabel>Tagline</FieldLabel>
        <TextField value={form.tagline} onChange={(e) => updateField("tagline", e.target.value)} required />
      </div>

      <div>
        <FieldLabel>Overview</FieldLabel>
        <TextAreaField rows={4} value={form.overview} onChange={(e) => updateField("overview", e.target.value)} required />
      </div>

      <ImageField label="Photo" currentUrl={ministry?.image} onChange={setImageFile} />

      <div>
        <FieldLabel>Image Alt Text</FieldLabel>
        <TextField value={form.imageAlt} onChange={(e) => updateField("imageAlt", e.target.value)} required />
      </div>

      <div>
        <FieldLabel>Audience</FieldLabel>
        <TextField value={form.audience} onChange={(e) => updateField("audience", e.target.value)} required />
      </div>

      <div>
        <FieldLabel>Schedule</FieldLabel>
        <TextField value={form.schedule} onChange={(e) => updateField("schedule", e.target.value)} required />
      </div>

      <div>
        <FieldLabel>Location</FieldLabel>
        <TextField value={form.location} onChange={(e) => updateField("location", e.target.value)} required />
      </div>

      <div>
        <FieldLabel>Contact Email</FieldLabel>
        <TextField type="email" value={form.contactEmail} onChange={(e) => updateField("contactEmail", e.target.value)} required />
      </div>

      <div>
        <FieldLabel>Leader</FieldLabel>
        <SelectField value={form.leaderId} onChange={(e) => updateField("leaderId", e.target.value)} required>
          {people.map((person) => (
            <option key={person.id} value={person.id}>
              {person.displayName}
            </option>
          ))}
        </SelectField>
      </div>

      <div>
        <FieldLabel>Display Order</FieldLabel>
        <TextField type="number" value={form.order} onChange={(e) => updateField("order", Number(e.target.value))} />
      </div>

      {status === "error" && <FormStatusBanner status="error" message={error} />}

      <div className="flex gap-3">
        <Button type="submit" fill="brand" text="inverse" border="brand" shadow="grey" disabled={status === "submitting"}>
          {status === "submitting" ? "Saving..." : "Save"}
        </Button>
        <Button type="button" onClick={() => router.push("/admin/ministries")} fill="transparent" text="ink" border="ink" shadow="transparent">
          Cancel
        </Button>
      </div>
    </form>
  );
}