import express, { Request, Response } from 'express';
import * as SocketIO from 'socket.io';
const app = express();
const server = require('http').Server(app);
let io = new SocketIO.Server(server, {
    cors: {
        origin: "*"
    }
});
const PORT = process.env.PORT || 3000;

app.get("/", (_: Request, res: Response) => {
    res.send({ uptime: process.uptime() });
});

io.on("connection", function (socket: any) {
    console.log("a user connected");
    // whenever we receive a 'message' we log it out
    socket.on("message", function (message: any) {
        console.log(message);
    });
});



server.listen(PORT, () => {
    console.log(`My Chat App backend http://localhost:${PORT}`);
});