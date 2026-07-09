// Top-level nav entries can be a direct link or a labeled group that expands
// into a dropdown (desktop) / accordion (mobile) of sub-links — lets related
// pages (e.g. Sermons + Watch Live) share one label instead of crowding the
// header with a flat list of every page.
export interface NavLink {
  label: string;
  href: string;
}

export interface NavGroup {
  label: string;
  items: NavLink[];
}

export type NavItem = NavLink | NavGroup;

export function isNavGroup(item: NavItem): item is NavGroup {
  return "items" in item;
}

export interface Sermon {
  slug: string;
  title: string;
  series: string;
  speaker: string;
  date: string;
  thumbnail: string;
  videoUrl?: string;
  summary?: string;
}

// A prayer TEAM someone can join (Kids/Youth/Adults prayer groups) — distinct
// from a prayer request an individual submits via PrayerRequestForm. These
// two concepts used to share the "PrayerRequest" name, which was confusing
// since they're unrelated.
export interface PrayerTeam {
  slug: string;
  name: string;
  details: string;
  image: string;
  schedule: string;
}

export const EVENT_CATEGORIES = ["Worship", "Youth", "Outreach"] as const;
export type EventCategory = (typeof EVENT_CATEGORIES)[number];

export interface ChurchEvent {
  id: string;
  title: string;
  // ISO date (e.g. "2026-10-15") — the single source of truth for this
  // event's date. Derive display formats (month, day, weekday) via the
  // formatters in lib/utils.ts rather than storing them separately, so a
  // date can never be updated in one place and left stale in another.
  date: string;
  time: string;
  category: EventCategory;
  location: string;
  image: string;
  description: string;
  featured?: boolean;
}

export interface Ministry {
  slug: string;
  title: string;
  tagline: string; // short description shown on the card
  overview: string; // longer description shown in the modal
  image: string;
  imageAlt: string;
  audience: string; // who it's for
  schedule: string; // when it meets
  location: string; // where it meets
  leader: string; // point person
  contactEmail: string;
}

export const PRAYER_CATEGORIES = [
  "Healing",
  "Family",
  "Guidance",
  "Thanksgiving",
  "Other",
] as const;
export type PrayerCategory = (typeof PRAYER_CATEGORIES)[number];

export interface AnsweredPrayer {
  id: string;
  quote: string;
  name: string;
  category: PrayerCategory;
}

// A submitted prayer request captured by PrayerRequestForm — distinct from
// PrayerTeam above (that's a group to join; this is an individual
// submission). Mirrors the form's fields 1:1 so its state can be typed as
// one object, and gives the submit functions in lib/forms.ts a concrete
// shape to send.
export interface PrayerRequestSubmission {
  name: string;
  email: string;
  category: PrayerCategory;
  message: string;
  visibility: "private" | "public";
}

// Payload for the Giving form. This only records giving *intent* — no
// payment is actually processed until a real payment provider is wired up.
export interface GivingSubmission {
  amount: number;
  fund: string;
  frequency: "one-time" | "monthly";
}

// The three Connect page registration forms (Kids/Youth/Adults) each mirror
// their form's fields 1:1. Kept as separate interfaces rather than one
// generic shape since each audience genuinely asks for different fields.
export interface KidsConnectRegistration {
  audience: "kids";
  parentName: string;
  email: string;
  children: string;
  visitDate: string;
}

export interface YouthConnectRegistration {
  audience: "youth";
  studentName: string;
  grade: string;
  email: string;
  visitDate: string;
  socialMedia: string;
  additionalContact: string;
}

export interface AdultsConnectRegistration {
  audience: "adults";
  fullName: string;
  email: string;
  visitDate: string;
  socialMedia: string;
  additionalContact: string;
}

export type ConnectRegistration =
  | KidsConnectRegistration
  | YouthConnectRegistration
  | AdultsConnectRegistration;