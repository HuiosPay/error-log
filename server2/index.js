const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const cors = require("cors");
const clientServer = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST", "OPTIONS", "PUT", "PATCH", "DELETE"],
    credentials: false,
  },
});

const publisherServerIo = require("socket.io-client");
const publisherServer = publisherServerIo("http://localhost:3000");

const port = 4000;

publisherServer.on("connect", () => {
  console.log("Server 2 is connected to Server 1");
});

publisherServer.on("message", (message) => {
  console.log("this is the message:", message);

  clientServer.emit("message-from-server-to-frontend", message);
});

clientServer.on("connection", (socket) => {
  console.log("Client connected to server 2");

  sendMessageToClient(socket);
});

function sendMessageToClient(socket) {
  // Emit the error message to Server 2
  socket.emit("message", (error) => {
    console.log("Server2 emit error", error);
  });
}

// Define a route for the root URL
app.get("/", (req, res) => {
  res.send("Hello, World!");
});

// Start the server
server.listen(port, () => console.log(`Listening on port ${port}`));
