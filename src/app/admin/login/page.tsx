import { redirect } from "next/navigation";
import { auth, signIn, AuthError } from "@/auth";

import { Container } from "@/components/ui/container";
import { Panel } from "@/components/ui/panel";
import { FieldLabel } from "@/components/ui/field-label";
import { TextField } from "@/components/ui/text-field";
import { Button } from "@/components/ui/button";
import { FormStatusBanner } from "@/components/ui/form-status-banner";

interface AdminLoginPageProps {
  searchParams: Promise<{ error?: string; callbackUrl?: string }>;
}

export default async function AdminLoginPage({ searchParams }: AdminLoginPageProps) {
  const { error, callbackUrl } = await searchParams;
  const target = callbackUrl?.startsWith("/admin") ? callbackUrl : "/admin";

  // Already signed in — no reason to show the form again.
  const session = await auth();
  if (session?.user) redirect(target);

  async function login(formData: FormData) {
    "use server";

    try {
      await signIn("credentials", {
        email: formData.get("email"),
        password: formData.get("password"),
        redirectTo: formData.get("target") as string,
      });
    } catch (err) {
      // signIn() itself throws a redirect on success — that must keep
      // propagating untouched. Only a genuine AuthError (bad email or
      // password) should be caught and turned into a friendly message.
      if (err instanceof AuthError) {
        const params = new URLSearchParams({ error: "invalid", callbackUrl: target });
        redirect(`/admin/login?${params.toString()}`);
      }
      throw err;
    }
  }

  return (
    <section className="flex min-h-dvh items-center justify-center bg-surface-alt px-6">
      <Container className="max-w-sm px-0">
        <Panel>
          <h1 className="text-section-title text-ink">Admin Sign In</h1>
          <p className="mt-2 text-body-sm text-ink-secondary">Golden Faith staff access only.</p>

          {error && (
            <FormStatusBanner status="error" message="Incorrect email or password." className="mt-6" />
          )}

          <form action={login} className="mt-6 space-y-5">
            <input type="hidden" name="target" value={target} />

            <div>
              <FieldLabel>Email</FieldLabel>
              <TextField
                type="email"
                name="email"
                placeholder="you@goldenfaith.church"
                autoComplete="username"
                required
              />
            </div>

            <div>
              <FieldLabel>Password</FieldLabel>
              <TextField type="password" name="password" autoComplete="current-password" required />
            </div>

            <Button type="submit" fill="brand" text="inverse" border="brand" shadow="grey" className="w-full">
              Sign In
            </Button>
          </form>
        </Panel>
      </Container>
    </section>
  );
}