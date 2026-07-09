"use client";

import { useState } from "react";

import { ChurchEvent } from "@/types";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { MonthNav, type MonthNavProps } from "@/components/ui/month-nav";
import { EventListItem } from "@/sections/events-page/event-list-item";

const PAGE_SIZE = 5;

interface EventListProps {
  events: ChurchEvent[];
  monthLabel: string;
  prevMonthHref?: MonthNavProps["prevHref"];
  nextMonthHref?: MonthNavProps["nextHref"];
}

// Client component so "Load More" can incrementally reveal events without a
// full page reload. The parent page passes a `key` that changes whenever the
// active tab/category/month changes, so this remounts (and its pagination
// resets) whenever the filtered event set changes — see events/page.tsx.
export function EventList({
  events,
  monthLabel,
  prevMonthHref,
  nextMonthHref,
}: EventListProps) {
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  const visibleEvents = events.slice(0, visibleCount);
  const hasMore = visibleCount < events.length;

  return (
    <section className="section bg-surface">
      <Container className="max-w-2xl">
        <MonthNav label={monthLabel} prevHref={prevMonthHref} nextHref={nextMonthHref} />

        <div className="mt-6">
          {visibleEvents.length > 0 ? (
            visibleEvents.map((event) => (
              <EventListItem key={event.id} event={event} />
            ))
          ) : (
            <p className="py-10 text-center text-body text-ink-muted">
              No events match these filters right now.
            </p>
          )}
        </div>

        {hasMore && (
          <Button
            type="button"
            onClick={() => setVisibleCount((count) => count + PAGE_SIZE)}
            fill="transparent"
            text="ink"
            border="ink"
            shadow="grey"
            className="mt-8 w-full"
          >
            Load More Events
          </Button>
        )}
      </Container>
    </section>
  );
}