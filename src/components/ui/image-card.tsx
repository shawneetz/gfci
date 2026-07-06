import Image from "next/image";
import Link from "next/link";

type ImageCardProps = {
  title: string;
  image: string;
  href: string;
};

export function ImageCard({
  title,
  image,
  href,
}: ImageCardProps) {
  return (
    <Link
      href={href}
      className="group relative block aspect-square overflow-hidden rounded-none border-2 border-ink"
    >
      <Image
        src={image}
        alt={title}
        fill
        sizes="(max-width: 768px) 50vw, 25vw"
        className="object-cover transition-transform duration-300 group-hover:scale-105"
      />

      <div className="absolute inset-0 bg-linear-to-t from-surface-inverse/70 via-surface-inverse/10 to-transparent" />

      <div className="absolute inset-x-0 bottom-0 p-2">
        <h3 className="text-sm font-bold text-ink-inverse">
          {title}
        </h3>
      </div>
    </Link>
  );
}