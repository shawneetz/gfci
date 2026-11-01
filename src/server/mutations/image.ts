import "server-only";
import { uploadImage } from "@/lib/storage";

// Image helper shared by every mutation that has an image field
// (Ministry, Sermon, Event, Person).

// Uploads a new file if one was provided; otherwise keeps the existing URL.
// Used by every mutation that has an image field (Ministry, Sermon, Event).
export async function resolveImageUrl(
  file: File | null,
  fallbackUrl: string,
  folder: string
): Promise<string> {
  if (!file || file.size === 0) return fallbackUrl;
  return uploadImage(file, file.name, { folder });
}