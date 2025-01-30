import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  schema: './src/db/schema.ts',
  out: './drizzle',
  dialect: 'postgresql',
  dbCredentials: {
    host: 'ep-plain-dream-a8wi833s-pooler.eastus2.azure.neon.tech',
    user: 'neondb_owner',
    password:process.env.DB_PASS, // password from URL
    database: 'neondb',
    port: 5432,
    ssl: { rejectUnauthorized: false }, // for sslmode=require
  },
});
