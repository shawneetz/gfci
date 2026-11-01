import { ValidationError } from "@/server/validation";

// Shared result type for admin mutations, plus the one error handler
// every mutation's catch block should use.
export interface MutationResult {
  success: boolean;
  error?: string;
}

// Turns any thrown error into a safe, readable MutationResult.
export function toErrorResult(error: unknown, fallback = "Something went wrong. Please try again."): MutationResult {
  // Validation messages are written for staff, so show them as-is.
  if (error instanceof ValidationError) return { success: false, error: error.message };

  // Thrown by requireAdmin() when the session is missing or expired.
  if (error instanceof Error && error.message === "Unauthorized") return { success: false, error: "Please sign in again." };

  // Known database errors (Prisma error codes).
  if (error && typeof error === "object" && "code" in error) {
    const code = (error as { code?: string }).code;
    if (code === "P2002") return { success: false, error: "That value is already in use." };
    if (code === "P2003") return { success: false, error: "This item is still in use." };
  }

  // Anything else is unexpected: log it, show the generic message.
  console.error(error);
  return { success: false, error: fallback };
}