// const express = require("express");
// const app = express();
const io = require("socket.io-client");
const socket = io("http://localhost:3000", { cors: { origin: "*" } });

socket.on("connect", () => {
  console.log("s2 is connected to s1");
});

socket.on("message", (message) => {
  console.log("this is the message:", message);

  socket.emit("messagetofrontend", message);
});
