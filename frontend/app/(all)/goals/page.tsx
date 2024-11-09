import { getCurrentSession } from "@/lib/auth";
import GoalUI from "./components/GoalUI";
import { getUserDetails } from "@/lib/utils";
import { createSupabaseClient } from "@/lib/supabase-client";

export default async function Goals() {
  const { user } = await getCurrentSession();
  const userData = await getUserDetails(user!);
  if (userData.role !== "student") {
    return (
      <div>Only students can set goals here, look somewhere else haha :)</div>
    );
  }

  const supabase = createSupabaseClient();

  const { data, error } = await supabase
    .from("goals")
    .select("*")
    .eq("student_id", user!.id);

  if (error) {
    return (
      <div className="text-3xl">
        Couldn&apos;t fetch goals! Check your connection and try again.
      </div>
    );
  }

  return <GoalUI goals={data} />;
}
