import express, { Request, Response } from 'express';
import * as SocketIO from 'socket.io';
var cors = require('cors')
const app = express();
const server = require('http').Server(app);
app.use(cors())
let io = new SocketIO.Server(server, {
    cors: {
        origin: "*"
    }
});
const PORT = process.env.PORT || 3000;
type UserMessage = {
    message: string,
    userName: string
}


app.get("/", (_: Request, res: Response) => {
    res.send({ uptime: process.uptime() });
});

io.on("connection", function (socket: any) {
    //  socket.broadcast.to(user.room)
    console.log("a user connected");
    socket.join("general")
    socket.emit("message", { message: "A New User Joined the Room", "userName": "admin" })
    // whenever we receive a 'message' we log it out
    socket.on("message", function (message: UserMessage) {
        console.log("Got Message", message);
        socket.broadcast.to("general").emit("message", message)
    });
    socket.on('disconnect', function () {
        socket.emit("message", { message: "A User Left the Room", "userName": "admin" })
    })
});



server.listen(PORT, () => {
    console.log(`My Chat App backend http://localhost:${PORT}`);
});