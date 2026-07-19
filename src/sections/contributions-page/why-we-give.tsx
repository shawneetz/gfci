import Image from "next/image";
import { Container } from "@/components/ui/container";
import { cn } from "@/lib/utils";
import { FORM_PAGE_MAX_WIDTH } from "@/lib/layout";
import { CARD_OVERLAY } from "@/lib/overlays";
import { whyWeGive } from "@/content/giving";

export function WhyWeGive() {
  return (
    <section className="section bg-surface-alt">
      <Container className={FORM_PAGE_MAX_WIDTH}>
        <div className="relative aspect-4/3 overflow-hidden rounded-lg border border-border sm:aspect-video">
          <Image
            src="/images/home-page/outreach.jpg"
            alt="Congregation gathered together in worship and service"
            fill
            sizes="(max-width: 768px) 100vw, 576px"
            className="object-cover"
          />
          <div className={cn("absolute inset-0", CARD_OVERLAY)} />

          <div className="absolute inset-x-0 bottom-0 p-6 md:p-8">
            <h2 className="text-card-title text-ink-inverse">{whyWeGive.title}</h2>
            <p className="mt-2 max-w-sm text-body-sm text-ink-inverse-secondary">{whyWeGive.body}</p>
          </div>
        </div>
      </Container>
    </section>
  );
}