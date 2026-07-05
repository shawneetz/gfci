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

export interface PrayerRequest {
  slug: string;
  name: string;
  details: string;
  image: string;
  schedule: string;
}

export interface ChurchEvent {
  id: string;
  title: string;
  date: string;
  time: string;
  month: string;
  day: string;
  location: string;
  image: string;
  description: string;
  featured?: boolean;
}
