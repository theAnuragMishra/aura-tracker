"use client";
import { createContext, useContext, useEffect, useRef } from "react";
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
  const socket = useRef<Socket | null>(null);

  useEffect(() => {
    if (token) {
      socket.current = io("http://localhost:5173", {
        auth: { token },
      });

      socket.current.on("connect", () => {
        console.log("Connected to Socket.IO server");
      });

      return () => {
        socket.current?.disconnect();
      };
    }
  }, [token]);

  return (
    <SocketContext.Provider value={{ socket: socket.current }}>
      {children}
    </SocketContext.Provider>
  );
};

export const useSocket = (): Socket | null => {
  const context = useContext(SocketContext);
  return context.socket;
};
