import clsx from "clsx";
import { useEffect, useRef } from "react";

interface Message {
  conversationId: string;
  senderId: string;
  content: string;
  timestamp: Date;
  status: "sent";
}

export default function ChatBox({
  messages,
  username,
}: {
  messages: Message[];
  username: string;
}) {

  const endRef = useRef<null | HTMLDivElement>(null);

  const scrollToBottom = () => {
    endRef.current?.scrollIntoView({
      behavior: "smooth"
    })
  }

  useEffect(() => {
    scrollToBottom();
  }, [messages])

  return (
    <div className="h-[430px] overflow-y-auto border border-gray-600 rounded p-2">
      {messages.length ? (
        messages.map((m, i) => (
          <div
            key={i}
            className={clsx("mb-3  w-fit rounded-lg px-3 py-1", {
              "bg-gray-800 ": m.senderId === username,
              " bg-gray-900": m.senderId !== username,
            })}
          >
            <div
              className={clsx({
                "text-blue-300": m.senderId !== username,
                "text-red-400": m.senderId === username,
              })}
            >
              {m.senderId === username ? "You" : m.senderId}
            </div>
            {m.content}
          </div>
        ))
      ) : (
        <div className="w-full flex gap-4 text-6xl justify-center items-center h-full">
          <div>Say</div>
          <div> Hi</div>
        </div>
      )}
      <div ref={endRef}></div>
    </div>
  );
}
