import { createClient } from "@supabase/supabase-js"

// Note: This client should only be used in server-side contexts (API routes, Server Actions)
// as it uses the service role key which has admin privileges.
export const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  },
)
