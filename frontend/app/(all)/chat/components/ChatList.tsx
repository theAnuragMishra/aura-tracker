export default function ChatList({
  chats,
  username,
}: {
  chats: { _id: number; participants: string[]; lastUpdated: Date }[];
  username: string;
}) {
  return (
    <div className="">
      {chats.map((item, index) => {
        const otherParticipant = item.participants.find(
          (participant) => participant != username
        );
        return (
          <button
            className="h-[50px] border-y-2 px-3 py-3 w-full text-left"
            key={index}
          >
            {otherParticipant}
          </button>
        );
      })}
    </div>
  );
}
