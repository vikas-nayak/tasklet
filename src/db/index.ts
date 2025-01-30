import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";

const pool = new Pool({
  connectionString: "postgresql://neondb_owner:npg_FYCxOkb6B2mj@ep-plain-dream-a8wi833s-pooler.eastus2.azure.neon.tech/neondb?sslmode=require",
  ssl: true,
});

export const db = drizzle(pool);
