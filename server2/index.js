const express = require("express");
const cors = require("cors");
const io = require("socket.io-client");
const socket = io("http://localhost:3000");

const app = express();
const http = require("http").Server(app);

const port = 4000;

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "OPTIONS", "PUT", "PATCH", "DELETE"],
    credentials: false,
  })
);

socket.on("connect", () => {
  console.log("s2 is connected to s1");
});

socket.on("message", (message) => {
  console.log("this is the message:", message);

  socket.emit("messagefromservertofrontend", message);
});

// Define a route for the root URL
app.get("/", (req, res) => {
  res.send("Hello, World!");
});

// Start the server
http.listen(port, () => console.log(`Listening on port ${port}`));
