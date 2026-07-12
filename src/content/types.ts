// Matches the props PageHero accepts — reused by every interior page's hero.
export interface PageHeroCopy {
  eyebrow?: string;
  title: string;
  description?: string;
}

// Success/error copy for a form that renders <FormStatusBanner>.
export interface FormMessages {
  success: string;
  error: string;
}