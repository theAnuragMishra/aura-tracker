const express = require('express');
const cors = require('cors'); 
const { Server } = require('socket.io');
const { createServer } = require('http');
const connectDB = require('./config/db');
const messageRoutes = require('./routes/message.routes');
const couponRoutes = require('./routes/coupon.routes');
const setupSocket = require('./socket/socket');

const app = express();
const server = createServer(app);
const port = 5173;

connectDB();

const corsOptions = {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'], 
    credentials: true, 
};

app.use(cors(corsOptions));
app.use(express.json());

const io = new Server(server, {
    cors: {
        origin: 'http://localhost:3000',
        methods: ['GET', 'POST'],
        credentials: true,
    },
});

app.use('/messages', messageRoutes);
app.use('/coupons', couponRoutes);

setupSocket(io);

server.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});
