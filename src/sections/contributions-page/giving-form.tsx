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
import { ministries } from "@/data/ministries";
import { submitGivingIntent, type SubmitStatus } from "@/lib/forms";
import { FORM_PAGE_MAX_WIDTH } from "@/lib/layout";

const PRESET_AMOUNTS = [50, 100, 250];

// General funds aren't tied to a specific ministry, so they stay hand-typed.
const GENERAL_FUND_OPTIONS = [
  "General Tithes & Offerings",
  "Building Fund",
  "Missions & Outreach",
];

// Per-ministry funds are derived from the ministries data instead of
// hand-typed here.
const FUND_OPTIONS = [
  ...GENERAL_FUND_OPTIONS,
  ...ministries.map((ministry) => ministry.title),
];

export function GivingForm() {
  const [amount, setAmount] = useState(100);
  const [customAmount, setCustomAmount] = useState("");
  const [fund, setFund] = useState(FUND_OPTIONS[0]);
  const [frequency, setFrequency] = useState<"one-time" | "monthly">("one-time");
  const [status, setStatus] = useState<SubmitStatus>("idle");

  function selectPreset(value: number) {
    setAmount(value);
    setCustomAmount("");
  }

  function typeCustomAmount(value: string) {
    setCustomAmount(value);
    if (value) setAmount(0); // clears preset selection once a custom value is typed
  }

  const resolvedAmount = customAmount ? Number(customAmount) : amount;

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!resolvedAmount || resolvedAmount <= 0) {
      setStatus("error");
      return;
    }

    setStatus("submitting");

    // NOTE: this only records giving *intent* — no payment is actually
    // processed yet. Swap in a real payment provider redirect/checkout once
    // one is integrated; submitGivingIntent is the seam to do that from.
    const result = await submitGivingIntent({
      amount: resolvedAmount,
      fund,
      frequency,
    });

    setStatus(result.success ? "success" : "error");
  }

  return (
    <section className="section bg-surface">
      <Container className={FORM_PAGE_MAX_WIDTH}>
        <form onSubmit={handleSubmit}>
          <Panel className="space-y-8">
            {/* Amount */}
            <div>
              <FieldLabel>Select Amount</FieldLabel>
              <div className="flex gap-3">
                {PRESET_AMOUNTS.map((value) => (
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

            {/* Fund Designation */}
            <div>
              <FieldLabel>Fund Designation</FieldLabel>
              <SelectField
                value={fund}
                onChange={(e) => setFund(e.target.value)}
                disabled={status === "submitting"}
              >
                {FUND_OPTIONS.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </SelectField>
            </div>

            {/* Frequency */}
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
              <FormStatusBanner
                status="success"
                message="Thank you! Real payment processing isn't wired up yet, but your giving intent was recorded."
              />
            )}
            {status === "error" && (
              <FormStatusBanner
                status="error"
                message="Please select or enter an amount before continuing."
              />
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
              {status === "submitting" ? "Processing..." : "Continue to Secure Payment"}
            </Button>
          </Panel>
        </form>
      </Container>
    </section>
  );
}