import { PageHero } from "@/components/ui/page-hero";
import { GivingForm } from "@/sections/contributions-page/giving-form";
import { WhyWeGive } from "@/sections/contributions-page/why-we-give";
import { SecurityInfo } from "@/sections/contributions-page/security-info";
import { hero } from "@/content/giving";
import { getAllMinistries } from "@/server/queries/ministries";

export const revalidate = 300;

export default async function GivingPage() {
  const ministries = await getAllMinistries();

  return (
    <>
      <PageHero eyebrow={hero.eyebrow} title={hero.title} description={hero.description} />
      <WhyWeGive />
      <GivingForm ministries={ministries} />
      <SecurityInfo />
    </>
  );
}