import type { PageHeroCopy } from "@/content/types";

export const hero: PageHeroCopy = {
  eyebrow: "Give",
  title: "Contributions",
  description: "Your generosity fuels our mission to bring light and hope to the community.",
};

export const whyWeGive = {
  title: "Why We Give",
  body: "Giving is an act of worship. It's how we partner together to impact our city and world.",
};

export const form = {
  presetAmounts: [50, 100, 250],
  generalFundOptions: [
    "General Tithes & Offerings",
    "Building Fund",
    "Missions & Outreach",
  ],
  messages: {
    success:
      "Thank you! Real payment processing isn't wired up yet, but your giving intent was recorded.",
    error: "Please select or enter an amount before continuing.",
  },
  submitLabel: "Continue to Secure Payment",
};

export const security = {
  title: "Secure & Transparent",
  body: "Your financial information is encrypted and securely processed. We maintain strict financial accountability.",
};