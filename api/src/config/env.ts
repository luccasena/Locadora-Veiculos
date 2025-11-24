import { config } from "dotenv";
config();

export const ENV = {
  DATABASE_URL: process.env.DATABASE_URL!,
  SUPABASE_URL_AUTH: process.env.SUPABASE_URL_AUTH!,
  SUPABASE_URL: process.env.SUPABASE_URL!,
  SUPABASE_SERVICE_ROLE_KEY: process.env.SUPABASE_SERVICE_ROLE_KEY!,
};
