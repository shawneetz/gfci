import "server-only";
import { del, put } from "@vercel/blob";

// Image upload and delete helpers for Vercel Blob.
// Browser uploads (File) are validated here; server scripts that pass a Buffer are trusted.
export interface UploadImageOptions {
  folder?: string;
}

export async function uploadImage(
  file: File | Buffer,
  filename: string,
  { folder = "uploads" }: UploadImageOptions = {}
): Promise<string> {
  const isFile = typeof File !== "undefined" && file instanceof File;
  // Only check type and size for browser uploads. Buffers come from our own scripts.
  if (isFile) {
    if (!["image/jpeg", "image/png", "image/webp"].includes(file.type)) {
      throw new Error("Unsupported image type.");
    }
    if (file.size > 4 * 1024 * 1024) throw new Error("Image must be 4 MB or smaller.");
  }
  const blob = await put(`${folder}/${filename}`, file, {
    access: "public",
    addRandomSuffix: true,
  });

  return blob.url;
}

// Deletes a Blob image. Best effort: never throws, and ignores local /images/... paths.
export async function deleteImage(url: string | null | undefined): Promise<void> {
  if (!url || !/^https:\/\/[^/]+\.public\.blob\.vercel-storage\.com\//.test(url)) return;
  try { await del(url); } catch (error) { console.error("deleteImage failed:", error); }
}