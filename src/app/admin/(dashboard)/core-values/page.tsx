import { getCoreValues, type CoreValue } from "@/server/queries/core-values";
import { deleteCoreValue } from "@/server/mutations/core-values";
import { resolveIcon } from "@/lib/icon-map";
import { ICON_SIZE } from "@/lib/icon-sizes";
import { ButtonLink } from "@/components/ui/button";
import { AdminRowActions } from "../_components/admin-row-actions";
import { AdminPageHeader } from "../_components/admin-page-header";
import { AdminTable, type AdminTableColumn } from "../_components/admin-table";

const columns: AdminTableColumn<CoreValue>[] = [
  { header: "Order", cell: (value) => value.order, className: "w-16" },
  {
    header: "Icon",
    cell: (value) => {
      const Icon = resolveIcon(value.icon);
      return (
        <span className="inline-flex items-center gap-2 text-ink-secondary">
          <Icon size={ICON_SIZE.inline} />
          <span className="text-caption text-ink-muted">{value.icon}</span>
        </span>
      );
    },
  },
  { header: "Title", cell: (value) => <span className="font-semibold text-ink">{value.title}</span> },
  { header: "Description", cell: (value) => <span className="line-clamp-2 max-w-md">{value.description}</span> },
  {
    header: "",
    className: "w-20",
    cell: (value) => (
      <AdminRowActions
        editHref={`/admin/core-values/${value.id}`}
        deleteLabel={value.title}
        onDelete={deleteCoreValue.bind(null, value.id)}
      />
    ),
  },
];

export default async function AdminCoreValuesPage() {
  const coreValues = await getCoreValues();

  return (
    <div>
      <AdminPageHeader
        title="Core Values"
        description={`${coreValues.length} value${coreValues.length === 1 ? "" : "s"} — shown on /about.`}
        action={
          <ButtonLink href="/admin/core-values/new" fill="brand" text="inverse" border="brand" shadow="grey">
            Add New
          </ButtonLink>
        }
      />
      <AdminTable
        columns={columns}
        rows={coreValues}
        getRowKey={(value) => value.id}
        emptyMessage="No core values yet."
      />
    </div>
  );
}