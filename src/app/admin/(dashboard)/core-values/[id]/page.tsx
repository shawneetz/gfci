import { notFound } from "next/navigation";
import { getCoreValueById } from "@/server/queries/core-values";
import { CoreValueForm } from "./core-value-form";
import { AdminPageHeader } from "../../_components/admin-page-header";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function CoreValueEditPage({ params }: PageProps) {
  const { id } = await params;
  const isNew = id === "new";
  const value = isNew ? null : await getCoreValueById(id);

  if (!isNew && !value) notFound();

  return (
    <div>
      <AdminPageHeader title={isNew ? "New Core Value" : `Edit ${value!.title}`} />
      <CoreValueForm value={value} />
    </div>
  );
}