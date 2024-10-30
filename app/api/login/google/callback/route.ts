import {
  generateSessionToken,
  createSession,
  setSessionTokenCookie,
} from "@/app/lib/auth";
import { google } from "@/app/lib/auth";
import { cookies } from "next/headers";

import { decodeIdToken, type OAuth2Tokens } from "arctic";
import { createSupabaseClient } from "@/app/lib/supabase-client";
import { generateRandomUsername } from "@/app/lib/utils";

interface claimsInterface {
  sub: string;
  name: string;
  email: string;
  picture: string;
}

export async function GET(request: Request): Promise<Response> {
  const url = new URL(request.url);
  const supabase = createSupabaseClient();
  const code = url.searchParams.get("code");
  const state = url.searchParams.get("state");
  const cookieStore = await cookies();
  const storedState = cookieStore.get("google_oauth_state")?.value ?? null;
  const codeVerifier = cookieStore.get("google_code_verifier")?.value ?? null;
  if (
    code === null ||
    state === null ||
    storedState === null ||
    codeVerifier === null
  ) {
    return new Response(null, {
      status: 400,
    });
  }
  if (state !== storedState) {
    return new Response(null, {
      status: 400,
    });
  }

  let tokens: OAuth2Tokens;
  try {
    tokens = await google.validateAuthorizationCode(code, codeVerifier);
  } catch (e) {
    // Invalid code or client credentials
    return new Response(null, {
      status: 400,
    });
  }
  const claims = decodeIdToken(tokens.idToken()) as claimsInterface;

  const googleUserId = claims.sub;
  const full_name = claims.name;
  const email = claims.email;
  const avatar_url = claims.picture;

  const { data, error } = await supabase
    .from("users")
    .select("*")
    .eq("google_id", googleUserId);

  const existingUser = data![0];

  if (existingUser) {
    const sessionToken = generateSessionToken();
    const session = await createSession(sessionToken, existingUser.id);
    await setSessionTokenCookie(sessionToken, session!.expiresAt);
    return new Response(null, {
      status: 302,
      headers: {
        Location: "/",
      },
    });
  }
  const username: string = await generateRandomUsername();
  const { data: data1, error: error1 } = await supabase
    .from("users")
    .insert({ email, full_name, google_id: googleUserId, avatar_url, username })
    .select();

  const sessionToken = generateSessionToken();
  const session = await createSession(sessionToken, data1![0].id);
  await setSessionTokenCookie(sessionToken, session!.expiresAt);
  return new Response(null, {
    status: 302,
    headers: {
      Location: "/",
    },
  });
}
