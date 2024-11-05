"use client";

import ChatBox from "./ChatBox";
import ChatList from "./ChatList";
import { useState } from "react";

export default function ChatUI({
  chats,
  username,
}: {
  chats: { _id: string; participants: string[]; lastUpdated: Date }[];
  username: string;
}) {
  const [conversationId, setConversationId] = useState("");
  const [receiver, setReceiver] = useState("");

  const handleChatChange = (conversationId: string, receiver: string) => {
    setConversationId(conversationId);
    setReceiver(receiver);
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
      <div className="flex-[3] p-5">
        {conversationId && (
          <ChatBox conversationId={conversationId} receiver={receiver} />
        )}
      </div>
    </>
  );
}
