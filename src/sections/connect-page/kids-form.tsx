"use client";

import { useState, FormEvent } from "react";

import { FieldLabel } from "@/components/ui/field-label";
import { TextField } from "@/components/ui/text-field";
import { Button } from "@/components/ui/button";
import { FormStatusBanner } from "@/components/ui/form-status-banner";
import type { MinistryWithLeader } from "@/server/queries/ministries";
import { submitConnectRegistration, type SubmitStatus } from "@/lib/forms";
import type { KidsConnectRegistration } from "@/types";
import { messages } from "@/content/connect";

type KidsFormFields = Omit<KidsConnectRegistration, "audience">;

const initialForm: KidsFormFields = {
  parentName: "",
  email: "",
  children: "",
  visitDate: "",
};

interface KidsFormProps {
  ministries: MinistryWithLeader[];
}

export function KidsForm({ ministries }: KidsFormProps) {
  const kidsMinistry = ministries.find((m) => m.slug === "golden-kids");

  const [form, setForm] = useState<KidsFormFields>(initialForm);
  const [status, setStatus] = useState<SubmitStatus>("idle");

  function updateField<K extends keyof KidsFormFields>(field: K, value: KidsFormFields[K]) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");

    const result = await submitConnectRegistration({ audience: "kids", ...form });

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
        Save time on Sunday morning by pre-registering your children for our
        secure, fun-filled kids ministry (
        {kidsMinistry?.audience ?? "Birth – 5th Grade"}). When you arrive,
        just head to the VIP Kids Check-in desk.
      </p>

      <div className="mt-6 grid gap-5 sm:grid-cols-2">
        <div>
          <FieldLabel>Parent&apos;s Name</FieldLabel>
          <TextField
            name="parentName"
            placeholder="Jane Doe"
            value={form.parentName}
            onChange={(e) => updateField("parentName", e.target.value)}
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
        <FieldLabel>Children&apos;s Names &amp; Ages</FieldLabel>
        <TextField
          name="children"
          placeholder="e.g. Leo (4), Mia (8)"
          value={form.children}
          onChange={(e) => updateField("children", e.target.value)}
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

      {status === "success" && (
        <FormStatusBanner status="success" message={messages.kids.success} className="mt-6" />
      )}
      {status === "error" && (
        <FormStatusBanner status="error" message={messages.kids.error} className="mt-6" />
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