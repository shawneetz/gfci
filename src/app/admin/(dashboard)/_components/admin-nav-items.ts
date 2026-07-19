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
}

export const ADMIN_NAV_ITEMS: AdminNavItem[] = [
  { label: "Overview", href: "/admin", icon: LayoutDashboard },
  { label: "Sermons", href: "/admin/sermons", icon: Mic2 },
  { label: "Events", href: "/admin/events", icon: CalendarDays },
  { label: "Ministries", href: "/admin/ministries", icon: Users },
  { label: "Prayer Teams", href: "/admin/prayer-teams", icon: HeartHandshake },
  { label: "Testimonies", href: "/admin/testimonies", icon: Quote },
  { label: "People", href: "/admin/people", icon: UserRound },
  { label: "Live Stream", href: "/admin/live-stream", icon: Radio },
  { label: "Core Values", href: "/admin/core-values", icon: Heart },
  { label: "What to Expect", href: "/admin/expectation-items", icon: ListChecks },
  { label: "Prayer Submissions", href: "/admin/prayer-submissions", icon: Inbox },
  { label: "Giving Submissions", href: "/admin/giving-submissions", icon: Coins },
  { label: "Connect Submissions", href: "/admin/connect-submissions", icon: ClipboardList },
];