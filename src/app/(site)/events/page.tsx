import { EventsHero } from "@/sections/events-page/events-hero";
import { EventList } from "@/sections/events-page/event-list";
import { FeaturedEvent } from "@/sections/events-page/featured-event";
import { Moments } from "@/sections/events-page/moments";
import { getAllEvents } from "@/server/queries/events";
import { EVENT_CATEGORIES } from "@/types";
import { getMonthKey, formatMonthLabel, todayKey } from "@/lib/utils";

export const revalidate = 300;

const TABS = ["upcoming", "today", "past"] as const;
type EventsTab = (typeof TABS)[number];

const CATEGORY_FILTERS = ["All", ...EVENT_CATEGORIES] as const;
type EventsCategoryFilter = (typeof CATEGORY_FILTERS)[number];

interface EventsPageProps {
  searchParams: Promise<{ tab?: string; category?: string; month?: string }>;
}

function isValidTab(value: string | undefined): value is EventsTab {
  return TABS.includes(value as EventsTab);
}

function isValidCategory(value: string | undefined): value is EventsCategoryFilter {
  return CATEGORY_FILTERS.includes(value as EventsCategoryFilter);
}

export default async function EventsPage({ searchParams }: EventsPageProps) {
  const params = await searchParams;
  const events = await getAllEvents();

  // Every distinct month present in the event data, oldest first — drives
  // the month-nav arrows and the default/fallback month below. Recomputed
  // per-request from the DB rather than a hardcoded constant, so it can
  // never drift out of sync with what's actually in the database.
  const AVAILABLE_MONTHS = Array.from(
    new Set(events.map((event) => getMonthKey(event.date)))
  ).sort();

  const activeTab: EventsTab = isValidTab(params.tab) ? params.tab : "upcoming";
  const activeCategory = isValidCategory(params.category) ? params.category : "All";
  const currentMonth = getMonthKey(todayKey());
  const activeMonth =
    params.month && AVAILABLE_MONTHS.includes(params.month)
      ? params.month
      : AVAILABLE_MONTHS.includes(currentMonth) ? currentMonth : AVAILABLE_MONTHS[0];

  const monthIndex = AVAILABLE_MONTHS.indexOf(activeMonth);
  const prevMonth = monthIndex > 0 ? AVAILABLE_MONTHS[monthIndex - 1] : undefined;
  const nextMonth =
    monthIndex < AVAILABLE_MONTHS.length - 1 ? AVAILABLE_MONTHS[monthIndex + 1] : undefined;

  function monthHref(month: string) {
    return {
      pathname: "/events",
      query: { tab: activeTab, category: activeCategory, month },
    };
  }

  const featuredEvent = events.find((event) => event.featured);
  const today = todayKey();

  const filteredEvents = events.filter((event) => {
    if (event.featured) return false;
    if (getMonthKey(event.date) !== activeMonth) return false;
    if (activeCategory !== "All" && event.category !== activeCategory) return false;

    const eventDate = new Date(event.date);
    const eventDay = eventDate.toISOString().slice(0, 10);
    const isToday = eventDay === today;
    const isPast = eventDay < today && !isToday;

    if (activeTab === "today") return isToday;
    if (activeTab === "past") return isPast;
    return !isPast;
  });

  return (
    <>
      <EventsHero activeTab={activeTab} activeCategory={activeCategory} />
      {featuredEvent && <FeaturedEvent event={featuredEvent} />}
      <EventList
        key={`${activeTab}-${activeCategory}-${activeMonth}`}
        events={filteredEvents}
        monthLabel={formatMonthLabel(activeMonth)}
        prevMonthHref={prevMonth ? monthHref(prevMonth) : undefined}
        nextMonthHref={nextMonth ? monthHref(nextMonth) : undefined}
      />
      <Moments />
    </>
  );
}