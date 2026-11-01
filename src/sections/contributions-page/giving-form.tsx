"use client";

import { useState, FormEvent } from "react";
import { Lock } from "lucide-react";

import { Container } from "@/components/ui/container";
import { Panel } from "@/components/ui/panel";
import { FieldLabel } from "@/components/ui/field-label";
import { AmountOption } from "@/components/ui/amount-option";
import { TextField } from "@/components/ui/text-field";
import { SelectField } from "@/components/ui/select-field";
import { RadioOption } from "@/components/ui/radio-option";
import { Button } from "@/components/ui/button";
import { FormStatusBanner } from "@/components/ui/form-status-banner";
import type { MinistryWithLeader } from "@/server/queries/ministries";
import { submitGivingIntent, type SubmitStatus } from "@/lib/forms";
import { FORM_PAGE_MAX_WIDTH } from "@/lib/layout";
import { form as givingForm } from "@/content/giving";
import { HoneypotField } from "@/components/ui/honeypot-field";

interface GivingFormProps {
  ministries: MinistryWithLeader[];
}

export function GivingForm({ ministries }: GivingFormProps) {
  const fundOptions = [...givingForm.generalFundOptions, ...ministries.map((m) => m.title)];

  const [amount, setAmount] = useState(100);
  const [customAmount, setCustomAmount] = useState("");
  const [fund, setFund] = useState(fundOptions[0]);
  const [frequency, setFrequency] = useState<"one-time" | "monthly">("one-time");
  const [status, setStatus] = useState<SubmitStatus>("idle");
  const [website, setWebsite] = useState("");

  function selectPreset(value: number) {
    setAmount(value);
    setCustomAmount("");
  }

  function typeCustomAmount(value: string) {
    setCustomAmount(value);
    if (value) setAmount(0);
  }

  const resolvedAmount = customAmount ? Number(customAmount) : amount;

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!resolvedAmount || resolvedAmount <= 0) {
      setStatus("error");
      return;
    }

    setStatus("submitting");
    const result = await submitGivingIntent({ amount: resolvedAmount, fund, frequency, website });
    setStatus(result.success ? "success" : "error");
  }

  return (
    <section className="section bg-surface">
      <Container className={FORM_PAGE_MAX_WIDTH}>
        <form onSubmit={handleSubmit}>
          <Panel className="space-y-8">
            <HoneypotField value={website} onChange={setWebsite} />
            <div>
              <FieldLabel>Select Amount</FieldLabel>
              <div className="flex gap-3">
                {givingForm.presetAmounts.map((value) => (
                  <AmountOption
                    key={value}
                    amount={value}
                    selected={amount === value && !customAmount}
                    onClick={() => selectPreset(value)}
                  />
                ))}
              </div>

              <TextField
                icon="₱"
                placeholder="Custom Amount"
                inputMode="numeric"
                value={customAmount}
                onChange={(e) => typeCustomAmount(e.target.value)}
                disabled={status === "submitting"}
                className="mt-3"
              />
            </div>

            <div>
              <FieldLabel>Fund Designation</FieldLabel>
              <SelectField value={fund} onChange={(e) => setFund(e.target.value)} disabled={status === "submitting"}>
                {fundOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </SelectField>
            </div>

            <div>
              <FieldLabel>Frequency</FieldLabel>
              <div className="flex gap-8">
                <RadioOption
                  name="frequency"
                  value="one-time"
                  label="One-time"
                  checked={frequency === "one-time"}
                  onChange={() => setFrequency("one-time")}
                />
                <RadioOption
                  name="frequency"
                  value="monthly"
                  label="Monthly"
                  checked={frequency === "monthly"}
                  onChange={() => setFrequency("monthly")}
                />
              </div>
            </div>

            {status === "success" && (
              <FormStatusBanner status="success" message={givingForm.messages.success} />
            )}
            {status === "error" && (
              <FormStatusBanner status="error" message={givingForm.messages.error} />
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
              <Lock size={16} />
              {status === "submitting" ? "Processing..." : givingForm.submitLabel}
            </Button>
          </Panel>
        </form>
      </Container>
    </section>
  );
}