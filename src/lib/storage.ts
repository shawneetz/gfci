import "server-only";
import { del, put } from "@vercel/blob";

export interface UploadImageOptions {
  folder?: string;
}

export async function uploadImage(
  file: File | Buffer,
  filename: string,
  { folder = "uploads" }: UploadImageOptions = {}
): Promise<string> {
  const isFile = typeof File !== "undefined" && file instanceof File;
  if (!["image/jpeg", "image/png", "image/webp"].includes(isFile ? file.type : "")) {
    throw new Error("Unsupported image type.");
  }
  if (isFile && file.size > 4 * 1024 * 1024) throw new Error("Image must be 4 MB or smaller.");
  const blob = await put(`${folder}/${filename}`, file, {
    access: "public",
    addRandomSuffix: true,
  });

  return blob.url;
}

export async function deleteImage(url: string | null | undefined): Promise<void> {
  if (!url || !/^https:\/\/[^/]+\.public\.blob\.vercel-storage\.com\//.test(url)) return;
  try { await del(url); } catch (error) { console.error("deleteImage failed:", error); }
}