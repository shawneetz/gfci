import { getLiveStream } from "@/server/queries/live-stream";
import { LiveStreamForm } from "./live-stream-form";
import { AdminPageHeader } from "../_components/admin-page-header";

export default async function AdminLiveStreamPage() {
  const liveStream = await getLiveStream();

  return (
    <div>
      <AdminPageHeader
        title="Live Stream"
        description="A single row — whatever's here is what /live falls back to when nothing else overrides it."
      />
      <LiveStreamForm
        initial={{
          title: liveStream?.title ?? "",
          schedule: liveStream?.schedule ?? "",
          location: liveStream?.location ?? "",
        }}
      />
    </div>
  );
}