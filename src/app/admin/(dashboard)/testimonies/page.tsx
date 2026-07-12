import { getAnsweredPrayers, type AnsweredPrayer } from "@/server/queries/testimonies";
import { formatDate } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { AdminPageHeader } from "../_components/admin-page-header";
import { AdminTable, type AdminTableColumn } from "../_components/admin-table";

const columns: AdminTableColumn<AnsweredPrayer>[] = [
  { header: "Name", cell: (entry) => <span className="font-semibold text-ink">{entry.name}</span> },
  { header: "Category", cell: (entry) => <Badge tone="brand">{entry.category}</Badge> },
  { header: "Quote", cell: (entry) => <span className="line-clamp-2 max-w-md">{entry.quote}</span> },
  // createdAt comes back as a Date, not a string — formatDate() only takes
  // a string (see lib/utils.ts), so it's converted once here at the edge
  // rather than widening formatDate's signature for one caller.
  { header: "Submitted", cell: (entry) => formatDate(entry.createdAt.toISOString()) },
];

export default async function AdminTestimoniesPage() {
  const testimonies = await getAnsweredPrayers();

  return (
    <div>
      <AdminPageHeader
        title="Testimonies"
        description={`${testimonies.length} answered-prayer testimon${testimonies.length === 1 ? "y" : "ies"} — shown on /prayer-requests.`}
      />
      <AdminTable
        columns={columns}
        rows={testimonies}
        getRowKey={(entry) => entry.id}
        emptyMessage="No testimonies yet."
      />
    </div>
  );
}