import type { ChurchEvent } from "@/server/queries/events";
import { Badge } from "@/components/ui/badge";
import { formatWeekday, formatDay } from "@/lib/utils";

interface EventListItemProps {
  event: ChurchEvent;
}

export function EventListItem({ event }: EventListItemProps) {
  return (
    <div
      id={event.id}
      className="flex scroll-mt-[calc(var(--header-height)+16px)] gap-4 border-b border-border py-6 first:pt-0 last:border-b-0 last:pb-0"
    >
      <div className="w-14 shrink-0 text-center">
        <p className="text-xs font-bold uppercase tracking-wide text-ink-muted">
          {formatWeekday(event.date)}
        </p>
        <p className="font-headline text-3xl font-extrabold leading-none text-ink">
          {formatDay(event.date)}
        </p>
      </div>

      <div>
        <div className="flex flex-wrap items-center gap-2">
          <Badge>{event.category}</Badge>
          <span className="text-body-sm text-ink-muted">{event.time}</span>
        </div>
        <h3 className="mt-2 text-lg font-bold text-ink">{event.title}</h3>
        <p className="mt-1 line-clamp-2 text-body-sm text-ink-secondary">
          {event.description}
        </p>
      </div>
    </div>
  );
}