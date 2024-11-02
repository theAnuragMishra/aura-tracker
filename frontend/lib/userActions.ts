"use server"

import { getCurrentSession } from "./auth";
import { createSupabaseClientJWT } from "./supabase-client";
import { revalidatePath } from "next/cache";

export async function handleRoleChange(role: string) {
  const { user } = await getCurrentSession();

  const supabase = await createSupabaseClientJWT();
  const { error: error1 } = await supabase.from("profiles").update({ role }).eq("id", user!.id);
  const { error: error2 } = await supabase.from("profiles").update({ role }).eq("id", user!.id);

  if (error1 || error2) {
    throw new Error("error setting role")
  }

  revalidatePath("/profile")
}
