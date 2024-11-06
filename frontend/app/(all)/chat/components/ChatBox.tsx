interface Message {
  conversationId: string;
  senderId: string;
  content: string;
  timestamp: Date;
  status: "sent";
}

export default function ChatBox({ messages }: { messages: Message[] }) {
  return (
    <div className="h-4/5 overflow-y-auto border border-gray-600 rounded p-2">
      {messages.map((m, i) => (
        <div
          key={i}
          className="mb-3 text-white bg-gray-800 w-fit rounded-lg px-3 py-1"
        >
          <div className="text-blue-300">{m.senderId}</div>
          {m.content}
        </div>
      ))}
    </div>
  );
}
