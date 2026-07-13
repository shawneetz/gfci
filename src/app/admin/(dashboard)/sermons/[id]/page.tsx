import { notFound } from "next/navigation";
import { getSermonById } from "@/server/queries/sermons";
import { getAllPeople } from "@/server/queries/people";
import { SermonForm } from "./sermon-form";
import { AdminPageHeader } from "../../_components/admin-page-header";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function SermonEditPage({ params }: PageProps) {
  const { id } = await params;
  const isNew = id === "new";

  const [sermon, people] = await Promise.all([
    isNew ? Promise.resolve(null) : getSermonById(id),
    getAllPeople(),
  ]);

  if (!isNew && !sermon) notFound();

  return (
    <div>
      <AdminPageHeader title={isNew ? "New Sermon" : `Edit ${sermon!.title}`} />
      <SermonForm sermon={sermon} people={people} />
    </div>
  );
}