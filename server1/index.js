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
  console.log("Server1 is connected to Server2");

  simulateDatabaseError(socket);
});

function simulateDatabaseError(socket) {
  // create a database error for now
  // const error = "Hailing from server 1";

  const error = {
    messageType: 3,
    errorMessage: "Critical Error",
    message: `This is the error`,
  };

  // Emit the error message to Server 2
  socket.emit("message", error);
}

server.listen(3000, () => {
  console.log("running on port 3000");
});
