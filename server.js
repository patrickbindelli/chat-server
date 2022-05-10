import 'dotenv/config';
import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import cors from 'cors'
import { userJoin, getUser, userDisconnect } from './handlers/dummyuser.js';
import 'colors'

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
    socket.on("login", user => {
        console.log("User: " + user)
        const logged_user = userJoin(socket.id, user)
        console.log(socket.id, "=id");
       
        new Connection(io, socket);
    
        socket.emit("notification", {
            userId: logged_user.id,
            username: logged_user.username,
            text: `Bem vindo, ${logged_user.username}`,
        });
    })

    socket.on("disconnect", () => {
        const user = userDisconnect(socket.id);
        
        if(user){
            io.emit("notification", {
                userId: user.id,
                username: user.username,
                text: `${user.username} has left the chat`,
            });
        }
    });
}

io.on("connection", onConnection);

httpServer.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}, at http://localhost:${process.env.PORT}`.green)
});