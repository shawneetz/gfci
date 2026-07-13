import { notFound } from "next/navigation";
import { getAnsweredPrayerById } from "@/server/queries/testimonies";
import { TestimonyForm } from "./testimony-form";
import { AdminPageHeader } from "../../_components/admin-page-header";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function TestimonyEditPage({ params }: PageProps) {
  const { id } = await params;
  const isNew = id === "new";
  const entry = isNew ? null : await getAnsweredPrayerById(id);

  if (!isNew && !entry) notFound();

  return (
    <div>
      <AdminPageHeader title={isNew ? "New Testimony" : `Edit testimony from ${entry!.name}`} />
      <TestimonyForm entry={entry} />
    </div>
  );
}