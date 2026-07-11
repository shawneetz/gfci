import { Users, Shirt, Music } from "lucide-react";
import type { FeatureCopy, FormMessages, PageHeroCopy } from "@/content/types";

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

export const whatToExpect: { title: string; description: string; items: FeatureCopy[] } = {
  title: "What to Expect",
  description:
    "We want you to feel comfortable and at home from the moment you pull into the parking lot.",
  items: [
    {
      icon: Users,
      title: "Warm Community",
      description:
        "From the moment you walk in, our greeters and hosts are there to welcome you, answer questions, and help you feel right at home.",
    },
    {
      icon: Shirt,
      title: "Come As You Are",
      description:
        "You'll find everything from jeans and t-shirts to suits and ties. Wear whatever makes you comfortable — you belong here.",
    },
    {
      icon: Music,
      title: "Engaging Service",
      description:
        "Expect a 75-minute service with high-energy worship music and a practical, inspiring message based on the Bible.",
    },
  ],
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