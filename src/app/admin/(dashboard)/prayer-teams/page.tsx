import { getPrayerTeams, type PrayerTeam } from "@/server/queries/prayer-teams";
import { deletePrayerTeam } from "@/server/mutations/prayer-teams";
import { ButtonLink } from "@/components/ui/button";
import { AdminRowActions } from "../_components/admin-row-actions";
import { AdminPageHeader } from "../_components/admin-page-header";
import { AdminTable, type AdminTableColumn } from "../_components/admin-table";

const columns: AdminTableColumn<PrayerTeam>[] = [
  { header: "Order", cell: (team) => team.order, className: "w-16" },
  { header: "Name", cell: (team) => <span className="font-semibold text-ink">{team.name}</span> },
  { header: "Schedule", cell: (team) => team.schedule },
  { header: "Details", cell: (team) => <span className="line-clamp-2 max-w-sm">{team.details}</span> },
  {
    header: "",
    className: "w-20",
    cell: (team) => (
      <AdminRowActions
        editHref={`/admin/prayer-teams/${team.id}`}
        deleteLabel={team.name}
        onDelete={deletePrayerTeam.bind(null, team.id)}
      />
    ),
  },
];

export default async function AdminPrayerTeamsPage() {
  const prayerTeams = await getPrayerTeams();

  return (
    <div>
      <AdminPageHeader
        title="Prayer Teams"
        description={`${prayerTeams.length} team${prayerTeams.length === 1 ? "" : "s"} — shown on /prayer-requests under "Join a Prayer Team."`}
        action={
          <ButtonLink href="/admin/prayer-teams/new" fill="brand" text="inverse" border="brand" shadow="grey">
            Add New
          </ButtonLink>
        }
      />
      <AdminTable
        columns={columns}
        rows={prayerTeams}
        getRowKey={(team) => team.id}
        emptyMessage="No prayer teams yet."
      />
    </div>
  );
}