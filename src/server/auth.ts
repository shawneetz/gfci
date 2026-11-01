import "server-only";
import { auth } from "@/auth";

// Admin guard used as the first line of every admin Server Action.
// Server Actions are public endpoints, so the layout redirect alone does not protect them.
export async function requireAdmin(): Promise<{ email?: string | null }> {
  const session = await auth();

  // Only check that a user exists. The session has no `id` field unless a callback adds one.
  if (!session?.user) {
    throw new Error("Unauthorized");
  }

  return { email: session.user.email };
}
