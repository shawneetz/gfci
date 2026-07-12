"use server";

// Every export below is a Server Action — it runs only on the server, and
// the client components that call it (GivingForm, PrayerRequestForm,
// KidsForm/YouthForm/AdultsForm) only ever receive a callable reference,
// never the Prisma client itself. This is why those "use client" files can
// safely `import { submitX } from "@/lib/forms"` without pulling
// @prisma/client into the browser bundle.

import { prisma } from "@/lib/prisma";
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

const GENERIC_ERROR = "Something went wrong. Please try again.";

export async function submitPrayerRequest(
  payload: PrayerRequestSubmission
): Promise<SubmitResult> {
  try {
    await prisma.prayerRequestSubmission.create({
      data: {
        name: payload.name,
        email: payload.email,
        category: payload.category,
        message: payload.message,
        visibility: payload.visibility,
      },
    });
    return { success: true };
  } catch (error) {
    console.error("submitPrayerRequest failed:", error);
    return { success: false, error: GENERIC_ERROR };
  }
}

export async function submitGivingIntent(
  payload: GivingSubmission
): Promise<SubmitResult> {
  try {
    await prisma.givingIntent.create({
      data: {
        amount: payload.amount,
        fund: payload.fund,
        // The Prisma enum can't contain a hyphen, so the form's
        // "one-time" is mapped to "one_time" here at the Server Action
        // boundary — this is the only place that mapping needs to exist.
        frequency: payload.frequency === "one-time" ? "one_time" : "monthly",
      },
    });
    return { success: true };
  } catch (error) {
    console.error("submitGivingIntent failed:", error);
    return { success: false, error: GENERIC_ERROR };
  }
}

export async function submitConnectRegistration(
  payload: ConnectRegistration
): Promise<SubmitResult> {
  try {
    const { audience, email, visitDate } = payload;
    const visitDateValue = new Date(visitDate);

    // Switching on payload.audience (not the destructured `audience`)
    // is what lets TypeScript narrow `payload` to the right variant in
    // each branch, so the audience-specific fields below are type-safe.
    switch (payload.audience) {
      case "kids":
        await prisma.connectRegistration.create({
          data: {
            audience,
            email,
            visitDate: visitDateValue,
            parentName: payload.parentName,
            children: payload.children,
          },
        });
        break;

      case "youth":
        await prisma.connectRegistration.create({
          data: {
            audience,
            email,
            visitDate: visitDateValue,
            studentName: payload.studentName,
            grade: payload.grade,
            socialMedia: payload.socialMedia,
            additionalContact: payload.additionalContact,
          },
        });
        break;

      case "adults":
        await prisma.connectRegistration.create({
          data: {
            audience,
            email,
            visitDate: visitDateValue,
            fullName: payload.fullName,
            socialMedia: payload.socialMedia,
            additionalContact: payload.additionalContact,
          },
        });
        break;
    }

    return { success: true };
  } catch (error) {
    console.error("submitConnectRegistration failed:", error);
    return { success: false, error: GENERIC_ERROR };
  }
}
