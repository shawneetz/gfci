import "server-only";
import NextAuth, { AuthError } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

import { prisma } from "@/lib/prisma";

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  pages: {
    signIn: "/admin/login",
  },

  // Helps avoid "UntrustedHost" errors across different hosting setups.
  // Safe here — this is an internal admin tool, not a multi-tenant app.
  trustHost: true,

  session: { strategy: "jwt", maxAge: 7 * 24 * 60 * 60 },

  callbacks: {
    authorized({ auth, request }) {
      // The login page is always reachable — it checks the session
      // itself and redirects away if you're already signed in.
      if (request.nextUrl.pathname === "/admin/login") return true;

      // Everything else under /admin requires a session.
      return !!auth?.user;
    },
  },

  providers: [
    Credentials({
      credentials: {
        email: { type: "email" },
        password: { type: "password" },
      },
      async authorize(credentials) {
        const email = credentials?.email;
        const password = credentials?.password;

        if (typeof email !== "string" || typeof password !== "string") {
          return null;
        }

        const user = await prisma.adminUser.findUnique({ where: { email } });
        if (!user) return null;

        const passwordMatches = await bcrypt.compare(password, user.passwordHash);
        if (!passwordMatches) return null;

        return { id: user.id, email: user.email, name: user.name };
      },
    }),
  ],
});

export { AuthError };