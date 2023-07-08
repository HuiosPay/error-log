const express = require("express");
const cors = require("cors");

const server = require("http").createServer();
const io = require("socket.io")(server);

const app = express();

app.use(cors());

io.on("connection", (socket) => {
  console.log("s1 is connected to s2");

  socket.emit("message", "hello from s11");
});

server.listen(3000, () => {
  console.log("running on port 3000");
});
