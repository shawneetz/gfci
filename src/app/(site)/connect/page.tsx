import { ConnectHero } from "@/sections/connect-page/connect-hero";
import { ConnectForm } from "@/sections/connect-page/connect-form";
import { WhatToExpect } from "@/sections/connect-page/what-to-expect";
import { VisitInfo } from "@/sections/connect-page/visit-info";
import { getAllMinistries } from "@/server/queries/ministries";

export const dynamic = "force-dynamic";

export default async function ConnectPage() {
  const ministries = await getAllMinistries();

  return (
    <>
      <ConnectHero />
      <VisitInfo />
      <WhatToExpect />
      <ConnectForm ministries={ministries} />
    </>
  );
}