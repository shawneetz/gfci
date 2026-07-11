import { PageHero } from "@/components/ui/page-hero";
import { GivingForm } from "@/sections/contributions-page/giving-form";
import { WhyWeGive } from "@/sections/contributions-page/why-we-give";
import { SecurityInfo } from "@/sections/contributions-page/security-info";
import { hero } from "@/content/giving";

export default function GivingPage() {
  return (
    <>
      <PageHero eyebrow={hero.eyebrow} title={hero.title} description={hero.description} />
      <WhyWeGive />
      <GivingForm />
      <SecurityInfo />
    </>
  );
}
