import { getConnectRegistrations, type ConnectRegistration } from "@/server/queries/submissions";
import { deleteConnectRegistration } from "@/server/mutations/submissions";
import { formatDate } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { DeleteButton } from "../_components/delete-button";
import { AdminPageHeader } from "../_components/admin-page-header";
import { AdminTable, type AdminTableColumn } from "../_components/admin-table";

function registrantName(entry: ConnectRegistration): string {
  if (entry.audience === "kids") return entry.parentName ?? "—";
  if (entry.audience === "youth") return entry.studentName ?? "—";
  return entry.fullName ?? "—";
}

const audienceLabel: Record<ConnectRegistration["audience"], string> = {
  kids: "Kids",
  youth: "Youth",
  adults: "Adults",
};

const columns: AdminTableColumn<ConnectRegistration>[] = [
  { header: "Audience", cell: (entry) => <Badge tone="brand">{audienceLabel[entry.audience]}</Badge> },
  { header: "Name", cell: (entry) => <span className="font-semibold text-ink">{registrantName(entry)}</span> },
  {
    header: "Email",
    cell: (entry) => (
      <a href={`mailto:${entry.email}`} className="text-brand hover:underline">
        {entry.email}
      </a>
    ),
  },
  { header: "Visit Date", cell: (entry) => formatDate(entry.visitDate.toISOString()) },
  { header: "Submitted", cell: (entry) => formatDate(entry.createdAt.toISOString()) },
  {
    header: "",
    className: "w-16",
    cell: (entry) => (
      <DeleteButton
        label={`registration from ${registrantName(entry)}`}
        onDelete={deleteConnectRegistration.bind(null, entry.id)}
      />
    ),
  },
];

export default async function AdminConnectSubmissionsPage() {
  const submissions = await getConnectRegistrations();

  return (
    <div>
      <AdminPageHeader
        title="Connect Submissions"
        description={`${submissions.length} registration${submissions.length === 1 ? "" : "s"} from the public /connect form (Kids, Youth, and Adults combined).`}
      />
      <AdminTable
        columns={columns}
        rows={submissions}
        getRowKey={(entry) => entry.id}
        emptyMessage="No connect submissions yet."
      />
    </div>
  );
}