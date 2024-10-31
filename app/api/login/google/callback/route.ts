import {
  generateSessionToken,
  createSession,
  setSessionTokenCookie,
} from "@/lib/auth";

import jwt from "jsonwebtoken";

import { google } from "@/lib/auth";
import { cookies } from "next/headers";

import { decodeIdToken, type OAuth2Tokens } from "arctic";
import { createClient } from "@supabase/supabase-js";

import { generateRandomUsername } from "@/lib/utils";

interface claimsInterface {
  sub: string;
  name: string;
  email: string;
  picture: string;
}

export async function GET(request: Request): Promise<Response> {
  const url = new URL(request.url);

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
    console.error(e);
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

  const token = jwt.sign(
    { google_id: googleUserId },
    process.env.SUPABASE_JWT_SECRET!,
    { expiresIn: "10m" }
  );
  const supabase_google = createClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_ANON_KEY!,
    {
      global: {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    }
  );

  const { data, error } = await supabase_google
    .from("users")
    .select("*")
    .eq("google_id", googleUserId);

  if (error) {
    console.error("88" + error);
  }

  const existingUser = data![0];

  if (existingUser) {
    const token_id = jwt.sign(
      { user_id: existingUser.id },
      process.env.SUPABASE_JWT_SECRET!,
      {
        expiresIn: "10m",
      }
    );
    const sessionToken = generateSessionToken();
    const session = await createSession(
      token_id,
      sessionToken,
      existingUser.id
    );
    await setSessionTokenCookie(sessionToken, session!.expiresAt);
    return new Response(null, {
      status: 302,
      headers: {
        Location: "/",
      },
    });
  }

  const username: string = await generateRandomUsername();
  const { data: data1, error: error1 } = await supabase_google
    .from("users")
    .insert({
      email,
      google_id: googleUserId,
      raw_user_meta_data: { username, avatar_url, full_name },
    })
    .select();

  if (error1) {
    console.error("error1" + error);
  }
  const token_id = jwt.sign(
    { user_id: data1![0].id },
    process.env.SUPABASE_JWT_SECRET!,
    {
      expiresIn: "10m",
    }
  );
  const sessionToken = generateSessionToken();
  const session = await createSession(token_id, sessionToken, data1![0].id);
  await setSessionTokenCookie(sessionToken, session!.expiresAt);
  return new Response(null, {
    status: 302,
    headers: {
      Location: "/",
    },
  });
}
