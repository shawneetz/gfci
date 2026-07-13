import Link from "next/link";
import { getAllMinistries, type MinistryWithLeader } from "@/server/queries/ministries";
import { deleteMinistry } from "@/server/mutations/ministries";
import { ButtonLink } from "@/components/ui/button";
import { AdminRowActions } from "../_components/admin-row-actions";
import { AdminPageHeader } from "../_components/admin-page-header";
import { AdminTable, type AdminTableColumn } from "../_components/admin-table";

const columns: AdminTableColumn<MinistryWithLeader>[] = [
  { header: "Order", cell: (ministry) => ministry.order, className: "w-16" },
  {
    header: "Title",
    cell: (ministry) => (
      <Link
        href={`/ministries/${ministry.slug}`}
        target="_blank"
        rel="noopener noreferrer"
        className="font-semibold text-ink hover:text-brand"
      >
        {ministry.title}
      </Link>
    ),
  },
  { header: "Leader", cell: (ministry) => ministry.leader },
  { header: "Audience", cell: (ministry) => ministry.audience },
  { header: "Schedule", cell: (ministry) => ministry.schedule },
  {
    header: "",
    className: "w-20",
    cell: (ministry) => (
      <AdminRowActions
        editHref={`/admin/ministries/${ministry.id}`}
        deleteLabel={ministry.title}
        onDelete={deleteMinistry.bind(null, ministry.id)}
      />
    ),
  },
];

export default async function AdminMinistriesPage() {
  const ministries = await getAllMinistries();

  return (
    <div>
      <AdminPageHeader
        title="Ministries"
        description={`${ministries.length} ministr${ministries.length === 1 ? "y" : "ies"} — same order used on /ministries and the Giving form's fund list.`}
        action={
          <ButtonLink href="/admin/ministries/new" fill="brand" text="inverse" border="brand" shadow="grey">
            Add New
          </ButtonLink>
        }
      />
      <AdminTable
        columns={columns}
        rows={ministries}
        getRowKey={(ministry) => ministry.id}
        emptyMessage="No ministries yet."
      />
    </div>
  );
}