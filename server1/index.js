const server = require("http").createServer();
const io = require("socket.io")(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
    allowedHeaders: ["my-custom-header"],
    credentials: true,
  },
});

io.on("connection", (socket) => {
  console.log("s1 is connected to s2");

  simulateDatabaseError(socket);
});

function simulateDatabaseError(socket) {
  // create a database error for now
  const error = "Database connection error server 1";

  // Emit the error message to Server 2
  socket.emit("message", error);

  // Emit the error message to frontend
  socket.emit("messagetofrontend", error);
}

server.listen(3000, () => {
  console.log("running on port 3000");
});
