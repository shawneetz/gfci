"use client";

// Admin form for creating and editing a core value (shown on the About page).
import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";

import { FieldLabel } from "@/components/ui/field-label";
import { TextField } from "@/components/ui/text-field";
import { TextAreaField } from "@/components/ui/textarea-field";
import { SelectField } from "@/components/ui/select-field";
import { AdminFormActions } from "../../_components/admin-form-actions";
import { ICON_KEYS } from "@/lib/icon-map";
import { createCoreValue, updateCoreValue, type CoreValueInput } from "@/server/mutations/core-values";
import type { CoreValue } from "@/server/queries/core-values";

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

      <AdminFormActions status={status} error={error} cancelHref="/admin/core-values" />
    </form>
  );
}