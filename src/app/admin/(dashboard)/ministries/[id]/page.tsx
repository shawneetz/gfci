import { notFound } from "next/navigation";
import { getMinistryById } from "@/server/queries/ministries";
import { getAllPeople } from "@/server/queries/people";
import { MinistryForm } from "./ministry-form";
import { AdminPageHeader } from "../../_components/admin-page-header";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function MinistryEditPage({ params }: PageProps) {
  const { id } = await params;
  const isNew = id === "new";

  const [ministry, people] = await Promise.all([
    isNew ? Promise.resolve(null) : getMinistryById(id),
    getAllPeople(),
  ]);

  if (!isNew && !ministry) notFound();

  return (
    <div>
      <AdminPageHeader title={isNew ? "New Ministry" : `Edit ${ministry!.title}`} />
      <MinistryForm ministry={ministry} people={people} />
    </div>
  );
}