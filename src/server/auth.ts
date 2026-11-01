import { auth } from "@/auth";

export async function requireAdmin(): Promise<{ id: string; email?: string | null }> {
  const session = await auth();
  if (!session?.user?.id) {
    throw new Error("Unauthorized");
  }
  return { id: session.user.id, email: session.user.email };
}
