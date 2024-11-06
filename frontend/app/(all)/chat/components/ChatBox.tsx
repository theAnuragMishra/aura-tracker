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
        <p key={i} className="mb-1 text-white">
          {m.content}
        </p>
      ))}
    </div>
  );
}
