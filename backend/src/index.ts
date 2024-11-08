import express from "express";
import cors from "cors";
import { createServer } from "http";
import { Server } from "socket.io";
import jwt from "jsonwebtoken";

//interfaces

import {
  ServerToClientEvents,
  ClientToServerEvents,
  InterServerEvents,
  SocketData,
  SocketWithUserData,
} from "./config/interfaces";

// import dotenv from "dotenv";
import "dotenv/config";

// route imports
import profRoutes from "./professor/prof.routes";
import chatRoutes from "./chat/chat.routes";
import rewardRoutes from "./rewards/rewards.routes";
import studentRoutes from "./student/student.routes"
import badgeRoutes from "./badges/badge.routes"
import { connectDB } from "./config/db";
import setupSocket from "./config/socket";

const app = express();
// dotenv.config();
const PORT = process.env.PORT || 5173;

app.use(express.json());

app.use(
  cors({
    origin: ["http://localhost:3000"],
    credentials: true,
  })
);

app.use("/api/prof", profRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/rewards", rewardRoutes);
app.use("/api/student", studentRoutes);
app.use("/api/badges", badgeRoutes);

app.get("/", (req, res) => {
  res.send("Hello, Aura Stars!");
});

connectDB();

const server = createServer(app);

const io = new Server<
  ClientToServerEvents,
  ServerToClientEvents,
  InterServerEvents,
  SocketData
>(server, {
  cors: {
    origin: "http://localhost:3000",
    credentials: true,
  },
});

io.use((socket: SocketWithUserData, next) => {
  const token = socket.handshake.auth.token;
  if (!token) {
    return next(new Error("Authentication error"));
  }

  jwt.verify(token, process.env.JWT_SECRET!, (err: any, decoded: any) => {
    if (err) return next(new Error("Authentication error"));
    socket.user = decoded;
    next();
  });
});

setupSocket(io);

server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
