"use server";

import { revalidatePath } from "next/cache";
import { getCurrentSession } from "./auth";
import { createSupabaseClientJWT } from "./supabase-client";

export async function saveName(name: string) {
  const { user } = await getCurrentSession();
  const supabase = await createSupabaseClientJWT();
  const { error } = await supabase
    .from("profiles")
    .update({ full_name: name })
    .eq("id", user!.id);
  if (error) {
    console.error(error);
  }
  revalidatePath("/profile");
  revalidatePath("/leaderboard");
}

export async function saveUserName(username: string) {
  if (!username) return;
  const { user } = await getCurrentSession();
  const supabase = await createSupabaseClientJWT();

  const { data, error } = await supabase
    .from("profiles")
    .select("")
    .eq("username", username);

  if (error) {
    throw new Error("error saving username");
  }

  if (data[0]) {
    throw new Error("username taken!");
  }

  const { error: saveError } = await supabase
    .from("profiles")
    .update({ username })
    .eq("id", user!.id);
  if (saveError) {
    console.error(saveError);
  }
  revalidatePath("/profile");
  revalidatePath("/leaderboard");
}

export async function uploadAvatar(filePath: string, file: File) {
  const { user } = await getCurrentSession();

  const supabase = await createSupabaseClientJWT();
  const { error: uploadError } = await supabase.storage
    .from("avatars")
    .upload(filePath, file);

  const { data, error } = await supabase.storage
    .from("avatars")
    .createSignedUrl(filePath, 60 * 60 * 24 * 365);

  if (error) {
    console.error(error);
  }

  const { error: updateError } = await supabase
    .from("profiles")
    .update({ avatar_url: data?.signedUrl })
    .eq("id", user!.id);

  if (updateError) {
    console.error(updateError);
  }

  if (uploadError) {
    throw uploadError;
  }

  revalidatePath("/profile");
}
