import { getCurrentSession } from "@/lib/auth";
import { getUserDetails } from "@/lib/utils";
import clsx from "clsx";
import RoleInput from "./components/RoleInput";
import Image from "next/image";
import { FaUser } from "react-icons/fa";
import Link from "next/link";

export default async function Profile({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const toHighlightRole = (await searchParams).highlightRole;

  const { user } = await getCurrentSession();
  const userData = await getUserDetails(user!);
  console.log(userData.avatar_url);
  return (
    <div>
      <div>
        {userData.avatar_url ? (
          <Image
            src={userData.avatar_url}
            alt="profile picture"
            width="100"
            height="100"
            className="rounded-full"
          />
        ) : (
          <FaUser className="w-[100px] h-[100px] rounded-full" />
        )}
      </div>
      <h1 className="text-2xl my-4">
        {userData.full_name || userData.username}
      </h1>
      <div>
        {userData.role ? (
          <div>Role: {userData.role} </div>
        ) : (
          <div className={clsx("", { "": toHighlightRole === "true" })}>
            Select Role: <RoleInput />
          </div>
        )}
      </div>
      <div className="mb-1">{userData.aura} Aura :fire:</div>

      <Link
        href="/profile/edit"
        className="bg-white text-black rounded-lg px-2 py-1 text-md "
      >
        Edit Profile
      </Link>
    </div>
  );
}
