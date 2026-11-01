export interface MutationResult {
  success: boolean;
  error?: string;
}

export function toErrorResult(error: unknown, fallback = "Something went wrong. Please try again."): MutationResult {
  if (error instanceof Error && error.message === "Unauthorized") return { success: false, error: "Unauthorized." };
  if (error && typeof error === "object" && "code" in error) {
    const code = (error as { code?: string }).code;
    if (code === "P2002") return { success: false, error: "That value is already in use." };
    if (code === "P2003") return { success: false, error: "This item is still in use." };
  }
  console.error(error);
  return { success: false, error: fallback };
}