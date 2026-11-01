"use client";

// Admin form for creating and editing an answered-prayer testimony.
import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";

import { FieldLabel } from "@/components/ui/field-label";
import { TextField } from "@/components/ui/text-field";
import { TextAreaField } from "@/components/ui/textarea-field";
import { SelectField } from "@/components/ui/select-field";
import { AdminFormActions } from "../../_components/admin-form-actions";
import { createTestimony, updateTestimony, type TestimonyInput } from "@/server/mutations/testimonies";
import type { AnsweredPrayer } from "@/server/queries/testimonies";
import { PRAYER_CATEGORIES } from "@/types";

interface TestimonyFormProps {
  entry: AnsweredPrayer | null;
}

export function TestimonyForm({ entry }: TestimonyFormProps) {
  const router = useRouter();
  const [form, setForm] = useState<TestimonyInput>({
    name: entry?.name ?? "",
    category: entry?.category ?? PRAYER_CATEGORIES[0],
    quote: entry?.quote ?? "",
  });
  const [status, setStatus] = useState<"idle" | "submitting" | "error">("idle");
  const [error, setError] = useState("");

  function updateField<K extends keyof TestimonyInput>(field: K, value: TestimonyInput[K]) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");

    const result = entry ? await updateTestimony(entry.id, form) : await createTestimony(form);

    if (result.success) {
      router.push("/admin/testimonies");
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
        <TextField value={form.name} onChange={(e) => updateField("name", e.target.value)} placeholder="Grace M." required />
      </div>

      <div>
        <FieldLabel>Category</FieldLabel>
        <SelectField value={form.category} onChange={(e) => updateField("category", e.target.value as TestimonyInput["category"])}>
          {PRAYER_CATEGORIES.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </SelectField>
      </div>

      <div>
        <FieldLabel>Quote</FieldLabel>
        <TextAreaField rows={4} value={form.quote} onChange={(e) => updateField("quote", e.target.value)} required />
      </div>

      <AdminFormActions status={status} error={error} cancelHref="/admin/testimonies" />
    </form>
  );
}