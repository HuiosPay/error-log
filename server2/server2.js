const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

// app.get("/", (req, res) => {
//   res.sendFile(__dirname + "/index.html");
// });

server.listen(4000, () => {
  console.log("Server 2 listening on port 4000");
});

io.on("connection", (socket) => {
  console.log("WebSocket connection established with Server 1");

  socket.on("send-message", (message) => {
    console.log(message);
  });

  socket.on("databaseError", (error) => {
    console.log(error);
  });
});
