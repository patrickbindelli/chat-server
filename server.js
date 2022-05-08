import 'dotenv/config';
import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import cors from 'cors'

const app = express();
app.use(cors);

const httpServer = createServer(app);

const io = new Server(httpServer, { 
    cors: {
        origin: '*',
        methods: ['GET', 'POST']
    }
});

import Connection from "./handlers/messagesHandler.js"

const onConnection = (socket) => {
    new Connection(io, socket);
}

io.on("connection", onConnection);

httpServer.listen(process.env.PORT, () => {
    console.log("\nServer iniciado.\n")
});