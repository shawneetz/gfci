import { getGivingIntents, type GivingIntent } from "@/server/queries/submissions";
import { deleteGivingIntent } from "@/server/mutations/submissions";
import { formatDate } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { DeleteButton } from "../_components/delete-button";
import { AdminPageHeader } from "../_components/admin-page-header";
import { AdminTable, type AdminTableColumn } from "../_components/admin-table";

const columns: AdminTableColumn<GivingIntent>[] = [
  {
    header: "Amount",
    cell: (entry) => <span className="font-semibold text-ink">₱{entry.amount.toLocaleString()}</span>,
  },
  { header: "Fund", cell: (entry) => entry.fund },
  {
    header: "Frequency",
    cell: (entry) => (
      <Badge tone={entry.frequency === "monthly" ? "brand" : "grey"}>
        {entry.frequency === "one_time" ? "One-time" : "Monthly"}
      </Badge>
    ),
  },
  { header: "Submitted", cell: (entry) => formatDate(entry.createdAt.toISOString()) },
  {
    header: "",
    className: "w-16",
    cell: (entry) => (
      <DeleteButton
        label={`giving submission of ₱${entry.amount}`}
        onDelete={deleteGivingIntent.bind(null, entry.id)}
      />
    ),
  },
];

export default async function AdminGivingSubmissionsPage() {
  const submissions = await getGivingIntents();

  return (
    <div>
      <AdminPageHeader
        title="Giving Submissions"
        description={`${submissions.length} giving intent${submissions.length === 1 ? "" : "s"} recorded from the public /giving form. Reminder: this only records intent — no payment is actually processed yet.`}
      />
      <AdminTable
        columns={columns}
        rows={submissions}
        getRowKey={(entry) => entry.id}
        emptyMessage="No giving submissions yet."
      />
    </div>
  );
}