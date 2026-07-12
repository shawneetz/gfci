import { PageHero } from "@/components/ui/page-hero";
import { MinistriesList } from "@/sections/ministries-page/ministries-list";
import { hero } from "@/content/ministries";

export const dynamic = "force-dynamic";

export const metadata = {
  title: hero.title,
  description: hero.description,
};

export default function MinistriesPage() {
  return (
    <>
      <PageHero eyebrow={hero.eyebrow} title={hero.title} description={hero.description} />
      <MinistriesList />
    </>
  );
}