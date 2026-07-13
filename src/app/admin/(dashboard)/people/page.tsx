import { getAllPeople, type Person } from "@/server/queries/people";
import { deletePerson } from "@/server/mutations/people";
import { Badge } from "@/components/ui/badge";
import { ButtonLink } from "@/components/ui/button";
import { AdminRowActions } from "../_components/admin-row-actions";
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
  {
    header: "",
    className: "w-20",
    cell: (person) => (
      <AdminRowActions
        editHref={`/admin/people/${person.id}`}
        deleteLabel={person.displayName}
        onDelete={deletePerson.bind(null, person.id)}
      />
    ),
  },
];

export default async function AdminPeoplePage() {
  const people = await getAllPeople();

  return (
    <div>
      <AdminPageHeader
        title="People"
        description={`${people.length} ${people.length === 1 ? "person" : "people"} — every sermon speaker and ministry leader, plus anyone else on staff. Only those marked "On About page" appear in the public Leadership grid.`}
        action={
          <ButtonLink href="/admin/people/new" fill="brand" text="inverse" border="brand" shadow="grey">
            Add New
          </ButtonLink>
        }
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