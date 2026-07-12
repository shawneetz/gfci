import { getAllEvents, type ChurchEvent } from "@/server/queries/events";
import { formatDate } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { AdminPageHeader } from "../_components/admin-page-header";
import { AdminTable, type AdminTableColumn } from "../_components/admin-table";

const columns: AdminTableColumn<ChurchEvent>[] = [
  { header: "Title", cell: (event) => <span className="font-semibold text-ink">{event.title}</span> },
  { header: "Date", cell: (event) => formatDate(event.date) },
  { header: "Category", cell: (event) => <Badge>{event.category}</Badge> },
  {
    header: "Featured",
    cell: (event) =>
      event.featured ? <Badge tone="brand">Featured</Badge> : <span className="text-ink-muted">—</span>,
  },
  { header: "Location", cell: (event) => event.location },
];

export default async function AdminEventsPage() {
  const events = await getAllEvents();

  return (
    <div>
      <AdminPageHeader
        title="Events"
        description={`${events.length} event${events.length === 1 ? "" : "s"} — including past events. Exactly one may be marked Featured (enforced at the database level, Phase 10).`}
      />
      <AdminTable
        columns={columns}
        rows={events}
        getRowKey={(event) => event.id}
        emptyMessage="No events yet."
      />
    </div>
  );
}