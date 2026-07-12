import { put } from "@vercel/blob";

export interface UploadImageOptions {
  // Folder-style prefix so uploads stay organized in the Blob dashboard,
  // e.g. "sermons", "events", "ministries". Optional — defaults to a
  // flat "uploads" prefix.
  folder?: string;
}

// Accepts anything the browser or a Server Action can hand it — a File
// from a form upload, or a Buffer for the backfill script reading local
// files off disk. Returns the public URL to store on the model
// (Ministry.image, Sermon.thumbnail, Event.image, PrayerTeam.image, etc.).
export async function uploadImage(
  file: File | Buffer,
  filename: string,
  { folder = "uploads" }: UploadImageOptions = {}
): Promise<string> {
  const blob = await put(`${folder}/${filename}`, file, {
    access: "public",
    // Adds a random suffix so re-uploading a file with the same name
    // (e.g. re-running the backfill script) never overwrites or
    // collides with an existing blob.
    addRandomSuffix: true,
  });

  return blob.url;
}
