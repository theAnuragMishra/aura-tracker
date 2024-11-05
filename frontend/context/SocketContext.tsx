"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";

interface SocketContextProps {
  socket: Socket | null;
}

const SocketContext = createContext<SocketContextProps>({ socket: null });

export const SocketProvider: React.FC<{
  children: React.ReactNode;
  token: string;
}> = ({ children, token }) => {
  // Get JWT token from your auth context
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    if (token) {
      const newSocket = io("http://localhost:5173", {
        auth: { token },
      });

      newSocket.on("connect", () => {
        console.log("Connected to Socket.IO server");
        setSocket(newSocket);
      });

      return () => {
        newSocket.disconnect();
      };
    }
  }, []);

  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  );
};

export const useSocket = (): Socket | null => {
  const context = useContext(SocketContext);
  return context.socket;
};
