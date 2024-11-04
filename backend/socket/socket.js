const Message = require('../models/message.model');

const setupSocket = (io) => {
    io.on("connection", (socket) => {
        console.log("User Connected", socket.id);

        socket.on("message", async ({ room, message }) => {
            console.log({ room, message });

            const newMessage = new Message({
                room,
                message,
                senderId: socket.id,
            });

            await newMessage.save();

            io.to(room).emit("receive-message", { room, message });
        });

        socket.on("join-room", (room) => {
            socket.join(room);
            console.log(`User joined room ${room}`);
        });

        socket.on("disconnect", () => {
            console.log("User Disconnected", socket.id);
        });
    });
};

module.exports = setupSocket;
