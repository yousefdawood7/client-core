/**
 * Seed script for client-core
 * -----------------------------------------------------------------------
 * Populates the database with demo data: the 4 "quick login" users from
 * src/features/auth/constants.ts (Admin / David / Sarah / Alex), a few
 * extra teammates, companies, leads, history log entries and assignment
 * (handoff) records.
 *
 * Users are created through Better Auth's admin plugin
 * (`auth.api.createUser`, see https://better-auth.com/docs/plugins/admin)
 * rather than by hand-hashing passwords, so seeded accounts are created
 * exactly the way the app itself would create them, roles included.
 *
 * This script builds its own minimal Better Auth instance (reusing the
 * app's real access-control/roles from src/lib/better-auth/permissions)
 * instead of importing src/lib/better-auth/auth.ts directly, because
 * that file starts with `import "server-only"`, which throws outside of
 * Next.js's bundler (it only works there via a build-time shim) — and it
 * also pulls in Resend/email config that a seed script doesn't need.
 *
 * Usage:
 *   npx tsx prisma/seed.ts
 *   (or: npx prisma db seed  -- see package.json/prisma.config.ts wiring)
 *
 * Requires DATABASE_URL and BETTER_AUTH_SECRET to be set (e.g. via .env)
 * and the schema to be migrated already: `npx prisma migrate dev`.
 * -----------------------------------------------------------------------
 */
import { prismaAdapter } from "@better-auth/prisma-adapter";
import { PrismaPg } from "@prisma/adapter-pg";
import { betterAuth } from "better-auth";
import { admin as adminPlugin } from "better-auth/plugins";

import "dotenv/config";
import { Action, PrismaClient, Status } from "../generated/prisma";
import { ac, admin, head, sales, agent } from "../src/lib/better-auth/permissions";

const prisma = new PrismaClient({
  adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL }),
});

if (!process.env.BETTER_AUTH_SECRET) {
  throw new Error(
    "BETTER_AUTH_SECRET is not set. Add it to your .env before seeding.",
  );
}

// A seeding-only Better Auth instance. It mirrors the real role/permission
// setup from src/lib/better-auth/auth.ts (same `ac`/roles, same Prisma
// adapter) but skips everything server-request-specific (nextCookies,
// email-OTP/Resend, the isEmailExist hook) that this script doesn't need.
const seedAuth = betterAuth({
  database: prismaAdapter(prisma, { provider: "postgresql" }),
  secret: process.env.BETTER_AUTH_SECRET,
  emailAndPassword: { enabled: true },
  plugins: [adminPlugin({ ac, roles: { admin, head, sales, agent } })],
});

// ---------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------

async function createUser({
  name,
  email,
  password,
  role,
}: {
  name: string;
  email: string;
  password: string;
  // Matches the roles registered with the admin plugin in auth.ts.
  // Leave undefined for plain "agent" users (defaults to better-auth's
  // built-in "user" role).
  role?: "admin" | "head" | "sales" | "agent" | null;
}) {
  const { user } = await seedAuth.api.createUser({
    body: { email, password, name, role: role || undefined },
  });

  // auth.api.createUser doesn't mark the email verified; seeded demo
  // accounts should behave like normal verified users in the app.
  return prisma.user.update({
    where: { id: user.id },
    data: { emailVerified: true },
  });
}

function randomFrom<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

// ---------------------------------------------------------------------
// Seed
// ---------------------------------------------------------------------

async function main() {
  console.log("Seeding database...");

  // -- Clean slate (order matters because of FK constraints) -----------
  await prisma.assignment.deleteMany();
  await prisma.history.deleteMany();
  await prisma.lead.deleteMany();
  await prisma.userCompanies.deleteMany();
  await prisma.company.deleteMany();
  await prisma.session.deleteMany();
  await prisma.account.deleteMany();
  await prisma.verification.deleteMany();
  await prisma.user.deleteMany();

  // -- Users -------------------------------------------------------------
  // The 4 "quick login" demo profiles shown on the login screen
  // (src/features/auth/constants.ts -> QUICK_PROFILES) plus a couple of
  // extra teammates so the data set isn't razor-thin.
  const adminUser = await createUser({
    name: "Admin",
    email: "admin@company.com",
    password: "adminpassword123",
    role: "admin",
  });

  const david = await createUser({
    name: "David",
    email: "david@crmpro.com",
    password: "davidpassword123",
    role: "head",
  });

  const sarah = await createUser({
    name: "Sarah Chen",
    email: "sarah@crmpro.com",
    password: "sarahpassword123",
    role: "sales",
  });

  const marcus = await createUser({
    name: "Marcus Rodriguez",
    email: "marcus@crmpro.com",
    password: "marcuspassword123",
    role: "sales",
  });

  const alex = await createUser({
    name: "Alex",
    email: "alex@crmpro.com",
    password: "alexpassword123",
    role: "agent",
  });

  const priya = await createUser({
    name: "Priya Patel",
    email: "priya@crmpro.com",
    password: "priyapassword123",
    role: "agent",
  });

  const jordan = await createUser({
    name: "Jordan Lee",
    email: "jordan@crmpro.com",
    password: "jordanpassword123",
    role: "agent",
  });

  const agents = [alex, priya, jordan];

  console.log(
    `Created ${[adminUser, david, sarah, marcus, alex, priya, jordan].length} users`,
  );

  // -- Companies -----------------------------------------------------
  const companyDefs = [
    { name: "TechVision Solutions", manager: sarah },
    { name: "Global Commerce Ltd", manager: marcus },
    { name: "Nexus Retail Group", manager: sarah },
    { name: "Prime Digital Agency", manager: marcus },
    { name: "Apex Market Partners", manager: sarah },
  ];

  const companies = [];
  for (const def of companyDefs) {
    const company = await prisma.company.create({
      data: {
        name: def.name,
        userId: def.manager.id,
      },
    });
    companies.push({ ...company, manager: def.manager });
  }
  console.log(`Created ${companies.length} companies`);

  // -- Team membership (UserCompanies) --------------------------------
  // Admin + David sit on every company (oversight). Each company's sales
  // manager plus 1-2 agents are assigned as the working team.
  for (const company of companies) {
    const teamAgents = [randomFrom(agents), randomFrom(agents)];
    const memberIds = new Set([
      adminUser.id,
      david.id,
      company.manager.id,
      ...teamAgents.map((a) => a.id),
    ]);

    await prisma.userCompanies.createMany({
      data: [...memberIds].map((userId) => ({
        userId,
        companyId: company.id,
      })),
      skipDuplicates: true,
    });
  }
  console.log("Linked users to companies");

  // -- Leads -----------------------------------------------------------
  const statuses = Object.values(Status);
  const leadNames = [
    "Website inquiry",
    "Referral lead",
    "Trade show contact",
    "Cold outreach",
    "Inbound call",
    "LinkedIn connection",
  ];

  let leadCount = 0;
  const allLeads: { id: string; companyId: string; agentId: string | null; status: Status }[] =
    [];

  for (const company of companies) {
    const numLeads = 3 + Math.floor(Math.random() * 4); // 3-6 leads
    for (let i = 0; i < numLeads; i++) {
      const agent = randomFrom(agents);
      const lead = await prisma.lead.create({
        data: {
          status: randomFrom(statuses) as Status,
          companyId: company.id,
          agentId: agent.id,
        },
      });
      allLeads.push(lead);
      leadCount++;

      await prisma.history.create({
        data: {
          action: Action.create,
          entity: "Lead",
          oldValue: null,
          newValue: `${leadNames[i % leadNames.length]} created for ${company.name}, assigned to ${agent.name}`,
          userId: agent.id,
        },
      });
    }
  }
  console.log(`Created ${leadCount} leads (+ history entries)`);

  // -- A few extra history log entries (edits) --------------------------
  for (const lead of allLeads.slice(0, 5)) {
    const editor = randomFrom(agents);
    const newStatus = randomFrom(statuses);
    await prisma.history.create({
      data: {
        action: Action.update,
        entity: "Lead",
        oldValue: lead.status,
        newValue: newStatus,
        userId: editor.id,
      },
    });
  }

  // -- Assignments (company handoffs between agents) --------------------
  let assignmentCount = 0;
  for (const company of companies.slice(0, 3)) {
    const [from, to] = [randomFrom(agents), randomFrom(agents)];
    if (from.id === to.id) continue;

    await prisma.assignment.create({
      data: {
        companyId: company.id,
        assignmentUserId: from.id,
        receivedUserId: to.id,
        userId: david.id, // created/approved by the head
      },
    });

    await prisma.history.create({
      data: {
        action: Action.create,
        entity: "Company",
        oldValue: from.name,
        newValue: to.name,
        userId: david.id,
      },
    });
    assignmentCount++;
  }
  console.log(`Created ${assignmentCount} assignments`);

  console.log("\nSeed complete. Demo logins:");
  console.table([
    { role: "Admin", email: "admin@company.com", password: "adminpassword123" },
    { role: "Head", email: "david@crmpro.com", password: "davidpassword123" },
    { role: "Sales", email: "sarah@crmpro.com", password: "sarahpassword123" },
    { role: "Agent", email: "alex@crmpro.com", password: "alexpassword123" },
  ]);
}

main()
  .catch((e) => {
    console.error(e);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
