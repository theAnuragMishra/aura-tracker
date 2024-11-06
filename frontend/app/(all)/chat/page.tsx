import { getCurrentSession } from "@/lib/auth";

import { getBaseURL, getUserDetails } from "@/lib/utils";
import jwt from "jsonwebtoken";
import axios from "axios";
import ChatUI from "./components/ChatUI";

export default async function Chat() {
  const { user } = await getCurrentSession();
  const userData = await getUserDetails(user!);

  const token = jwt.sign(user!, process.env.JWT_SECRET!, { expiresIn: "24h" });

  const response = await axios.get(`${getBaseURL()}/api/chat/conversations/`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params: {
      username: userData.username,
    },
  });

  const chats = response.data;
  console.log("fetched conversations");
  console.log(chats);

  return (
    <div className="flex w-full h-full">
      <ChatUI chats={chats} username={userData.username} />
    </div>
  );
}
