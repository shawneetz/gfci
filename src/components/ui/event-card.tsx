import Link from "next/link";

type EventCardProps = {
  id: string;
  month: string;
  day: string;
  title: string;
  time: string;
  location: string;
};

export function EventCard({
  id,
  month,
  day,
  title,
  time,
  location,
}: EventCardProps) {
  return (
    <Link
      href={`/events#${id}`}
      className="block rounded-none border-2 border-ink bg-surface p-6 transition-all duration-150 hover:-translate-y-1 hover:shadow-[6px_6px_0_0_var(--color-ink)]"
    >
      <div className="flex items-center gap-6">
        {/* Date */}
        <div className="flex w-20 shrink-0 flex-col items-center">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-ink-muted">
            {month}
          </span>

          <span className="font-headline text-5xl font-extrabold leading-none text-ink">
            {day}
          </span>
        </div>

        {/* Divider */}
        <div className="h-20 w-1 bg-ink" />

        {/* Content */}
        <div className="flex-1">
          <h3 className="text-xl font-bold text-ink">
            {title}
          </h3>

          <p className="mt-2 text-base text-ink-secondary">
            {time} &bull; {location}
          </p>
        </div>
      </div>
    </Link>
  );
}