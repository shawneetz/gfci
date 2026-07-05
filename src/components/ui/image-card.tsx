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
      className="group relative block aspect-square overflow-hidden rounded-2xl"
    >
      <Image
        src={image}
        alt={title}
        fill
        sizes="(max-width: 768px) 50vw, 25vw"
        className="object-cover transition-transform duration-300 group-hover:scale-105"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/10 to-transparent" />

      {/* Title */}
      <div className="absolute inset-x-0 bottom-0 p-2">
        <h3 className="text-sm font-bold text-secondary">
          {title}
        </h3>
      </div>
    </Link>
  );
}