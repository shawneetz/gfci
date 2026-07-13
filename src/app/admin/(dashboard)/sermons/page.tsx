import Link from "next/link";
import { getAllSermons, type SermonWithSpeaker } from "@/server/queries/sermons";
import { deleteSermon } from "@/server/mutations/sermons";
import { formatDate } from "@/lib/utils";
import { ButtonLink } from "@/components/ui/button";
import { AdminRowActions } from "../_components/admin-row-actions";
import { AdminPageHeader } from "../_components/admin-page-header";
import { AdminTable, type AdminTableColumn } from "../_components/admin-table";

const columns: AdminTableColumn<SermonWithSpeaker>[] = [
  {
    header: "Title",
    cell: (sermon) => (
      <Link
        href={`/sermons/${sermon.slug}`}
        target="_blank"
        rel="noopener noreferrer"
        className="font-semibold text-ink hover:text-brand"
      >
        {sermon.title}
      </Link>
    ),
  },
  { header: "Series", cell: (sermon) => sermon.series },
  { header: "Date", cell: (sermon) => formatDate(sermon.date) },
  { header: "Speaker", cell: (sermon) => sermon.speaker },
  {
    header: "",
    className: "w-20",
    cell: (sermon) => (
      <AdminRowActions
        editHref={`/admin/sermons/${sermon.id}`}
        deleteLabel={sermon.title}
        onDelete={deleteSermon.bind(null, sermon.id)}
      />
    ),
  },
];

export default async function AdminSermonsPage() {
  const sermons = await getAllSermons();

  return (
    <div>
      <AdminPageHeader
        title="Sermons"
        description={`${sermons.length} sermon${sermons.length === 1 ? "" : "s"} — sorted newest first, same as the public /sermons page.`}
        action={
          <ButtonLink href="/admin/sermons/new" fill="brand" text="inverse" border="brand" shadow="grey">
            Add New
          </ButtonLink>
        }
      />
      <AdminTable
        columns={columns}
        rows={sermons}
        getRowKey={(sermon) => sermon.id}
        emptyMessage="No sermons yet."
      />
    </div>
  );
}