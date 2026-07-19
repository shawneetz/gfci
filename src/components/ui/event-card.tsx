import { TiltCard } from "@/components/ui/tilt-card";

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
    <TiltCard href={`/events#${id}`} className="block bg-surface p-6">
      <div className="flex items-center gap-6">
        <div className="flex w-20 shrink-0 flex-col items-center">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-ink-muted">
            {month}
          </span>
          <span className="font-headline text-5xl font-extrabold leading-none text-ink">
            {day}
          </span>
        </div>

        <div className="h-20 w-px bg-border" />

        <div className="flex-1">
          <h3 className="text-xl font-bold text-ink">{title}</h3>
          <p className="mt-2 text-base text-ink-secondary">
            {time} &bull; {location}
          </p>
        </div>
      </div>
    </TiltCard>
  );
}