import {
  LayoutDashboard,
  Mic2,
  CalendarDays,
  Users,
  HeartHandshake,
  Quote,
  UserRound,
  Radio,
  Heart,
  ListChecks,
  Inbox,
  Coins,
  ClipboardList,
  type LucideIcon,
} from "lucide-react";

export interface AdminNavItem {
  label: string;
  href: string;
  icon: LucideIcon;
  group?: "Content" | "Site" | "Inbox";
}

export const ADMIN_NAV_ITEMS: AdminNavItem[] = [
  { label: "Overview", href: "/admin", icon: LayoutDashboard },
  { label: "Sermons", href: "/admin/sermons", icon: Mic2, group: "Content" },
  { label: "Events", href: "/admin/events", icon: CalendarDays, group: "Content" },
  { label: "Ministries", href: "/admin/ministries", icon: Users, group: "Content" },
  { label: "Prayer Teams", href: "/admin/prayer-teams", icon: HeartHandshake, group: "Content" },
  { label: "Testimonies", href: "/admin/testimonies", icon: Quote, group: "Content" },
  { label: "People", href: "/admin/people", icon: UserRound, group: "Content" },
  { label: "Core Values", href: "/admin/core-values", icon: Heart, group: "Content" },
  { label: "What to Expect", href: "/admin/expectation-items", icon: ListChecks, group: "Content" },
  { label: "Live Stream", href: "/admin/live-stream", icon: Radio, group: "Site" },
  { label: "Service Times", href: "/admin/service-times", icon: CalendarDays, group: "Site" },
  { label: "Site Settings", href: "/admin/site-settings", icon: ClipboardList, group: "Site" },
  { label: "Prayer Submissions", href: "/admin/prayer-submissions", icon: Inbox, group: "Inbox" },
  { label: "Giving Submissions", href: "/admin/giving-submissions", icon: Coins, group: "Inbox" },
  { label: "Connect Submissions", href: "/admin/connect-submissions", icon: ClipboardList, group: "Inbox" },
];