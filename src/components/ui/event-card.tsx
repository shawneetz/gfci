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
      className="block rounded-xl border border-neutral-200 bg-white p-6 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-md"
    >
      <div className="flex items-center gap-6">
        {/* Date */}
        <div className="flex w-20 shrink-0 flex-col items-center">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-red-600">
            {month}
          </span>

          <span className="text-5xl font-extrabold leading-none text-primary">
            {day}
          </span>
        </div>

        {/* Divider */}
        <div className="h-20 w-px bg-neutral-300" />

        {/* Content */}
        <div className="flex-1">
          <h3 className="text-xl font-bold text-neutral-900">
            {title}
          </h3>

          <p className="mt-2 text-base text-neutral-600">
            {time} &bull; {location}
          </p>
        </div>
      </div>
    </Link>
  );
}