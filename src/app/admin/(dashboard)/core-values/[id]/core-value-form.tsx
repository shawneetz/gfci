"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";

import { FieldLabel } from "@/components/ui/field-label";
import { TextField } from "@/components/ui/text-field";
import { TextAreaField } from "@/components/ui/textarea-field";
import { SelectField } from "@/components/ui/select-field";
import { Button } from "@/components/ui/button";
import { FormStatusBanner } from "@/components/ui/form-status-banner";
import { ICON_MAP } from "@/lib/icon-map";
import { createCoreValue, updateCoreValue, type CoreValueInput } from "@/server/mutations/core-values";
import type { CoreValue } from "@/server/queries/core-values";

const ICON_KEYS = Object.keys(ICON_MAP);

interface CoreValueFormProps {
  value: CoreValue | null;
}

export function CoreValueForm({ value }: CoreValueFormProps) {
  const router = useRouter();
  const [form, setForm] = useState<CoreValueInput>({
    icon: value?.icon ?? ICON_KEYS[0],
    title: value?.title ?? "",
    description: value?.description ?? "",
    order: value?.order ?? 0,
  });
  const [status, setStatus] = useState<"idle" | "submitting" | "error">("idle");
  const [error, setError] = useState("");

  function updateField<K extends keyof CoreValueInput>(field: K, val: CoreValueInput[K]) {
    setForm((prev) => ({ ...prev, [field]: val }));
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");

    const result = value ? await updateCoreValue(value.id, form) : await createCoreValue(form);

    if (result.success) {
      router.push("/admin/core-values");
      router.refresh();
    } else {
      setStatus("error");
      setError(result.error ?? "Something went wrong.");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-lg space-y-5">
      <div>
        <FieldLabel>Icon</FieldLabel>
        <SelectField value={form.icon} onChange={(e) => updateField("icon", e.target.value)}>
          {ICON_KEYS.map((key) => (
            <option key={key} value={key}>
              {key}
            </option>
          ))}
        </SelectField>
      </div>

      <div>
        <FieldLabel>Title</FieldLabel>
        <TextField value={form.title} onChange={(e) => updateField("title", e.target.value)} required />
      </div>

      <div>
        <FieldLabel>Description</FieldLabel>
        <TextAreaField rows={3} value={form.description} onChange={(e) => updateField("description", e.target.value)} required />
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
        <Button type="button" onClick={() => router.push("/admin/core-values")} fill="transparent" text="ink" border="ink" shadow="transparent">
          Cancel
        </Button>
      </div>
    </form>
  );
}