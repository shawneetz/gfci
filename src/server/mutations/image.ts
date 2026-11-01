import "server-only";
import { deleteImage, uploadImage } from "@/lib/storage";

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

export async function replaceImage(file: File | null, oldUrl: string | null, folder: string): Promise<{ url: string; oldUrl: string | null }> {
  if (!file || file.size === 0) return { url: oldUrl ?? "", oldUrl: null };
  return { url: await uploadImage(file, file.name, { folder }), oldUrl };
}

export { deleteImage };