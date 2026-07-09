import { PageHero } from "@/components/ui/page-hero";
import { GivingForm } from "@/sections/contributions-page/giving-form";
import { WhyWeGive } from "@/sections/contributions-page/why-we-give";
import { SecurityInfo } from "@/sections/contributions-page/security-info";

export default function GivingPage() {
  return (
    <>
      <PageHero
        tone="light"
        title="Contributions"
        description="Your generosity fuels our mission to bring light and hope to the community."
      />
      <WhyWeGive />
      <GivingForm />
      <SecurityInfo />
    </>
  );
}