import { createClient } from "@supabase/supabase-js";

export function createSupabaseClient() {
  return createClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_ANON_KEY!
  );
}

export function createSupabaseClientJWT() {
  return createClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_ANON_KEY!,
    {
      global: {
        fetch: async (url, options = {}) => {
          const token = "abcd";
          const headers = new Headers(options?.headers);
          headers.set("Authorization", `Bearer ${token}`);

          return fetch(url, {
            ...options,
            headers,
          });
        },
      },
    }
  );
}
