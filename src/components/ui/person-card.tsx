import Image from "next/image";
import { UserRound } from "lucide-react";
import { cn } from "@/lib/utils";

interface PersonCardProps {
  name: string;
  role: string;
  image?: string;
  imageAlt?: string;
  className?: string;
}

export function PersonCard({
  name,
  role,
  image,
  imageAlt,
  className,
}: PersonCardProps) {
  return (
    <div className={cn("text-center", className)}>
      <div className="relative mx-auto aspect-square w-24 overflow-hidden rounded-full border border-border bg-surface-alt sm:w-28">
        {image ? (
          <Image
            src={image}
            alt={imageAlt ?? name}
            fill
            sizes="112px"
            className="object-cover"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-ink-muted">
            <UserRound size={28} />
          </div>
        )}
      </div>
      <p className="mt-3 font-bold text-ink text-body-sm sm:text-body">
        {name}
      </p>
      <p className="text-caption text-ink-muted">{role}</p>
    </div>
  );
}