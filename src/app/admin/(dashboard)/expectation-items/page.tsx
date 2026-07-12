import { getExpectationItems, type ExpectationItem } from "@/server/queries/expectation-items";
import { resolveIcon } from "@/lib/icon-map";
import { ICON_SIZE } from "@/lib/icon-sizes";
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
];

export default async function AdminExpectationItemsPage() {
  const items = await getExpectationItems();

  return (
    <div>
      <AdminPageHeader
        title="What to Expect"
        description={`${items.length} item${items.length === 1 ? "" : "s"} — shown on /connect. Moved out of src/content/connect.ts in Phase 12.`}
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