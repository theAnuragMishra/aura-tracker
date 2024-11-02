const express = require('express');
const { Server } = require('socket.io');
const { createServer } = require('http');
const connectDB = require('./config/db');
const messageRoutes = require('./routes/message.routes');
const setupSocket = require('./socket/socket');

const app = express();
const server = createServer(app);
const port = 5173;

connectDB();

const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"],
        credentials: true,
    },
});

app.use('/messages', messageRoutes);

setupSocket(io);

server.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});
