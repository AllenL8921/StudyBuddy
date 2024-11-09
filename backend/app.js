import express from "express";
import cors from 'cors';
import process from "node:process";
import { sequelize } from "./Models/_db.js";

//Import routers
import userRouter from './Routes/userRoutes.js';
import webRouter from './Routes/webhookRoutes.js';
import eventRouter from './Routes/eventRoutes.js';

const app = express();
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 5000;

// Load API routes
app.use("/api/users", userRouter);
app.use("/api/webhooks", webRouter);
app.use("/api/events", eventRouter);

// Start the server and authenticate the database connection
const startServer = async () => {
  console.log('Attempting to connect to the database...');
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');

    // Sync models to the database
    await sequelize.sync({ alter: true });
    console.log('Models synced to the database.');

    app.listen(PORT, () => {
      console.log(`Listening on port ${PORT}`);
    });
  } catch (error) {
    console.error('Unable to connect to the database:', error.message);
    console.error('Stack Trace:', error.stack);
    process.exit(1);
  }
};

startServer();