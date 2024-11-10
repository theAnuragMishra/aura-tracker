import { getCurrentSession } from "@/lib/auth";
import { createSupabaseClientJWT } from "@/lib/supabase-client";
import { getUserDetails } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { FaUser } from "react-icons/fa";

export default async function Leaderboard() {
  const { user } = await getCurrentSession();
  const userData = await getUserDetails(user!);

  if (!["student", "professor"].includes(userData.role)) {
    return <div>Set your goals somewhere else, alright?</div>;
  }

  const supabase = await createSupabaseClientJWT();

  const { data: demo, error } = await supabase
    .from("profiles")
    .select("full_name, username, aura, avatar_url")
    .limit(10)
    .order("aura", { ascending: false })
    .eq("role", "student");

  if (error) {
    console.error(error);
  }

  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="h-auto w-1/3 m-auto p-6 rounded-lg shadow-lg ">
        <h2 className="text-3xl font-bold text-center mb-4">Leaderboard</h2>
        <ul className="text-xl space-y-3">
          <li></li>
          {demo!.map((item, index) => (
            <li
              key={index}
              className={`flex justify-between items-center p-4 rounded-lg shadow-sm  transition duration-200 ease-in-out ${
                index === 0 && "border-yellow-500 border-2"
              } ${index === 1 && "border-gray-500 border-2"} ${
                index === 2 && "border-[#8B5A2B] border-2"
              }`}
            >
              <span className="font-semibold">
                <Link href={`/member/${item.username}`}>
                  {item.avatar_url ? (
                    <Image
                      className="inline rounded-full mr-2"
                      alt="user avatar"
                      src={item.avatar_url}
                      width={40}
                      height={40}
                    />
                  ) : (
                    <FaUser className="rounded-full inline mr-2 w-[40px] h-[40px]" />
                  )}
                  {item.full_name}
                </Link>
              </span>
              <span className={`text-lg `}>{item.aura}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
