import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import OurRouter from './routes/Route.js';
import cors from "cors";
import dotenv from 'dotenv';
import { createServer } from "http";
import { Server } from "socket.io";
import User from "./models/User.js";

dotenv.config();
const app = express();
const port = 3000;

// MongoDB connection URL
const connectionUrl = "mongodb+srv://shashiyadav17900:d1r6ygNnZaddSyQx@chatapp.ts4qsk3.mongodb.net/chatApp?retryWrites=true&w=majority&appName=ChatApp";

// Create HTTP server
const httpServer = createServer(app);

// ✅ Allowed frontend origins
app.use(cors({
  origin: "https://chat-app-pearl-beta-68.vercel.app", // Replace with your frontend URL
  credentials: true,
  methods: "GET, POST, PUT, PATCH, DELETE",
  allowedHeaders: "Content-Type, Authorization"
}));

// ✅ Handle Preflight Requests (OPTIONS method)
app.options("*", (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "https://chat-app-pearl-beta-68.vercel.app");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.sendStatus(204);
});


// Body parser
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(bodyParser.json({ limit: '50mb' }));

// Connect to MongoDB
mongoose.connect(connectionUrl, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("✅ Database connected successfully"))
    .catch((err) => console.log("❌ Error connecting DB: " + err.message));

// Socket.IO setup with CORS
export const io = new Server(httpServer, {
    cors: {
        origin: allowedOrigins,
        methods: ["GET", "POST"],
        credentials: true,
    }
});

// Socket.IO events
io.on("connection", (socket) => {
    let userId;

    socket.on('userOnline', async (payload) => {
        userId = payload;
        if (!userId) return console.log("⚠️ No user ID");

        const user = await User.findById(userId);
        if (user) {
            user.online = true;
            await user.save();
            io.emit('userOnline', { userId });
        }
    });

    socket.on('disconnect', async () => {
        if (!userId) return console.log("⚠️ No user ID");

        const user = await User.findById(userId);
        if (user) {
            user.online = false;
            await user.save();
            io.emit('userOffline', { userId });
        }
    });

    socket.on('sendMsg', async (payload) => {
        io.emit('sendMsg', payload);
    });

    socket.on('userIsTyping', async (payload) => {
        const { senderId, receiverId } = payload;
        io.emit('userIsTyping', { senderId, receiverId });
    });

    socket.on('userStopTyping', async (payload) => {
        const { senderId, receiverId } = payload;
        io.emit('userStopTyping', { senderId, receiverId });
    });
});

// API routes
app.use('/api/', OurRouter);

// Start server
httpServer.listen(port, () => {
    console.log(`🚀 App running at http://localhost:${port}`);
});
