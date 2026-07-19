import { getPrayerRequestSubmissions, type PrayerRequestSubmission } from "@/server/queries/submissions";
import { deletePrayerRequestSubmission } from "@/server/mutations/submissions";
import { formatDate } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { DeleteButton } from "../_components/delete-button";
import { AdminPageHeader } from "../_components/admin-page-header";
import { AdminTable, type AdminTableColumn } from "../_components/admin-table";

const columns: AdminTableColumn<PrayerRequestSubmission>[] = [
  { header: "Name", cell: (entry) => <span className="font-semibold text-ink">{entry.name}</span> },
  {
    header: "Email",
    cell: (entry) => (
      <a href={`mailto:${entry.email}`} className="text-brand hover:underline">
        {entry.email}
      </a>
    ),
  },
  { header: "Category", cell: (entry) => <Badge tone="brand">{entry.category}</Badge> },
  {
    header: "Visibility",
    cell: (entry) =>
      entry.visibility === "public" ? (
        <Badge tone="brand">Public</Badge>
      ) : (
        <span className="text-ink-muted">Private</span>
      ),
  },
  { header: "Message", cell: (entry) => <span className="line-clamp-2 max-w-sm">{entry.message}</span> },
  { header: "Submitted", cell: (entry) => formatDate(entry.createdAt.toISOString()) },
  {
    header: "",
    className: "w-16",
    cell: (entry) => (
      <DeleteButton
        label={`prayer request from ${entry.name}`}
        onDelete={deletePrayerRequestSubmission.bind(null, entry.id)}
      />
    ),
  },
];

export default async function AdminPrayerSubmissionsPage() {
  const submissions = await getPrayerRequestSubmissions();

  return (
    <div>
      <AdminPageHeader
        title="Prayer Request Submissions"
        description={`${submissions.length} submission${submissions.length === 1 ? "" : "s"} from the public /prayer-requests form.`}
      />
      <AdminTable
        columns={columns}
        rows={submissions}
        getRowKey={(entry) => entry.id}
        emptyMessage="No prayer request submissions yet."
      />
    </div>
  );
}