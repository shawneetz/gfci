import type { FormMessages, PageHeroCopy } from "@/content/types";

export const hero: PageHeroCopy & { connectLabel: string; expectLabel: string } = {
  eyebrow: "Plan a Visit",
  title: "Welcome Home.",
  description:
    "We can't wait to host you this weekend. Let us know you're coming so we can roll out the red carpet.",
  connectLabel: "Get Connected",
  expectLabel: "What to Expect",
};

export const visitInfo = {
  title: "Service Times",
  note: "Services typically last 75 minutes. Arrive 15 minutes early to grab coffee and find a seat.",
  campusLabel: "Main Campus",
  directionsLabel: "Get Directions →",
};

// The row data (icon/title/description per item) now lives in the
// ExpectationItem table — see src/server/queries/expectation-items.ts —
// per the Phase 11 content-governance audit. Only the fixed section
// heading and intro copy stay here.
export const whatToExpectSection = {
  title: "What to Expect",
  description:
    "We want you to feel comfortable and at home from the moment you pull into the parking lot.",
};

export const form = {
  eyebrow: "Get Connected",
  title: "Tell Us You're Coming",
  description:
    "Choose who's visiting so we can prepare the right welcome — from kids check-in to a seat saved just for you.",
  host: {
    label: "First Time?",
    title: "Meet a Host",
    description:
      "Don't want to navigate your first visit alone? Request a host to meet you at the door, show you around, and sit with you during service.",
    buttonText: "Request a Host",
    subject: "Request a Host for My Visit",
  },
};

export const messages: Record<"kids" | "youth" | "adults", FormMessages> = {
  kids: {
    success:
      "You're all set! We'll see your family this Sunday — look for the VIP Kids Check-in desk.",
    error: "Something went wrong submitting your registration. Please try again.",
  },
  youth: {
    success: "Registration received! A leader will look out for your student this week.",
    error: "Something went wrong submitting your registration. Please try again.",
  },
  adults: {
    success: "You're on the list! We can't wait to meet you this week.",
    error: "Something went wrong submitting your registration. Please try again.",
  },
};