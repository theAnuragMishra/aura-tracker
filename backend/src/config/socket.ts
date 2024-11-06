import { Conversation, Message } from "../chat/message.model";

export default function setupSocket(io: any) {
  io.on("connection", (socket: any) => {
    console.log("User Connected", socket.id);
    const senderId = socket.user.username;
    socket.on(
      "sendMessage",
      async ({ conversationId, content, receiverId }: any) => {
        // console.log(senderId);
        // console.log("message sent");
        // console.log(conversationId);
        // console.log(content);
        // console.log(receiverId);

        if (!conversationId || !content || !receiverId) {
          return;
        }

        const conversation = await Conversation.findById(conversationId).exec();
        if (
          !conversation ||
          !conversation.participants.includes(senderId) ||
          !conversation.participants.includes(receiverId)
        ) {
          console.log("conversation not found");
          socket.emit("error", "Invalid conversation");
          return;
        }

        const message = await Message.create({
          conversationId,
          senderId,
          receiverId,
          content,
          timestamp: new Date(),
          status: "sent",
        });

        // console.log(typeof message);

        await Conversation.findByIdAndUpdate(conversationId, {
          lastMessage: message.content,
          lastUpdated: new Date(),
        });

        io.to(conversationId).emit("message", {
          conversationId,
          senderId,
          content,
          timestamp: message.timestamp,
          status: "sent",
        });
      }
    );

    socket.on("joinConversation", async (conversationId: any) => {
      const conversation = await Conversation.findById(conversationId);
      if (!conversation) {
        socket.emit("error", "Conversation not found");
        return;
      }

      if (!conversation.participants.includes(senderId)) {
        socket.emit("error", "Access denied");
        return;
      }

      socket.join(conversationId);
      console.log("joined", conversationId);
    });

    socket.on("messageDelivered", async ({ messageId }: any) => {
      await Message.findByIdAndUpdate(messageId, { status: "delivered" });
      socket
        .to(messageId)
        .emit("messageStatusUpdate", { messageId, status: "delivered" });
    });

    socket.on("messageRead", async ({ messageId }: any) => {
      await Message.findByIdAndUpdate(messageId, { status: "read" });
      socket
        .to(messageId)
        .emit("messageStatusUpdate", { messageId, status: "read" });
    });

    socket.on("disconnect", () => {
      console.log("User Disconnected", socket.id);
    });
  });
}
