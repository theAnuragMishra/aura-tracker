"use server";
import bcrypt from "bcrypt";
import { createSupabaseClient } from "./supabase-client";
import { redirect } from "next/navigation";
import { generateRandomUsername } from "./utils";
import {
  generateSessionToken,
  createSession,
  setSessionTokenCookie,
} from "./auth";

export async function handleLogin(data: FormData) {
  const supabase = createSupabaseClient();

  const email = data.get("email");
  const password = data.get("password");

  const { data: userData, error } = await supabase
    .from("users")
    .select("password_hash, id")
    .eq("email", email);

  if (error) {
    return "Unexpected error";
  }

  const password_hash = userData[0].password_hash;

  if (typeof password === "string" && password.trim() !== "") {
    const match = await bcrypt.compare(password, password_hash);
    if (match) {
      const token = generateSessionToken();
      const session = await createSession(token, userData[0].id);
      if (session) {
        await setSessionTokenCookie(token, session!.expiresAt);
        redirect("/");
      } else {
        return "error logging in";
      }
    } else {
      return "Invalid email and password pair";
    }
  } else {
    return "Enter password";
  }
}

export async function handleSignup(data: FormData) {
  // console.log(data.get("email"));
  // console.log(data.get("password"));
  // console.log(data.get("role"));

  // console.log(typeof data.get("password"));

  const email = data.get("email");
  const password = data.get("password");
  const role = data.get("role");
  const username: string = await generateRandomUsername();

  if (typeof password === "string" && password.trim() !== "") {
    const password_hash = await bcrypt.hash(password, 10);
    const supabase = createSupabaseClient();
    const { error } = await supabase
      .from("users")
      .insert({ email, password_hash, role, username });

    if (error) {
      console.error(error);
      return "Error signing up, try again";
    }
    redirect("/login");
  } else {
    return "Password is required and cannot be empty.";
  }
}
