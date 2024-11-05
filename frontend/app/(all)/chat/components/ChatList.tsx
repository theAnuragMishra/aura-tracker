export default function ChatList({
  chats,
  handleClick,
  username,
}: {
  chats: { _id: string; participants: string[]; lastUpdated: Date }[];
  handleClick: (x: string, y: string) => void;
  username: string;
}) {
  return (
    <div className="">
      {chats.map((item, index) => {
        const receiver = item.participants.find(
          (participant) => participant != username
        );
        return (
          <button
            onClick={() => {
              handleClick(item._id, receiver!);
            }}
            className="h-[50px] border-y-2 px-3 py-3 w-full text-left"
            key={index}
          >
            {receiver}
          </button>
        );
      })}
    </div>
  );
}
