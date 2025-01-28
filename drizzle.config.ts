import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  schema: './src/db/schema.ts',   // Path to your schema
  out: './drizzle',             // Path to output migrations
  dialect: 'postgresql',        // Specify PostgreSQL dialect
  dbCredentials: {
    host: 'ep-dark-mouse-a8dp8smb-pooler.eastus2.azure.neon.tech',  // Neon host
    user: 'neondb_owner',       // Your username
    password: 'npg_Cem38shDVpdW', // Your password
    database: 'neondb',          // Your database name
    port: 5432,                 // Default PostgreSQL port
    ssl: { rejectUnauthorized: false },  // For SSL connection (Neon requires this)
  },
});

//jab pura url ek saath de raha tha to error aa raha tha mkc, alag alag diya to chal gaya ಥ_ಥ
