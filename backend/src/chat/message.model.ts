import mongoose from "mongoose";

const MessageSchema = new mongoose.Schema({
  conversationId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Conversation",
    required: true,
  },
  senderId: { type: String, required: true },
  receiverId: { type: String, required: true },
  content: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
  status: {
    type: String,
    enum: ["sent", "delivered", "read"],
    default: "sent",
  },
});

export const Message = mongoose.model("Message", MessageSchema);

const ConversationSchema = new mongoose.Schema({
  participants: [{ type: String, required: true }],
  lastMessage: { type: String },
  lastUpdated: { type: Date, default: Date.now },
});

// ConversationSchema.index({ participants: 1 }, { unique: true });

export const Conversation = mongoose.model("Conversation", ConversationSchema);
