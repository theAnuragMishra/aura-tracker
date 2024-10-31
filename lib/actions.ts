"use server";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { createSupabaseClient } from "./supabase-client";
import { redirect } from "next/navigation";
import { generateRandomUsername, validatePassword } from "./utils";
import {
  generateSessionToken,
  createSession,
  setSessionTokenCookie,
  getCurrentSession,
  invalidateSession,
  deleteSessionTokenCookie,
} from "./auth";
import { createClient } from "@supabase/supabase-js";

export async function handleLogin(email: string, password: string) {
  const token = jwt.sign({ email }, process.env.SUPABASE_JWT_SECRET!, {
    expiresIn: "10m",
  });
  const supabase_jwt = createClient(
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

  const { data: userData, error } = await supabase_jwt
    .from("users")
    .select("password_hash, id")
    .eq("email", email);

  if (error) {
    console.error(error);
    throw new Error("Unexpected error");
  }

  const password_hash = userData[0].password_hash;
  const id = userData[0].id;

  const match = await bcrypt.compare(password, password_hash);
  if (match) {
    const token_id = jwt.sign({ user_id: id }, process.env.SUPABASE_JWT_SECRET!, {
      expiresIn: "10m",
    });


    const session_token = generateSessionToken();
    const session = await createSession(
      token_id,
      session_token,
      userData[0].id
    );
    if (session) {
      await setSessionTokenCookie(session_token, session!.expiresAt);
    } else {
      throw new Error("Unexpected error");
    }
  } else {
    throw new Error("Invalid email and password pair");
  }
}

export async function handleSignup(
  email: string,
  role: string,
  password: string
) {
  if (!validatePassword(password)) {
    throw new Error(
      "Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, one number, and one special character."
    );
  }
  let username;
  try {
    username = await generateRandomUsername();
  } catch (error) {
    if (error instanceof Error) {
      throw new Error("couldn't generate a username");
    }
  }

  const password_hash = await bcrypt.hash(password, 10);
  const supabase = createSupabaseClient();
  const { error } = await supabase.from("users").insert({
    email,
    password_hash,
    raw_user_meta_data: {
      username,
      role,
    },
  });

  if (error) {
    throw new Error("Error signing up, try again");
  }
}

export async function handleLogout() {
  const { session } = await getCurrentSession();
  if (!session) {
    return {
      error: "Unauthorized",
    };
  }

  await invalidateSession(session.id);
  await deleteSessionTokenCookie();
  return redirect("/login");
}
