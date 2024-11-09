"use server";

import { revalidatePath } from "next/cache";
import { getCurrentSession } from "./auth";
import { createSupabaseClient } from "./supabase-client";

export async function addGoal(goal: string, priority: string) {
  const supabase = createSupabaseClient();
  const { user } = await getCurrentSession();

  const { error } = await supabase
    .from("goals")
    .insert({ goal_text: goal, priority, student_id: user!.id });

  if (error) {
    console.error(error);
  }

  revalidatePath("/goals");
}

export async function deleteGoal(id: number) {
  const supabase = createSupabaseClient();

  const { error } = await supabase.from("goals").delete().eq("id", id);
  if (error) {
    console.error(error);
  }

  revalidatePath("/goals");
}

export async function toggleGoalCompletion(id: number, completed: boolean) {
  const supabase = createSupabaseClient();
  if (!completed) {
    const { error } = await supabase
      .from("goals")
      .update({ completed_at: new Date() })
      .eq("id", id);

    if (error) {
      console.error(error);
    }
  } else {
    const { error } = await supabase
      .from("goals")
      .update({ completed_at: null })
      .eq("id", id);
    if (error) {
      console.error(error);
    }
  }
  revalidatePath("/goals");
}
