"use client";

// Admin form for creating and editing a prayer team.
import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";

import { FieldLabel } from "@/components/ui/field-label";
import { TextField } from "@/components/ui/text-field";
import { TextAreaField } from "@/components/ui/textarea-field";
import { SelectField } from "@/components/ui/select-field";
import { ICON_KEYS } from "@/lib/icon-map";
import { createPrayerTeam, updatePrayerTeam, type PrayerTeamInput } from "@/server/mutations/prayer-teams";
import type { PrayerTeam } from "@/server/queries/prayer-teams";
import { AdminFormActions } from "../../_components/admin-form-actions";

interface PrayerTeamFormProps {
  team: PrayerTeam | null;
}

export function PrayerTeamForm({ team }: PrayerTeamFormProps) {
  const router = useRouter();
  const [form, setForm] = useState<PrayerTeamInput>({
    name: team?.name ?? "",
    details: team?.details ?? "",
    icon: team?.icon ?? ICON_KEYS[0],
    schedule: team?.schedule ?? "",
    order: team?.order ?? 0,
  });
  const [status, setStatus] = useState<"idle" | "submitting" | "error">("idle");
  const [error, setError] = useState("");

  function updateField<K extends keyof PrayerTeamInput>(field: K, value: PrayerTeamInput[K]) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");

    const result = team ? await updatePrayerTeam(team.id, form) : await createPrayerTeam(form);

    if (result.success) {
      router.push("/admin/prayer-teams");
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
        <TextField value={form.name} onChange={(e) => updateField("name", e.target.value)} required />
      </div>

      <div>
        <FieldLabel>Schedule</FieldLabel>
        <TextField
          value={form.schedule}
          onChange={(e) => updateField("schedule", e.target.value)}
          placeholder="e.g. Sundays, 9:00 AM & 11:00 AM"
          required
        />
      </div>

      <div>
        <FieldLabel>Details</FieldLabel>
        <TextAreaField rows={3} value={form.details} onChange={(e) => updateField("details", e.target.value)} required />
      </div>

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
        <FieldLabel>Display Order</FieldLabel>
        <TextField type="number" value={form.order} onChange={(e) => updateField("order", Number(e.target.value))} />
      </div>

      <AdminFormActions status={status} error={error} cancelHref="/admin/prayer-teams" />
    </form>
  );
}