import {
  encodeBase32LowerCaseNoPadding,
  encodeHexLowerCase,
} from "@oslojs/encoding";
import { sha256 } from "@oslojs/crypto/sha2";
import { cookies } from "next/headers";
import { cache } from "react";

import { createSupabaseClient } from "./supabase-client";

export function generateSessionToken(): string {
  const bytes = new Uint8Array(20);
  crypto.getRandomValues(bytes);
  const token = encodeBase32LowerCaseNoPadding(bytes);
  return token;
}

export async function createSession(
  token: string,
  userId: number
): Promise<Session | void> {
  const supabase = createSupabaseClient();
  const sessionId = encodeHexLowerCase(sha256(new TextEncoder().encode(token)));
  const session: Session = {
    id: sessionId,
    userId,
    expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30),
  };

  const { error } = await supabase.from("user_sessions").insert({
    id: session.id,
    user_id: session.userId,
    expires_at: session.expiresAt,
  });
  if (error) {
    console.log("error while creating session");
    return;
  }
  return session;
}

export async function validateSessionToken(
  token: string
): Promise<SessionValidationResult> {
  const sessionId = encodeHexLowerCase(sha256(new TextEncoder().encode(token)));
  const supabase = createSupabaseClient();
  const { data, error } = await supabase
    .from("user_sessions")
    .select("id, user_id, expires_at, users!inner(id)")
    .eq("id", sessionId);
  console.log("validated data");
  console.log(data);

  if (data![0] === null) {
    return { session: null, user: null };
  }
  const session: Session = {
    id: data![0].id,
    userId: data![0].user_id,
    expiresAt: new Date(data![0].expires_at * 1000),
  };
  const user: User = {
    id: data![0].users.id,
  };
  if (Date.now() >= session.expiresAt.getTime()) {
    const { error } = await supabase
      .from("user_sessions")
      .delete()
      .eq("id", session.id);

    return { session: null, user: null };
  }
  if (Date.now() >= session.expiresAt.getTime() - 1000 * 60 * 60 * 24 * 15) {
    session.expiresAt = new Date(Date.now() + 1000 * 60 * 60 * 24 * 30);

    const { error } = await supabase
      .from("user_sessions")
      .update({ expires_at: session.expiresAt })
      .eq("id", session.id);
  }
  return { session, user };
}
export const getCurrentSession = cache(
  async (): Promise<SessionValidationResult> => {
    const cookieStore = await cookies();
    const token = cookieStore.get("session")?.value ?? null;
    if (token === null) {
      console.log("no token for current session");
      return { session: null, user: null };
    }
    const result = await validateSessionToken(token);
    return result;
  }
);
export async function invalidateSession(sessionId: string): Promise<void> {
  const supabase = createSupabaseClient();
  const { error } = await supabase
    .from("user_sessions")
    .delete()
    .eq("id", sessionId);
}

export async function setSessionTokenCookie(
  token: string,
  expiresAt: Date
): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.set("session", token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    expires: expiresAt,
    path: "/",
  });
}

export async function deleteSessionTokenCookie(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.set("session", "", {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    maxAge: 0,
    path: "/",
  });
}

export type SessionValidationResult =
  | { session: Session; user: User }
  | { session: null; user: null };

export interface Session {
  id: string;
  userId: number;
  expiresAt: Date;
}

export interface User {
  id: number;
}
