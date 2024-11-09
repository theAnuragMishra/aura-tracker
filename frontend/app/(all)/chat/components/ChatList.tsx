export default function ChatList({
  chats,
  handleClick,
  username,
}: {
  chats: { _id: string; participants: string[]; lastUpdated: string; lastMessage: string }[];
  handleClick: (x: string, y: string) => void;
  username: string;
}) {

  function formatTime(dateString: string) {
    const date = new Date(dateString);
    const difference = (Date.now() - date.getTime()) / (24 * 60 * 60 * 1000);

    if (difference > 2) {
      const day = date.getDate().toString().padStart(2, '0');
      const month = (date.getMonth() + 1).toString().padStart(2, '0');
      const year = date.getFullYear().toString().slice(-2);
      return `${day}-${month}-${year}`;
    }
    else if (difference > 1) return "Yesterday";
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
  }
  return (
    <div className="">
      {chats.map((item, index) => {
        const receiver = item.participants.find(
          (participant) => participant != username
        );

        // console.log(typeof item.lastUpdated)
        return (
          <div
            onClick={() => {
              handleClick(item._id, receiver!);
            }}
            className="h-fit cursor-pointer border-b-2 px-3 py-1 w-full text-left"
            key={index}
          >
            <div className="flex justify-between">
              <div className="text-lg">{receiver}</div>
              <div>{formatTime(item.lastUpdated)}</div>   </div>
            {item.lastMessage && <div className="text-gray-500">{item.lastMessage.slice(0, 40)}{item.lastMessage.length > 40 && "..."}</div>}

          </div>
        );
      })}
    </div>
  );
}
