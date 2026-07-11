import { LucideIcon } from "lucide-react";

// Matches the props PageHero accepts — reused by every interior page's hero.
export interface PageHeroCopy {
  eyebrow?: string;
  title: string;
  description?: string;
}

// Shape shared by "here are a few things" lists — CoreValues, WhatToExpect,
// and anywhere else that pairs an icon with a title and a short description.
export interface FeatureCopy {
  icon: LucideIcon;
  title: string;
  description: string;
}

// Success/error copy for a form that renders <FormStatusBanner>.
export interface FormMessages {
  success: string;
  error: string;
}