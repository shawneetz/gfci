import { notFound } from "next/navigation";
import { getEventById } from "@/server/queries/events";
import { EventForm } from "./event-form";
import { AdminPageHeader } from "../../_components/admin-page-header";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function EventEditPage({ params }: PageProps) {
  const { id } = await params;
  const isNew = id === "new";
  const event = isNew ? null : await getEventById(id);

  if (!isNew && !event) notFound();

  return (
    <div>
      <AdminPageHeader title={isNew ? "New Event" : `Edit ${event!.title}`} />
      <EventForm event={event} />
    </div>
  );
}