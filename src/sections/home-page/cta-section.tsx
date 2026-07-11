import { Container } from "@/components/ui/container";
import { CtaCard } from "@/components/ui/cta-card";
import { BookOpen, HandHeart } from "lucide-react";

export function CtaSection() {
  return (
    <section className="section bg-surface">
      <Container>
        <div className="space-y-6">
          {/* Giving */}
          <CtaCard
            icon={<HandHeart size={24} />}
            label="Giving"
            title="Partner With Us"
            description="Make a difference in our church, our community, and beyond through your generous giving."
            buttonText="Give Now"
            buttonHref="/giving"
            fill="grey2"
            text="inverse"
            border="ink"
            buttonFill="inverse"
            buttonTextColor="ink"
            buttonBorder="ink"
            buttonShadow="grey"
          />

          {/* Prayer */}
          <CtaCard
            icon={<BookOpen size={24} />}
            label="Prayer"
            title="Let Us Pray For You"
            description="Share your prayer intentions with us. Our prayer ministry faithfully prays for every request received."
            buttonText="Request Prayer"
            buttonHref="/prayer-requests"
            fill="grey"
            text="ink"
            border="ink"
            buttonFill="ink"
            buttonTextColor="inverse"
            buttonBorder="inverse"
            buttonShadow="grey2"
          />
        </div>
      </Container>
    </section>
  );
}