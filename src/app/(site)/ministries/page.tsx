import { PageHero } from "@/components/ui/page-hero";
import { MinistriesList } from "@/sections/ministries-page/ministries-list";
import { hero } from "@/content/ministries";

export default function MinistriesPage() {
  return (
    <>
      <PageHero eyebrow={hero.eyebrow} title={hero.title} description={hero.description} />
      <MinistriesList />
    </>
  );
}
