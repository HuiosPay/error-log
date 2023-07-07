const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

io.on("connection", (socket) => {
  console.log("a user connected");

  simulateDatabaseError(socket);

  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});

function simulateDatabaseError(socket) {
  // create a database error for now
  const error = "Database connection error";

  // Emit the error message to Server 2
  socket.emit("databaseError", error);

  // Retry the database connection after a delay
  // setTimeout(() => {
  //   simulateDatabaseError(socket);
  // }, 10000);
}

server.listen(3000, () => {
  console.log("listening on *:3000");
});
