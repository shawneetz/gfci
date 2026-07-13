import "server-only";
import { put } from "@vercel/blob";

export interface UploadImageOptions {
  folder?: string;
}

export async function uploadImage(
  file: File | Buffer,
  filename: string,
  { folder = "uploads" }: UploadImageOptions = {}
): Promise<string> {
  const blob = await put(`${folder}/${filename}`, file, {
    access: "public",
    addRandomSuffix: true,
  });

  return blob.url;
}