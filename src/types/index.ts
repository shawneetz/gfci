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

// Content-model types (Sermon, Ministry, ChurchEvent, PrayerTeam,
// AnsweredPrayer) used to live here as hand-typed interfaces mirroring
// src/data/*.ts. Now that every page reads from the database, the real
// shape of that data comes straight from Prisma instead, so importing it
// here would just be a second copy that could quietly drift out of sync
// with the schema. Import these from the query layer that already knows
// the true shape:
//
//   Sermon        -> SermonWithSpeaker,  from "@/server/queries/sermons"
//   Ministry       -> MinistryWithLeader, from "@/server/queries/ministries"
//   ChurchEvent    -> ChurchEvent,        from "@/server/queries/events"
//   PrayerTeam     -> PrayerTeam,         from "@/server/queries/prayer-teams"
//   AnsweredPrayer -> AnsweredPrayer,     from "@/server/queries/testimonies"
//
// The last two are re-exports of the generated Prisma types (see those
// files), the first three are Prisma types with a small shape adjustment
// (e.g. a flattened `leader`/`speaker` string, or `date` as a plain
// "YYYY-MM-DD" string instead of a `Date`).

export const EVENT_CATEGORIES = ["Worship", "Youth", "Outreach"] as const;
export type EventCategory = (typeof EVENT_CATEGORIES)[number];

export const PRAYER_CATEGORIES = [
  "Healing",
  "Family",
  "Guidance",
  "Thanksgiving",
  "Other",
] as const;
export type PrayerCategory = (typeof PRAYER_CATEGORIES)[number];

// A submitted prayer request captured by PrayerRequestForm — distinct from
// a PrayerTeam (that's a group to join; this is an individual submission).
// Mirrors the form's fields 1:1 so its state can be typed as one object,
// and gives the submit functions in lib/forms.ts a concrete shape to send.
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