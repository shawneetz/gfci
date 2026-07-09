import { ConnectHero } from "@/sections/connect-page/connect-hero";
import { ConnectForm } from "@/sections/connect-page/connect-form";
import { WhatToExpect } from "@/sections/connect-page/what-to-expect";
import { VisitInfo } from "@/sections/connect-page/visit-info";

export default function ConnectPage() {
  return (
    <>
      <ConnectHero />
      <VisitInfo />
      <WhatToExpect />
      <ConnectForm />
    </>
  );
}