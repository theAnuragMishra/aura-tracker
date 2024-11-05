import { getCurrentSession } from "@/lib/auth";
import ChatList from "./components/ChatList";
import { getBaseURL, getUserDetails } from "@/lib/utils";
import jwt from "jsonwebtoken";
import axios from "axios";

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
  // console.log(chats);

  return (
    <div className="flex w-full min-h-screen">
      <div className="flex-[1.5] p-5 bg-gray-800">
        <ChatList chats={chats} username={userData.username} />
      </div>
      <div className="flex-[3] p-5">Column 2</div>
    </div>
  );
}
