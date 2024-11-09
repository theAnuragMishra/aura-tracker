import { getCurrentSession } from "@/lib/auth";
import { getUserDetails } from "@/lib/utils";
import clsx from "clsx";
import RoleInput from "./components/RoleInput";
import Image from "next/image";
import { FaFireAlt, FaUser } from "react-icons/fa";
import Link from "next/link";

export default async function Profile({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const toHighlightRole = (await searchParams).highlightRole;

  const { user } = await getCurrentSession();
  const userData = await getUserDetails(user!);
  // console.log(userData.avatar_url);

  return (
    <div>
      <div>
        {userData.avatar_url ? (
          <Image
            src={userData.avatar_url}
            alt="profile picture"
            width="150"
            height="150"
            className="rounded-full"
          />
        ) : (
          <FaUser className="w-[100px] h-[100px] rounded-full" />
        )}
      </div>
      <h1 className="text-2xl mt-2">
        {userData.full_name || userData.username}
      </h1>
      <div className="text-2xl">
        {userData.role ? (
          <div>{userData.role[0].toUpperCase() + userData.role.slice(1)} </div>
        ) : (
          <div className={clsx("text-2xl", { "": toHighlightRole === "true" })}>
            Select Role: <RoleInput />
          </div>
        )}
      </div>
      <div className="mb-3 text-2xl flex items-center gap-2">
        {userData.aura} Aura{" "}
        <FaFireAlt className="inline text-yellow-500 text-4xl" />
      </div>

      <Link
        href="/profile/edit"
        className="bg-white text-black rounded-lg  text-xl px-2 py-1 text-md "
      >
        Edit Profile
      </Link>
    </div>
  );
}
