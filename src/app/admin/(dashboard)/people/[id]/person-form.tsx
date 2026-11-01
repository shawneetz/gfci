"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";

import { FieldLabel } from "@/components/ui/field-label";
import { TextField } from "@/components/ui/text-field";
import { Button } from "@/components/ui/button";
import { FormStatusBanner } from "@/components/ui/form-status-banner";
import { ImageField } from "../../_components/image-field";
import { resizeImageFile } from "@/lib/resize-image";
import { createPerson, updatePerson, type PersonInput } from "@/server/mutations/people";
import type { Person } from "@/server/queries/people";

interface PersonFormProps {
  person: Person | null;
}

export function PersonForm({ person }: PersonFormProps) {
  const router = useRouter();
  const [form, setForm] = useState<PersonInput>({
    name: person?.name ?? "",
    title: person?.title ?? "",
    displayName: person?.displayName ?? "",
    email: person?.email ?? "",
    isLeadershipTeam: person?.isLeadershipTeam ?? false,
    leadershipOrder: person?.leadershipOrder ?? null,
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [status, setStatus] = useState<"idle" | "submitting" | "error">("idle");
  const [error, setError] = useState("");

  function updateField<K extends keyof PersonInput>(field: K, value: PersonInput[K]) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");

    const resized = imageFile ? await resizeImageFile(imageFile) : null;

    const result = person
      ? await updatePerson(person.id, form, resized)
      : await createPerson(form, resized);

    if (result.success) {
      router.push("/admin/people");
      router.refresh();
    } else {
      setStatus("error");
      setError(result.error ?? "Something went wrong.");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-lg space-y-5">
      <div>
        <FieldLabel>Name</FieldLabel>
        <TextField value={form.name} onChange={(e) => updateField("name", e.target.value)} placeholder="Sarah Jenkins" required />
      </div>

      <div>
        <FieldLabel>Title / Role</FieldLabel>
        <TextField value={form.title} onChange={(e) => updateField("title", e.target.value)} placeholder="Lead Pastor" required />
      </div>

      <div>
        <FieldLabel>Display Name</FieldLabel>
        <TextField
          value={form.displayName}
          onChange={(e) => updateField("displayName", e.target.value)}
          placeholder="Pastor Sarah Jenkins"
          required
        />
      </div>

      <div>
        <FieldLabel>Email</FieldLabel>
        <TextField type="email" value={form.email} onChange={(e) => updateField("email", e.target.value)} />
      </div>

      <ImageField
        label="Photo"
        currentUrl={person?.imageUrl ?? undefined}
        onChange={setImageFile}
        required={false}
      />

      <label className="flex items-center gap-2 text-body-sm font-semibold text-ink">
        <input
          type="checkbox"
          checked={form.isLeadershipTeam}
          onChange={(e) => updateField("isLeadershipTeam", e.target.checked)}
          className="h-5 w-5 border-2 border-border accent-brand"
        />
        Show on About page (Leadership team)
      </label>

      {form.isLeadershipTeam && (
        <div>
          <FieldLabel>Leadership Display Order</FieldLabel>
          <TextField
            type="number"
            value={form.leadershipOrder ?? 0}
            onChange={(e) => updateField("leadershipOrder", Number(e.target.value))}
          />
        </div>
      )}

      {status === "error" && <FormStatusBanner status="error" message={error} />}

      <div className="flex gap-3">
        <Button type="submit" fill="brand" text="inverse" border="brand" shadow="grey" disabled={status === "submitting"}>
          {status === "submitting" ? "Saving..." : "Save"}
        </Button>
        <Button type="button" onClick={() => router.push("/admin/people")} fill="transparent" text="ink" border="ink" shadow="transparent">
          Cancel
        </Button>
      </div>
    </form>
  );
}