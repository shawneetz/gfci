import { PageHero } from "@/components/ui/page-hero";
import { MinistriesList } from "@/sections/ministries-page/ministries-list";

export default function MinistriesPage() {
  return (
    <>
      <PageHero
        eyebrow="Get Involved"
        title="Ministries"
        description="Find your place in our community. We have spaces designed for every stage of life to grow, connect, and serve together."
      />
      <MinistriesList />
    </>
  );
}