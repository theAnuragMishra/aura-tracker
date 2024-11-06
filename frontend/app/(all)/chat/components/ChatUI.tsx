"use client";

import ChatBox from "./ChatBox";
import ChatList from "./ChatList";
import { useEffect, useState } from "react";
import { useSocket } from "@/context/SocketContext";
import { getMessagesForAChat } from "@/lib/chatActions";

interface Message {
  conversationId: string;
  senderId: string;
  content: string;
  timestamp: Date;
  status: "sent";
}

export default function ChatUI({
  chats,
  username,
}: {
  chats: { _id: string; participants: string[]; lastUpdated: Date }[];
  username: string;
}) {
  const [conversationId, setConversationId] = useState("");
  const [receiver, setReceiver] = useState("");

  const socket = useSocket();

  // if (!socket) {
  //   return <div>Error.. couldn&apos;t connect to the server</div>;
  // }
  // console.log(socket);
  const [messages, setMessages] = useState<Message[]>([]);
  const [message, setMessage] = useState<string>("");

  useEffect(() => {
    if (socket) {
      socket.on("message", (data) => {
        setMessages((prevMessages) => [...prevMessages, data]);
        console.log("message received");
      });

      return () => {
        socket.off("message");
      };
    }
  }, [socket]);

  const sendMessage = () => {
    if (message && socket) {
      socket.emit("sendMessage", {
        conversationId,
        content: message,
        receiverId: receiver,
      });
      setMessage("");
    }
  };

  const handleChatChange = async (conversationId: string, receiver: string) => {
    setConversationId(conversationId);
    setReceiver(receiver);
    console.log("chat changed");
    if (socket) {
      socket.emit("joinConversation", conversationId);
    }
    const messages = await getMessagesForAChat(conversationId);
    if (messages) {
      setMessages(messages);
    }
  };

  return (
    <>
      <div className="flex-[1.5] p-5 bg-gray-800">
        <ChatList
          chats={chats}
          username={username}
          handleClick={handleChatChange}
        />
      </div>
      <div className="flex-[3] p-5 h-full">
        {conversationId && (
          <div className="flex-col h-full">
            <ChatBox messages={messages} />

            <div>
              <input
                className="w-full p-2 mb-4 border border-gray-600 rounded bg-gray-700 text-white"
                placeholder="Message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
              <button
                onClick={sendMessage}
                className="w-full p-2 bg-purple-600 rounded hover:bg-purple-500 transition duration-200"
                type="submit"
              >
                Send
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
