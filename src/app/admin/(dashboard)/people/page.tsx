import { getAllPeople, type Person } from "@/server/queries/people";
import { Badge } from "@/components/ui/badge";
import { AdminPageHeader } from "../_components/admin-page-header";
import { AdminTable, type AdminTableColumn } from "../_components/admin-table";

const columns: AdminTableColumn<Person>[] = [
  { header: "Name", cell: (person) => <span className="font-semibold text-ink">{person.displayName}</span> },
  { header: "Title", cell: (person) => person.title },
  {
    header: "Leadership Team",
    cell: (person) =>
      person.isLeadershipTeam ? (
        <Badge tone="brand">On About page</Badge>
      ) : (
        <span className="text-ink-muted">—</span>
      ),
  },
  { header: "Email", cell: (person) => person.email ?? <span className="text-ink-muted">—</span> },
];

export default async function AdminPeoplePage() {
  const people = await getAllPeople();

  return (
    <div>
      <AdminPageHeader
        title="People"
        description={`${people.length} ${people.length === 1 ? "person" : "people"} — every sermon speaker and ministry leader, plus anyone else on staff. Only those marked "On About page" appear in the public Leadership grid.`}
      />
      <AdminTable
        columns={columns}
        rows={people}
        getRowKey={(person) => person.id}
        emptyMessage="No people yet."
      />
    </div>
  );
}