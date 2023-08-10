const socket = io("http://localhost:4000");

socket.on("connect", () => {
  console.log("frontend is connected");
});

socket.on("message-from-server-to-frontend", (message) => {
  // console.log("message from server to FE", message);
  // console.log(message);

  const messagesContainer = document.getElementById("message");
  const newMessage = document.createElement("li");
  newMessage.textContent = message.message;
  messagesContainer.appendChild(newMessage);
});

socket.on("message", (message) => {
  console.log("Message received", message);
});
