"use client";

import { useState, FormEvent } from "react";

import { FieldLabel } from "@/components/ui/field-label";
import { TextField } from "@/components/ui/text-field";
import { Button } from "@/components/ui/button";
import { FormStatusBanner } from "@/components/ui/form-status-banner";
import { OptionalContactFields } from "@/sections/connect-page/optional-contact-fields";
import { ministries } from "@/data/ministries";
import { submitConnectRegistration, type SubmitStatus } from "@/lib/forms";
import type { AdultsConnectRegistration } from "@/types";

const connectGroupsMinistry = ministries.find((m) => m.slug === "connect-groups");

type AdultsFormFields = Omit<AdultsConnectRegistration, "audience">;

const initialForm: AdultsFormFields = {
  fullName: "",
  email: "",
  visitDate: "",
  socialMedia: "",
  additionalContact: "",
};

export function AdultsForm() {
  const [form, setForm] = useState<AdultsFormFields>(initialForm);
  const [status, setStatus] = useState<SubmitStatus>("idle");

  function updateField<K extends keyof AdultsFormFields>(
    field: K,
    value: AdultsFormFields[K]
  ) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");

    const result = await submitConnectRegistration({ audience: "adults", ...form });

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
        Let us know you&apos;re coming so we can save you a seat, have
        someone ready to say hello, and help you find a{" "}
        {connectGroupsMinistry?.title ?? "Connect Group"} if you&apos;re
        looking for one.
      </p>

      <div className="mt-6 grid gap-5 sm:grid-cols-2">
        <div>
          <FieldLabel>Full Name</FieldLabel>
          <TextField
            name="fullName"
            placeholder="Jane Doe"
            value={form.fullName}
            onChange={(e) => updateField("fullName", e.target.value)}
            disabled={status === "submitting"}
            required
          />
        </div>
        <div>
          <FieldLabel>Email Address</FieldLabel>
          <TextField
            type="email"
            name="email"
            placeholder="jane@example.com"
            value={form.email}
            onChange={(e) => updateField("email", e.target.value)}
            disabled={status === "submitting"}
            required
          />
        </div>
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
      />

      {status === "success" && (
        <FormStatusBanner
          status="success"
          message="You're on the list! We can't wait to meet you this week."
          className="mt-6"
        />
      )}
      {status === "error" && (
        <FormStatusBanner
          status="error"
          message="Something went wrong submitting your registration. Please try again."
          className="mt-6"
        />
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