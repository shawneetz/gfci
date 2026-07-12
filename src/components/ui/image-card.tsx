import Image from "next/image";
import { cn } from "@/lib/utils";
import { TiltCard } from "@/components/ui/tilt-card";
import { TILE_OVERLAY } from "@/lib/overlays";

type ImageCardProps = {
  title: string;
  image: string;
  href: string;
};

export function ImageCard({ title, image, href }: ImageCardProps) {
  return (

    <TiltCard
      href={href}
      lift={false}
      className="group relative block aspect-square overflow-hidden"
    >
      <Image
        src={image}
        alt=""
        fill
        sizes="(max-width: 768px) 50vw, 25vw"
        className="object-cover transition-transform duration-300 group-hover:scale-105"
      />

      <div className={cn("absolute inset-0", TILE_OVERLAY)} />

      <div className="absolute inset-x-0 bottom-0 p-2">
        <h3 className="text-sm font-bold text-ink-inverse">{title}</h3>
      </div>
    </TiltCard>
  );
}