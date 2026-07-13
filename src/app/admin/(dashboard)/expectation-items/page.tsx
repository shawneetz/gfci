import { getExpectationItems, type ExpectationItem } from "@/server/queries/expectation-items";
import { deleteExpectationItem } from "@/server/mutations/expectation-items";
import { resolveIcon } from "@/lib/icon-map";
import { ICON_SIZE } from "@/lib/icon-sizes";
import { ButtonLink } from "@/components/ui/button";
import { AdminRowActions } from "../_components/admin-row-actions";
import { AdminPageHeader } from "../_components/admin-page-header";
import { AdminTable, type AdminTableColumn } from "../_components/admin-table";

const columns: AdminTableColumn<ExpectationItem>[] = [
  { header: "Order", cell: (item) => item.order, className: "w-16" },
  {
    header: "Icon",
    cell: (item) => {
      const Icon = resolveIcon(item.icon);
      return (
        <span className="inline-flex items-center gap-2 text-ink-secondary">
          <Icon size={ICON_SIZE.inline} />
          <span className="text-caption text-ink-muted">{item.icon}</span>
        </span>
      );
    },
  },
  { header: "Title", cell: (item) => <span className="font-semibold text-ink">{item.title}</span> },
  { header: "Description", cell: (item) => <span className="line-clamp-2 max-w-md">{item.description}</span> },
  {
    header: "",
    className: "w-20",
    cell: (item) => (
      <AdminRowActions
        editHref={`/admin/expectation-items/${item.id}`}
        deleteLabel={item.title}
        onDelete={deleteExpectationItem.bind(null, item.id)}
      />
    ),
  },
];

export default async function AdminExpectationItemsPage() {
  const items = await getExpectationItems();

  return (
    <div>
      <AdminPageHeader
        title="What to Expect"
        description={`${items.length} item${items.length === 1 ? "" : "s"} — shown on /connect.`}
        action={
          <ButtonLink href="/admin/expectation-items/new" fill="brand" text="inverse" border="brand" shadow="grey">
            Add New
          </ButtonLink>
        }
      />
      <AdminTable
        columns={columns}
        rows={items}
        getRowKey={(item) => item.id}
        emptyMessage="No items yet."
      />
    </div>
  );
}