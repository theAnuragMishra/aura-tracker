import express from "express";
import { Message } from "./message.model";
import { verifyUserToken } from "../middleware/verifyUserToken";
import {
  findConversations,
  getMessagesForAChat,
  startConversation,
} from "./chat.controller";

const router = express.Router();

router.get("/conversations", verifyUserToken, findConversations);

router.post("/start", verifyUserToken, startConversation);

router.get("/messages", verifyUserToken, getMessagesForAChat);

export default router;
