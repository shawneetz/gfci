import { getLiveStream } from "@/server/queries/live-stream";
import { LiveStreamView } from "@/sections/live-page/live-stream-view";
import { stream as fallbackStream } from "@/content/live";

export const dynamic = "force-dynamic";

export default async function LivePage() {
  const liveStream = await getLiveStream();

  const stream = liveStream
    ? { title: liveStream.title, date: liveStream.schedule, location: liveStream.location }
    : fallbackStream;

  return <LiveStreamView stream={stream} />;
}