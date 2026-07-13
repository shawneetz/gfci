import { getAnsweredPrayers, type AnsweredPrayer } from "@/server/queries/testimonies";
import { deleteTestimony } from "@/server/mutations/testimonies";
import { formatDate } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { ButtonLink } from "@/components/ui/button";
import { AdminRowActions } from "../_components/admin-row-actions";
import { AdminPageHeader } from "../_components/admin-page-header";
import { AdminTable, type AdminTableColumn } from "../_components/admin-table";

const columns: AdminTableColumn<AnsweredPrayer>[] = [
  { header: "Name", cell: (entry) => <span className="font-semibold text-ink">{entry.name}</span> },
  { header: "Category", cell: (entry) => <Badge tone="brand">{entry.category}</Badge> },
  { header: "Quote", cell: (entry) => <span className="line-clamp-2 max-w-md">{entry.quote}</span> },
  { header: "Submitted", cell: (entry) => formatDate(entry.createdAt.toISOString()) },
  {
    header: "",
    className: "w-20",
    cell: (entry) => (
      <AdminRowActions
        editHref={`/admin/testimonies/${entry.id}`}
        deleteLabel={entry.name}
        onDelete={deleteTestimony.bind(null, entry.id)}
      />
    ),
  },
];

export default async function AdminTestimoniesPage() {
  const testimonies = await getAnsweredPrayers();

  return (
    <div>
      <AdminPageHeader
        title="Testimonies"
        description={`${testimonies.length} answered-prayer testimon${testimonies.length === 1 ? "y" : "ies"} — shown on /prayer-requests.`}
        action={
          <ButtonLink href="/admin/testimonies/new" fill="brand" text="inverse" border="brand" shadow="grey">
            Add New
          </ButtonLink>
        }
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