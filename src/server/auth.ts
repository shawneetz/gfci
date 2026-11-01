import "server-only";
import { auth } from "@/auth";

export async function requireAdmin(): Promise<{ email?: string | null }> {
  const session = await auth();
  if (!session?.user) {
    throw new Error("Unauthorized");
  }
  return { email: session.user.email };
}
