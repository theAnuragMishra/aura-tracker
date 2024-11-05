"use client";
import { useEffect, useState } from "react";
import { useSocket } from "@/context/SocketContext";
// import axios from "axios";

interface ChatProps {
  conversationId: string;
  receiver: string;
}

interface Message {
  userId: string;
  message: string;
}

export default function ChatBox({ conversationId, receiver }: ChatProps) {
  const socket = useSocket();
  console.log(socket);
  const [messages, setMessages] = useState<Message[]>([]);
  const [message, setMessage] = useState<string>("");

  useEffect(() => {
    if (socket) {
      socket.emit("joinConversation", conversationId);

      socket.on("message", (data: Message) => {
        setMessages((prevMessages) => [...prevMessages, data]);
      });

      return () => {
        socket.off("message");
      };
    }
  }, [socket, conversationId]);

  if (!socket) {
    return <div>Error.. couldn&apos;t connect to the server</div>;
  }

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

  return (
    <div className="flex flex-col h-screen bg-gray-900">
      <h1 className="text-center text-2xl mb-4 text-white">{receiver}</h1>
      <div className="max-h-64 overflow-y-auto border border-gray-600 rounded p-2 mt-3">
        {messages.map((m, i) => (
          <p key={i} className="mb-1 text-white">
            {m.message}
          </p>
        ))}
      </div>
      <form onSubmit={sendMessage} className="mt-6">
        <label className="block text-sm font-medium text-white mb-1">
          Send Message
        </label>
        <input
          className="w-full p-2 mb-4 border border-gray-600 rounded bg-gray-700 text-white"
          placeholder="Message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button
          className="w-full p-2 bg-purple-600 rounded hover:bg-purple-500 transition duration-200"
          type="submit"
        >
          Send
        </button>
      </form>
    </div>
  );
}
