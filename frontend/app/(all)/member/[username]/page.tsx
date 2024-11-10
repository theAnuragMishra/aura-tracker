import { getCurrentSession } from "@/lib/auth";
import jwt from "jsonwebtoken";
import {
  getBaseURL,
  getUserDetails,
  getUserDetailsByUsername,
} from "@/lib/utils";
import Image from "next/image";
import { FaFireAlt, FaUser } from "react-icons/fa";
import StartChat from "./components/StartChat";
import axios from "axios";

export default async function Profile({
  params,
}: {
  params: { username: string };
}) {
  const { user } = await getCurrentSession();
  const viewerData = await getUserDetails(user!);
  const username = (await params).username;
  const userData = await getUserDetailsByUsername(username);

  if (!userData) {
    return <div>User not found</div>;
  }

  const handleStartChat = async () => {
    "use server";
    const token = jwt.sign(viewerData, process.env.JWT_SECRET!, {
      expiresIn: "10m",
    });
    const response = await axios.post(
      `${getBaseURL()}/api/chat/start`,
      { userA: username, userB: viewerData.username },
      {
        headers: {
          Authorization: `Bear ${token}`,
        },
      }
    );
    console.log(response.data);
  };
  //   console.log(userData.avatar_url);
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
        {userData.role[0].toUpperCase() + userData.role.slice(1)}
      </div>

      <div className="mb-3 text-2xl flex items-center gap-2">
        {userData.aura} Aura{" "}
        <FaFireAlt className="inline text-yellow-500 text-4xl" />
      </div>
      {viewerData.username !== username && (
        <StartChat handleClick={handleStartChat} />
      )}
    </div>
  );
}
