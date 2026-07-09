// Central place the site's forms call to "submit". Every function here is
// currently a mock — it logs what would be sent and resolves after a short
// delay instead of hitting a real endpoint. Once a database/API exists,
// replace the body of each function with a real `fetch(...)` call; no form
// component needs to change.

import type {
  PrayerRequestSubmission,
  GivingSubmission,
  ConnectRegistration,
} from "@/types";

export type SubmitStatus = "idle" | "submitting" | "success" | "error";

export interface SubmitResult {
  success: boolean;
  error?: string;
}

async function mockSubmit(): Promise<SubmitResult> {
  await new Promise((resolve) => setTimeout(resolve, 700));
  return { success: true };
}

export async function submitPrayerRequest(
  payload: PrayerRequestSubmission
): Promise<SubmitResult> {
  console.log("submitPrayerRequest (mock):", payload);
  return mockSubmit();
}

export async function submitGivingIntent(
  payload: GivingSubmission
): Promise<SubmitResult> {
  console.log("submitGivingIntent (mock):", payload);
  return mockSubmit();
}

export async function submitConnectRegistration(
  payload: ConnectRegistration
): Promise<SubmitResult> {
  console.log("submitConnectRegistration (mock):", payload);
  return mockSubmit();
}