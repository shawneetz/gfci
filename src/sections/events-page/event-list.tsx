"use client";

import { useState } from "react";

import type { ChurchEvent } from "@/server/queries/events";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { MonthNav, type MonthNavProps } from "@/components/ui/month-nav";
import { EventListItem } from "@/sections/events-page/event-list-item";
import { CONTENT_MAX_WIDTH } from "@/lib/layout";
import { list } from "@/content/events";

const PAGE_SIZE = 5;

interface EventListProps {
  events: ChurchEvent[];
  monthLabel: string;
  prevMonthHref?: MonthNavProps["prevHref"];
  nextMonthHref?: MonthNavProps["nextHref"];
}

export function EventList({ events, monthLabel, prevMonthHref, nextMonthHref }: EventListProps) {
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  const visibleEvents = events.slice(0, visibleCount);
  const hasMore = visibleCount < events.length;

  return (
    <section className="section bg-surface">
      <Container className={CONTENT_MAX_WIDTH}>
        <MonthNav label={monthLabel} prevHref={prevMonthHref} nextHref={nextMonthHref} />

        <div className="mt-6">
          {visibleEvents.length > 0 ? (
            visibleEvents.map((event) => <EventListItem key={event.id} event={event} />)
          ) : (
            <p className="py-10 text-center text-body text-ink-muted">{list.emptyState}</p>
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
            {list.loadMoreLabel}
          </Button>
        )}
      </Container>
    </section>
  );
}