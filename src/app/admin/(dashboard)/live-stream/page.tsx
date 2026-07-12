import { getLiveStream } from "@/server/queries/live-stream";
import { Panel } from "@/components/ui/panel";
import { AdminPageHeader } from "../_components/admin-page-header";

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-label text-ink-muted">{label}</p>
      <p className="mt-1 text-body text-ink">{value}</p>
    </div>
  );
}

export default async function AdminLiveStreamPage() {
  const liveStream = await getLiveStream();

  return (
    <div>
      <AdminPageHeader
        title="Live Stream"
        description="A single row — whatever's here is what /live falls back to when nothing else overrides it."
      />

      <Panel className="max-w-lg space-y-5" shadow={false}>
        {liveStream ? (
          <>
            <Field label="Title" value={liveStream.title} />
            <Field label="Schedule" value={liveStream.schedule} />
            <Field label="Location" value={liveStream.location} />
            <Field
              label="Last Updated"
              value={new Date(liveStream.updatedAt).toLocaleString("en-US", {
                dateStyle: "medium",
                timeStyle: "short",
              })}
            />
          </>
        ) : (
          <p className="text-body-sm text-ink-muted">
            No LiveStream row exists yet — the public /live page is showing its
            hardcoded fallback copy from src/content/live.ts. Run the seed script,
            or wait for Phase 15&apos;s edit form to create this row.
          </p>
        )}
      </Panel>
    </div>
  );
}