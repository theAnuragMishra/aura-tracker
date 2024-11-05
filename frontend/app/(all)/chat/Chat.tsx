"use client";
import { useEffect, useState } from "react";
import { useSocket } from "@/context/SocketContext";
// import axios from "axios";

interface ChatProps {
  roomId: string;
}

interface Message {
  userId: string;
  message: string;
}

export default function Chat({ roomId }: ChatProps) {
  const socket = useSocket();
  const [messages, setMessages] = useState<Message[]>([]);
  const [message, setMessage] = useState<string>("");
  // const [room, setRoom] = useState<string>("");
  // const [socketID, setSocketId] = useState<string>("");
  // const [roomName, setRoomName] = useState<string>("");

  useEffect(() => {
    if (socket) {
      socket.emit("joinRoom", roomId);

      socket.on("message", (data: Message) => {
        setMessages((prevMessages) => [...prevMessages, data]);
      });

      return () => {
        socket.off("message");
      };
    }
  }, [socket, roomId]);

  if (!socket) {
    return <div>Error.. couldn&apos;t connect to the server</div>;
  }

  const sendMessage = () => {
    if (message && socket) {
      socket.emit("sendMessage", { room: roomId, message });
      setMessage("");
    }
  };

  // const fetchMessages = async (roomName: string) => {
  //   try {
  //     const response = await axios.get(
  //       `http://localhost:5173/api/chat/${roomName}`
  //     );
  //     const messagesData = response.data.map(
  //       (msg: { message: string }) => msg.message
  //     );
  //     setMessages(messagesData);
  //   } catch (error) {
  //     console.error("Error fetching messages:", error);
  //   }
  // };

  // const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();
  //   if (message.trim() && room.trim()) {
  //     socket.emit("message", { message, room });
  //     setMessage("");
  //   }
  // };

  // const joinRoomHandler = (e: FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();
  //   if (roomName.trim()) {
  //     socket.emit("join-room", roomName);
  //     setRoom(roomName);
  //     setRoomName("");
  //     fetchMessages(roomName);
  //   }
  // };

  // useEffect(() => {
  //   socket.on("connect", () => {
  //     setSocketId(socket.id!);
  //     console.log("connected", socket.id);
  //   });

  //   socket.on("receive-message", (data: { message: string }) => {
  //     console.log("Received message:", data);
  //     setMessages((prevMessages) => [...prevMessages, data.message]);
  //   });

  //   socket.on("Welcome", (s: string) => {
  //     console.log(s);
  //   });

  //   return () => {
  //     socket.off("receive-message");
  //     socket.disconnect();
  //   };
  // }, [socket]);

  return (
    <div className="flex h-screen bg-gray-900">
      <div className="w-1/4 p-6 bg-gray-900">
        {/* <form onSubmit={joinRoomHandler} className="mt-6">
          <label className="block text-sm font-medium text-white mb-1">
            Join Room
          </label>
          <input
            className="w-full p-2 mb-4 border border-gray-600 rounded bg-gray-700 text-white"
            placeholder="Room ID"
            value={roomName}
            onChange={(e) => setRoomName(e.target.value)}
          />
          <button
            className="w-full p-2 bg-purple-600 rounded hover:bg-purple-500 transition duration-200"
            type="submit"
          >
            Join
          </button>
        </form> */}
      </div>

      <div className="w-3/4 p-6 bg-gray-800">
        <h1 className="text-center text-2xl mb-4 text-white">Chat Room</h1>
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
        <div className="max-h-64 overflow-y-auto border border-gray-600 rounded p-2 mt-3">
          {messages.map((m, i) => (
            <p key={i} className="mb-1 text-white">
              {m.message}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}