import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
  room: { type: String, required: true },
  message: { type: String, required: true },
  senderId: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
});

export const messageModel = mongoose.model("Message", messageSchema);
