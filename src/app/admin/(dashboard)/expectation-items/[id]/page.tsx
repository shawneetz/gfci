import { notFound } from "next/navigation";
import { getExpectationItemById } from "@/server/queries/expectation-items";
import { ExpectationItemForm } from "./expectation-item-form";
import { AdminPageHeader } from "../../_components/admin-page-header";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function ExpectationItemEditPage({ params }: PageProps) {
  const { id } = await params;
  const isNew = id === "new";
  const item = isNew ? null : await getExpectationItemById(id);

  if (!isNew && !item) notFound();

  return (
    <div>
      <AdminPageHeader title={isNew ? "New Expectation Item" : `Edit ${item!.title}`} />
      <ExpectationItemForm item={item} />
    </div>
  );
}