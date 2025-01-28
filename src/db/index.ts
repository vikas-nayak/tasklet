import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";

const pool = new Pool({
  connectionString: "postgresql://neondb_owner:npg_Cem38shDVpdW@ep-dark-mouse-a8dp8smb-pooler.eastus2.azure.neon.tech/neondb?sslmode=require",
  ssl: true,
});

export const db = drizzle(pool);
