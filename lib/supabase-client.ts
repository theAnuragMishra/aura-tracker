import { createClient } from "@supabase/supabase-js";
import jwt from "jsonwebtoken";
import { getCurrentSession } from "./auth";

export function createSupabaseClient() {
  return createClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_ANON_KEY!
  );
}

export async function createSupabaseClientJWT() {
  const { user } = await getCurrentSession();
  return createClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_ANON_KEY!,
    {
      global: {
        fetch: async (url, options = {}) => {
          const token = jwt.sign(
            { id: user!.id },
            process.env.SUPABASE_JWT_SECRET!,
            { expiresIn: "10m" }
          );
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
