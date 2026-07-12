// prisma.config.ts
import "dotenv/config";
import { defineConfig, env } from "prisma/config";

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
    seed: "tsx prisma/seed.ts",
  },
  datasource: {
    // CLI operations (migrate, studio, seed) need a direct connection —
    // PgBouncer's pooled connection can't run schema migrations.
    url: env("DIRECT_URL"),
  },
});