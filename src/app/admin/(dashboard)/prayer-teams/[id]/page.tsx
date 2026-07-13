import { notFound } from "next/navigation";
import { getPrayerTeamById } from "@/server/queries/prayer-teams";
import { PrayerTeamForm } from "./prayer-team-form";
import { AdminPageHeader } from "../../_components/admin-page-header";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function PrayerTeamEditPage({ params }: PageProps) {
  const { id } = await params;
  const isNew = id === "new";
  const team = isNew ? null : await getPrayerTeamById(id);

  if (!isNew && !team) notFound();

  return (
    <div>
      <AdminPageHeader title={isNew ? "New Prayer Team" : `Edit ${team!.name}`} />
      <PrayerTeamForm team={team} />
    </div>
  );
}