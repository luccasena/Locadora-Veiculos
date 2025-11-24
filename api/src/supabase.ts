import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";
import { ENV } from "./config/env";

dotenv.config();

export const supabase = createClient(
  ENV.SUPABASE_URL_AUTH,
  ENV.SUPABASE_SERVICE_ROLE_KEY,
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  }
);
