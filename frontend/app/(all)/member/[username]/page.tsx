import { getCurrentSession } from "@/lib/auth";
import jwt from "jsonwebtoken";
import {
  getBaseURL,
  getUserDetails,
  getUserDetailsByUsername,
} from "@/lib/utils";
import Image from "next/image";
import { FaUser } from "react-icons/fa";
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
        <div>Role: {userData.role} </div>
      </div>
      <div>Aura: {userData.aura}</div>
      <StartChat handleClick={handleStartChat} />
    </div>
  );
}
