import Image from "next/image";
import { cn } from "@/lib/utils";

interface Photo {
  src: string;
  alt: string;
}

interface PhotoGridProps {
  featured: Photo;
  secondary?: Photo[];
  className?: string;
}

export function PhotoGrid({
  featured,
  secondary = [],
  className,
}: PhotoGridProps) {
  return (
    <div className={cn("space-y-3", className)}>
      <div className="relative aspect-16/10 overflow-hidden border-2 border-ink">
        <Image
          src={featured.src}
          alt={featured.alt}
          fill
          sizes="(max-width: 768px) 100vw, 700px"
          className="object-cover"
        />
      </div>

      {secondary.length > 0 && (
        <div className="grid grid-cols-2 gap-3">
          {secondary.map((photo) => (
            <div
              key={photo.src}
              className="relative aspect-square overflow-hidden border-2 border-ink"
            >
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                sizes="(max-width: 768px) 50vw, 340px"
                className="object-cover"
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}