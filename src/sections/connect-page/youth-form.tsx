"use client";

import { useState, FormEvent } from "react";

import { FieldLabel } from "@/components/ui/field-label";
import { TextField } from "@/components/ui/text-field";
import { Button } from "@/components/ui/button";
import { FormStatusBanner } from "@/components/ui/form-status-banner";
import { OptionalContactFields } from "@/sections/connect-page/optional-contact-fields";
import type { MinistryWithLeader } from "@/server/queries/ministries";
import { submitConnectRegistration, type SubmitStatus } from "@/lib/forms";
import type { YouthConnectRegistration } from "@/types";
import { messages } from "@/content/connect";

type YouthFormFields = Omit<YouthConnectRegistration, "audience">;

const initialForm: YouthFormFields = {
  studentName: "",
  grade: "",
  email: "",
  visitDate: "",
  socialMedia: "",
  additionalContact: "",
};

interface YouthFormProps {
  ministries: MinistryWithLeader[];
}

export function YouthForm({ ministries }: YouthFormProps) {
  const youthMinistry = ministries.find((m) => m.slug === "faith-youth");

  const [form, setForm] = useState<YouthFormFields>(initialForm);
  const [status, setStatus] = useState<SubmitStatus>("idle");

  function updateField<K extends keyof YouthFormFields>(field: K, value: YouthFormFields[K]) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");

    const result = await submitConnectRegistration({ audience: "youth", ...form });

    if (result.success) {
      setStatus("success");
      setForm(initialForm);
    } else {
      setStatus("error");
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <p className="text-body-sm text-ink-secondary">
        Let us know a student is visiting {youthMinistry?.title ?? "Faith Youth"}{" "}
        ({youthMinistry?.audience ?? "Grades 6 – 12"}) so we can save them a
        spot and have a leader ready to introduce them around.
      </p>

      <div className="mt-6 grid gap-5 sm:grid-cols-2">
        <div>
          <FieldLabel>Student&apos;s Name</FieldLabel>
          <TextField
            name="studentName"
            placeholder="Jamie Cruz"
            value={form.studentName}
            onChange={(e) => updateField("studentName", e.target.value)}
            disabled={status === "submitting"}
            required
          />
        </div>
        <div>
          <FieldLabel>Grade</FieldLabel>
          <TextField
            name="grade"
            placeholder="e.g. 9th Grade"
            value={form.grade}
            onChange={(e) => updateField("grade", e.target.value)}
            disabled={status === "submitting"}
            required
          />
        </div>
      </div>

      <div className="mt-5">
        <FieldLabel>Email Address</FieldLabel>
        <TextField
          type="email"
          name="email"
          placeholder="jamie@example.com"
          value={form.email}
          onChange={(e) => updateField("email", e.target.value)}
          disabled={status === "submitting"}
          required
        />
      </div>

      <div className="mt-5">
        <FieldLabel>Expected Visit Date</FieldLabel>
        <TextField
          type="date"
          name="visitDate"
          value={form.visitDate}
          onChange={(e) => updateField("visitDate", e.target.value)}
          disabled={status === "submitting"}
          required
        />
      </div>

      <OptionalContactFields
        socialMedia={form.socialMedia}
        onSocialMediaChange={(value) => updateField("socialMedia", value)}
        additionalContact={form.additionalContact}
        onAdditionalContactChange={(value) => updateField("additionalContact", value)}
        additionalContactPlaceholder="Parent/guardian phone number"
      />

      {status === "success" && (
        <FormStatusBanner status="success" message={messages.youth.success} className="mt-6" />
      )}
      {status === "error" && (
        <FormStatusBanner status="error" message={messages.youth.error} className="mt-6" />
      )}

      <Button
        type="submit"
        fill="brand"
        text="inverse"
        border="brand"
        shadow="grey"
        className="mt-7 w-full"
        disabled={status === "submitting"}
      >
        {status === "submitting" ? "Submitting..." : "Submit Registration"}
      </Button>
    </form>
  );
}