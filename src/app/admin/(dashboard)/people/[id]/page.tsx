import { notFound } from "next/navigation";
import { getPersonById } from "@/server/queries/people";
import { PersonForm } from "./person-form";
import { AdminPageHeader } from "../../_components/admin-page-header";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function PersonEditPage({ params }: PageProps) {
  const { id } = await params;
  const isNew = id === "new";
  const person = isNew ? null : await getPersonById(id);

  if (!isNew && !person) notFound();

  return (
    <div>
      <AdminPageHeader title={isNew ? "New Person" : `Edit ${person!.displayName}`} />
      <PersonForm person={person} />
    </div>
  );
}