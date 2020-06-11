const express = require("express");
const socketio = require("socket.io");
const http = require("http");
const cors = require("cors");
const router = require("./router");


const { addUser, getUser, getUsersInRoom, removeUser, users } = require("./users");


const app = express();
const server = http.createServer(app);
const io = socketio(server);

app.use(router);
app.use(cors());
const PORT = process.env.PORT || 5000;

io.on("connection", (socket) => {
  socket.on("join", ({ name, room }, callback) => {
    const { error, user } = addUser({ id: socket.id, name, room });

    console.log("Do we have error", error);
    if (error) {
      return callback(error);
    }

    console.log(user.name, user.room);
    // welcome message
    socket.emit("message", {
      user: "admin",
      text: `${user.name}, welcome to the room ${user.room}`,
    });

    // message sent to everyone except the entered user
    socket.broadcast.to(user.room).emit("message", {
      user: "admin",
      text: `${user.name} has entered the chat`,
    });

    // if no error ! we will join the user in the room
    socket.join(user.room);

    io.to(user.room).emit("roomData", {
      room: user.room,
      users: getUsersInRoom(user.room),
    });

    callback();
  });

  socket.on("sendMessage", (message, callback) => {
    const user = getUser(socket.id);

    io.to(user.room).emit("message", { user: user.name, text: message });
    io.to(user.room).emit("roomData", {
      room: user.room,
      users: getUsersInRoom(user.room),
    });

    callback();
  });

  socket.on("disconnect", () => {
    const user = removeUser(socket.id);
    console.log("User disconnected is ", user);
    if (user) {
      io.to(user.room).emit("message", {
        user: "admin",
        text: `${user.name} has left`,
      });
    }
    console.log("After disconnection array should be null", users);
  });
});

server.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
