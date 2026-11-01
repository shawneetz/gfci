"use server";

// Server Actions for the public forms (prayer request, giving, connect).
// Every export here runs only on the server, so client form components can call
// them without pulling the Prisma client into the browser bundle.
import { prisma } from "@/lib/prisma";
import type {
  PrayerRequestSubmission,
  GivingSubmission,
  ConnectRegistration,
} from "@/types";
import {
  ValidationError,
  isValidDate,
  isValidEmail,
  oneOf,
  required,
  validatePrayerCategory,
} from "@/server/validation";

export type SubmitStatus = "idle" | "submitting" | "success" | "error";

export interface SubmitResult {
  success: boolean;
  error?: string;
}

const GENERIC_ERROR = "Something went wrong. Please try again.";
const INVALID_ERROR = "Please check your form entries.";

// Turns a thrown error into a form result: bad input gets a friendly message,
// anything else is logged and shown as a generic error.
function toFormError(error: unknown, actionName: string): SubmitResult {
  if (error instanceof ValidationError) {
    return { success: false, error: INVALID_ERROR };
  }
  console.error(`${actionName} failed:`, error);
  return { success: false, error: GENERIC_ERROR };
}

// ---- Prayer request ----

// Throws ValidationError when any field is not acceptable.
function checkPrayerRequest(payload: PrayerRequestSubmission) {
  required(payload.name, "Name", 100);
  validatePrayerCategory(payload.category);
  if (!isValidEmail(payload.email)) throw new ValidationError("Email is not valid.");
  required(payload.message, "Message", 2000);
  oneOf(payload.visibility, ["private", "public"], "visibility");
}

export async function submitPrayerRequest(
  payload: PrayerRequestSubmission
): Promise<SubmitResult> {
  // Honeypot: real people never fill this hidden field, so pretend success and save nothing.
  if (payload.website) return { success: true };

  try {
    checkPrayerRequest(payload);

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
    return toFormError(error, "submitPrayerRequest");
  }
}

// ---- Giving intent (records intent only, no payment) ----

// Throws ValidationError when any field is not acceptable.
function checkGivingIntent(payload: GivingSubmission) {
  const amountIsValid =
    Number.isInteger(payload.amount) && payload.amount >= 1 && payload.amount <= 1_000_000;
  if (!amountIsValid) throw new ValidationError("Amount is not valid.");

  required(payload.fund, "Fund", 100);
  oneOf(payload.frequency, ["one-time", "monthly"], "frequency");
}

export async function submitGivingIntent(payload: GivingSubmission): Promise<SubmitResult> {
  if (payload.website) return { success: true };

  try {
    checkGivingIntent(payload);

    await prisma.givingIntent.create({
      data: {
        amount: payload.amount,
        fund: payload.fund,
        // The database enum can't contain a hyphen, so "one-time" becomes "one_time" here.
        frequency: payload.frequency === "one-time" ? "one_time" : "monthly",
      },
    });
    return { success: true };
  } catch (error) {
    return toFormError(error, "submitGivingIntent");
  }
}

// ---- Connect registration (kids / youth / adults) ----

// Throws ValidationError when the shared fields are not acceptable.
function checkConnectRegistration(payload: ConnectRegistration) {
  if (!isValidEmail(payload.email)) throw new ValidationError("Email is not valid.");
  if (!isValidDate(payload.visitDate)) throw new ValidationError("Visit date is not valid.");
}

export async function submitConnectRegistration(
  payload: ConnectRegistration
): Promise<SubmitResult> {
  if (payload.website) return { success: true };

  try {
    checkConnectRegistration(payload);

    const { audience, email } = payload;
    const visitDate = new Date(payload.visitDate);

    // Switch on payload.audience (not the destructured copy) so TypeScript
    // knows which audience-specific fields exist in each branch.
    switch (payload.audience) {
      case "kids":
        await prisma.connectRegistration.create({
          data: {
            audience,
            email,
            visitDate,
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
            visitDate,
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
            visitDate,
            fullName: payload.fullName,
            socialMedia: payload.socialMedia,
            additionalContact: payload.additionalContact,
          },
        });
        break;
    }

    return { success: true };
  } catch (error) {
    return toFormError(error, "submitConnectRegistration");
  }
}
