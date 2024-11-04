import { messageModel } from "../chat/message.model";

export default function setupSocket(io: any) {
  io.on("connection", (socket: any) => {
    console.log("User Connected", socket.id);

    socket.on(
      "message",
      async ({ room, message }: { room: any; message: any }) => {
        console.log({ room, message });

        const newMessage = new messageModel({
          room,
          message,
          senderId: socket.id,
        });

        await newMessage.save();

        io.to(room).emit("receive-message", { room, message });
      }
    );

    socket.on("join-room", (room: any) => {
      socket.join(room);
      console.log(`User joined room ${room}`);
    });

    socket.on("disconnect", () => {
      console.log("User Disconnected", socket.id);
    });
  });
}
