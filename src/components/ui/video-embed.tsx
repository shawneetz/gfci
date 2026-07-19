import { Play } from "lucide-react";
import { cn } from "@/lib/utils";
import { getVideoEmbedInfo } from "@/lib/video";

interface VideoEmbedProps {
  url?: string | null;
  title: string;
  className?: string;
}

export function VideoEmbed({ url, title, className }: VideoEmbedProps) {
  const { embedUrl } = getVideoEmbedInfo(url);

  if (!embedUrl) {
    return (
      <div
        className={cn(
          "relative aspect-video overflow-hidden rounded-lg border border-border bg-surface-inverse flex items-center justify-center",
          className
        )}
      >
        <span className="flex h-16 w-16 items-center justify-center rounded-full bg-surface/90 text-brand">
          <Play size={24} fill="currentColor" />
        </span>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "relative aspect-video overflow-hidden rounded-lg border border-border bg-black",
        className
      )}
    >
      <iframe
        src={embedUrl}
        title={title}
        className="absolute inset-0 h-full w-full"
        style={{ border: 0 }}
        allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
        allowFullScreen
      />
    </div>
  );
}