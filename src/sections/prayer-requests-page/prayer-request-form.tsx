"use client";

import { useState, FormEvent } from "react";
import { Send } from "lucide-react";

import { Container } from "@/components/ui/container";
import { Panel } from "@/components/ui/panel";
import { FieldLabel } from "@/components/ui/field-label";
import { TextField } from "@/components/ui/text-field";
import { SelectField } from "@/components/ui/select-field";
import { TextAreaField } from "@/components/ui/textarea-field";
import { RadioOption } from "@/components/ui/radio-option";
import { Button } from "@/components/ui/button";
import { FormStatusBanner } from "@/components/ui/form-status-banner";
import { PRAYER_CATEGORIES, type PrayerRequestSubmission } from "@/types";
import { submitPrayerRequest, type SubmitStatus } from "@/lib/forms";
import { FORM_PAGE_MAX_WIDTH } from "@/lib/layout";
import { form as prayerForm } from "@/content/prayer-requests";

const initialForm: PrayerRequestSubmission = {
  name: "",
  email: "",
  category: PRAYER_CATEGORIES[0],
  message: "",
  visibility: "private",
};

export function PrayerRequestForm() {
  const [form, setForm] = useState<PrayerRequestSubmission>(initialForm);
  const [status, setStatus] = useState<SubmitStatus>("idle");

  function updateField<K extends keyof PrayerRequestSubmission>(
    field: K,
    value: PrayerRequestSubmission[K]
  ) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");

    const result = await submitPrayerRequest(form);

    if (result.success) {
      setStatus("success");
      setForm(initialForm);
    } else {
      setStatus("error");
    }
  }

  return (
    <section className="section bg-surface">
      <Container className={FORM_PAGE_MAX_WIDTH}>
        <form onSubmit={handleSubmit}>
          <Panel className="space-y-8">
            <div>
              <FieldLabel>Your Name</FieldLabel>
              <TextField
                name="name"
                placeholder="Full name"
                value={form.name}
                onChange={(e) => updateField("name", e.target.value)}
                disabled={status === "submitting"}
                required
              />
            </div>

            <div>
              <FieldLabel>Email</FieldLabel>
              <TextField
                type="email"
                name="email"
                placeholder="you@example.com"
                value={form.email}
                onChange={(e) => updateField("email", e.target.value)}
                disabled={status === "submitting"}
                required
              />
            </div>

            <div>
              <FieldLabel>Category</FieldLabel>
              <SelectField
                name="category"
                value={form.category}
                onChange={(e) =>
                  updateField("category", e.target.value as PrayerRequestSubmission["category"])
                }
                disabled={status === "submitting"}
              >
                {PRAYER_CATEGORIES.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </SelectField>
            </div>

            <div>
              <FieldLabel>Your Prayer Request</FieldLabel>
              <TextAreaField
                name="message"
                rows={5}
                placeholder="Share as much or as little as you're comfortable with..."
                value={form.message}
                onChange={(e) => updateField("message", e.target.value)}
                disabled={status === "submitting"}
                required
              />
            </div>

            <div>
              <FieldLabel>Sharing Preference</FieldLabel>
              <div className="flex gap-8">
                <RadioOption
                  name="visibility"
                  value="private"
                  label="Prayer team only"
                  checked={form.visibility === "private"}
                  onChange={() => updateField("visibility", "private")}
                />
                <RadioOption
                  name="visibility"
                  value="public"
                  label="Share on prayer wall"
                  checked={form.visibility === "public"}
                  onChange={() => updateField("visibility", "public")}
                />
              </div>
            </div>

            {status === "success" && (
              <FormStatusBanner status="success" message={prayerForm.messages.success} />
            )}
            {status === "error" && (
              <FormStatusBanner status="error" message={prayerForm.messages.error} />
            )}

            <Button
              type="submit"
              fill="brand"
              text="inverse"
              border="brand"
              shadow="grey"
              className="w-full"
              disabled={status === "submitting"}
            >
              <Send size={16} />
              {status === "submitting" ? "Sending..." : prayerForm.submitLabel}
            </Button>
          </Panel>
        </form>
      </Container>
    </section>
  );
}
