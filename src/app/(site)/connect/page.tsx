import { ConnectHero } from "@/sections/connect-page/connect-hero";
import { ConnectForm } from "@/sections/connect-page/connect-form";
import { WhatToExpect } from "@/sections/connect-page/what-to-expect";
import { VisitInfo } from "@/sections/connect-page/visit-info";
import { getAllMinistries } from "@/server/queries/ministries";
import { getSiteSettings } from "@/server/queries/site-settings";

export const revalidate = 300;

export default async function ConnectPage() {
  const ministries = await getAllMinistries();
  const settings = await getSiteSettings();

  return (
    <>
      <ConnectHero />
      <VisitInfo />
      <WhatToExpect />
      <ConnectForm ministries={ministries} hostEmail={settings.email} />
    </>
  );
}