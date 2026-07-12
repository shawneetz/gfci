// Browser-only helper for the Phase 15 admin upload forms — resizes an
// image client-side before it's sent to uploadImage() (src/lib/storage.ts),
// so a staffer uploading a full-resolution phone photo doesn't quietly
// balloon page weight. Policy: max 1600px on the longest side, re-encoded
// as JPEG at 85% quality. Not called anywhere yet (no admin UI exists
// until Phase 15) — this is the agreed policy, implemented ahead of time
// so those forms just call it rather than each reinventing resize logic.
//
// Relies on browser-only APIs (createImageBitmap, canvas), so this must
// only be called from a "use client" component — it will throw if called
// during server rendering.

const MAX_DIMENSION = 1600;
const JPEG_QUALITY = 0.85;

export async function resizeImageFile(file: File): Promise<File> {
  const bitmap = await createImageBitmap(file);

  const scale = Math.min(1, MAX_DIMENSION / Math.max(bitmap.width, bitmap.height));

  // No resize needed — return the original file untouched rather than
  // re-encoding (and losing quality) for no size benefit.
  if (scale === 1) return file;

  const targetWidth = Math.round(bitmap.width * scale);
  const targetHeight = Math.round(bitmap.height * scale);

  const canvas = document.createElement("canvas");
  canvas.width = targetWidth;
  canvas.height = targetHeight;

  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Canvas 2D context unavailable — cannot resize image.");
  ctx.drawImage(bitmap, 0, 0, targetWidth, targetHeight);

  const blob = await new Promise<Blob | null>((resolve) =>
    canvas.toBlob(resolve, "image/jpeg", JPEG_QUALITY)
  );
  if (!blob) throw new Error("Failed to encode resized image.");

  const resizedName = file.name.replace(/\.\w+$/, ".jpg");
  return new File([blob], resizedName, { type: "image/jpeg" });
}