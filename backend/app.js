import express from "express";
import { createServer } from 'http';
import cors from 'cors';
import { Server } from 'socket.io';
import { sequelize } from "./Models/_db.js";
import process from "node:process";
import db from './Models/_db.js';
// Import routers
import userRouter from './Routes/userRoutes.js';
import webRouter from './Routes/webhookRoutes.js';
import messageRouter from './Routes/messageRoutes.js';
import eventRouter from './Routes/eventRoutes.js';
import attributeRouter from './Routes/attributeRoutes.js';

const app = express();
app.use(express.json());

// CORS configuration allowing both localhost and 127.0.0.1
const corsOptions = {
  origin: [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
  ],
  methods: ["GET", "POST"],
};

app.use(cors(corsOptions));

// Create server and attach Socket.IO
const server = createServer(app);
const io = new Server(server, {
  cors: corsOptions,
});

const PORT = process.env.PORT || 5000;

// Load API routes
app.use("/api/users", userRouter);
app.use("/api/webhooks", webRouter);
app.use("/api/message", messageRouter);
app.use("/api/events", eventRouter);
app.use("/api/attributes", attributeRouter);

// Start the server and authenticate the database connection
const startServer = async () => {
  console.log('Attempting to connect to the database...');
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');

    // Sync models to the database
    await sequelize.sync({ alter: true });
    console.log('Models synced to the database.');

    // Handle socket connection
    io.on('connection', (socket) => {
      console.log('User connected:', socket.id);

      // Listen for incoming messages from client-side
      socket.on('chatMessage', async (data, callback) => {
        try {
          console.log('Received message data:', data);

          // Save message to the database
          const newMessage = await db.Message.create({
            roomId: data.roomId,
            senderId: data.senderId,
            displayName: data.displayName,
            text: data.text,
          });

          // Log the saved message using .get() to extract raw data
          console.log('Message saved to database:', newMessage.get());

          // Emit the message to all connected clients
          io.emit('chatMessage', newMessage.get());  // Emit the raw message data
          console.log('Broadcast the message to all connected clients:', newMessage.get());

          // Acknowledge the message has been sent successfully
          callback({ status: 'success', message: newMessage.get() });
        } catch (error) {
          console.error('Error saving or emitting message:', error);
          socket.emit('error', 'Failed to send the message.');
          callback({ status: 'error', message: 'Failed to send the message.' });
        }
      });

      // Handle disconnection
      socket.on('disconnect', () => {
        console.log('User disconnected:', socket.id);
      });
    });

    server.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('Unable to connect to the database:', error.message);
    console.error('Stack Trace:', error.stack);
    process.exit(1);
  }
};

startServer();
