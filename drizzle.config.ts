import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  schema: './src/db/schema.ts',
  out: './drizzle',
  dialect: 'postgresql',
  dbCredentials: {
    host: 'ep-dark-mouse-a8dp8smb-pooler.eastus2.azure.neon.tech',
    user: 'neondb_owner',
    password: process.env.DB_PASSWORD, // hacker ki mkc
    database: 'neondb',
    port: 5432,
    ssl: { rejectUnauthorized: false },
  },
});

//jab pura url ek saath de raha tha to error aa raha tha mkc, alag alag diya to chal gaya ಥ_ಥ
