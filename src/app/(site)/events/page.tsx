import { EventsHero } from "@/sections/events-page/events-hero";
import { EventList } from "@/sections/events-page/event-list";
import { FeaturedEvent } from "@/sections/events-page/featured-event";
import { Moments } from "@/sections/events-page/moments";
import { events } from "@/data/events";
import { EVENT_CATEGORIES } from "@/types";
import { getMonthKey, formatMonthLabel } from "@/lib/utils";

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

function isValidCategory(
  value: string | undefined
): value is EventsCategoryFilter {
  return CATEGORY_FILTERS.includes(value as EventsCategoryFilter);
}

// Every distinct month present in the event data, oldest first — drives the
// month-nav arrows and the default/fallback month below. Recomputed from
// `events` directly so it can never drift out of sync with the data (this is
// also what replaces the old hardcoded `monthLabel="October 2026"`).
const AVAILABLE_MONTHS = Array.from(
  new Set(events.map((event) => getMonthKey(event.date)))
).sort();

export default async function EventsPage({ searchParams }: EventsPageProps) {
  const params = await searchParams;
  const activeTab: EventsTab = isValidTab(params.tab) ? params.tab : "upcoming";
  const activeCategory = isValidCategory(params.category)
    ? params.category
    : "All";
  const activeMonth =
    params.month && AVAILABLE_MONTHS.includes(params.month)
      ? params.month
      : AVAILABLE_MONTHS[0];

  const monthIndex = AVAILABLE_MONTHS.indexOf(activeMonth);
  const prevMonth = monthIndex > 0 ? AVAILABLE_MONTHS[monthIndex - 1] : undefined;
  const nextMonth =
    monthIndex < AVAILABLE_MONTHS.length - 1
      ? AVAILABLE_MONTHS[monthIndex + 1]
      : undefined;

  function monthHref(month: string) {
    return {
      pathname: "/events",
      query: { tab: activeTab, category: activeCategory, month },
    };
  }

  const featuredEvent = events.find((event) => event.featured);
  const today = new Date();

  const filteredEvents = events.filter((event) => {
    // The featured event gets its own section above, so it's excluded here
    // regardless of tab/category/month — otherwise it shows up twice.
    if (event.featured) return false;

    if (getMonthKey(event.date) !== activeMonth) return false;

    if (activeCategory !== "All" && event.category !== activeCategory) {
      return false;
    }

    const eventDate = new Date(event.date);
    const isToday = eventDate.toDateString() === today.toDateString();
    const isPast = eventDate < today && !isToday;

    if (activeTab === "today") return isToday;
    if (activeTab === "past") return isPast;
    return !isPast; // "upcoming" includes today and future events
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