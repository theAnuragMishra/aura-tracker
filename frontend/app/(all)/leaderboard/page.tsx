import { getCurrentSession } from "@/lib/auth";
import { createSupabaseClientJWT } from "@/lib/supabase-client";
import { getUserDetails } from "@/lib/utils";

export default async function Leaderboard() {
  const { user } = await getCurrentSession();
  const userData = await getUserDetails(user!);

  if (!["student", "professor"].includes(userData.role)) {
    return <div>Set your goals somewhere else, alright?</div>;
  }

  const supabase = await createSupabaseClientJWT();

  const { data: demo, error } = await supabase
    .from("profiles")
    .select("full_name, username, aura")
    .limit(10)
    .order("aura", { ascending: false })
    .eq("role", "student");

  if (error) {
    console.error(error);
  }

  return (
    <div className="w-full h-full flex items-center justify-center bg-foreground">
      <div className="h-auto w-1/3 m-auto text-black p-6 rounded-lg shadow-lg bg-white">
        <h2 className="text-3xl font-bold text-center mb-4">Leaderboard</h2>
        <ul className="text-xl space-y-3">
          {demo!.map((item, index) => (
            <li
              key={index}
              className="flex justify-between items-center p-4 rounded-lg shadow-sm  transition duration-200 ease-in-out"
            >
              <span className="font-semibold text-black">{item.full_name}</span>
              <span className={`text-lg `}>{item.aura}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
