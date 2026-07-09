import { CSSProperties } from "react";
import { Quote } from "lucide-react";

import { cn } from "@/lib/utils";
import { Tone, toneVar } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface QuoteCardProps {
  quote: string;
  name: string;
  tag?: string; // e.g. category label, shown as a small badge

  // Design props — same Tone system as Button/CtaCard.
  fill?: Tone;
  text?: Tone;
  border?: Tone;
  shadow?: Tone; // "transparent" = no shadow

  className?: string;
}

export function QuoteCard({
  quote,
  name,
  tag,
  fill = "inverse",
  text = "ink",
  border = "ink",
  shadow = "ink",
  className,
}: QuoteCardProps) {
  const style: CSSProperties = {
    backgroundColor: toneVar[fill],
    color: toneVar[text],
    borderColor: toneVar[border],
    boxShadow:
      shadow === "transparent" ? "none" : `6px 6px 0 0 ${toneVar[shadow]}`,
  };

  return (
    <div className={cn("border-2 p-6 md:p-7", className)} style={style}>
      <Quote size={28} className="opacity-20" fill="currentColor" strokeWidth={0} />
      <p className="mt-3 text-body leading-relaxed">&ldquo;{quote}&rdquo;</p>
      <div className="mt-5 flex items-center justify-between gap-3">
        <p className="text-label opacity-70">{name}</p>
        {tag && <Badge tone="brand">{tag}</Badge>}
      </div>
    </div>
  );
}