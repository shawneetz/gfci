// One-off CLI for creating (or resetting the password of) an admin
// account. There is deliberately no public sign-up route — admin users
// are only ever created this way, by someone with direct database
// access.
//
// Usage:
//   npm run admin:create -- "admin@goldenfaith.church" "a-strong-password" "Admin Name"

import "dotenv/config";
import bcrypt from "bcryptjs";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../src/generated/prisma/client";

const adapter = new PrismaPg({ connectionString: process.env.DIRECT_URL });
const prisma = new PrismaClient({ adapter });

const HASH_COST = 12;
const MIN_PASSWORD_LENGTH = 12;

async function main() {
  const [, , email, password, name] = process.argv;

  if (!email || !password || !name) {
    console.error('Usage: npm run admin:create -- "<email>" "<password>" "<name>"');
    process.exit(1);
  }

  if (password.length < MIN_PASSWORD_LENGTH) {
    console.error(`Password must be at least ${MIN_PASSWORD_LENGTH} characters.`);
    process.exit(1);
  }

  const passwordHash = await bcrypt.hash(password, HASH_COST);

  const user = await prisma.adminUser.upsert({
    where: { email },
    update: { passwordHash, name },
    create: { email, passwordHash, name },
  });

  console.log(`✅ Admin user ready: ${user.email}`);
}

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });