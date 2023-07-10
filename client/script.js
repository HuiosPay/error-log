import { io } from "socket.io-client";

const socket = io("http://localhost:3000");
socket.on("connect", () => {
  console.log("frontend is connected");
});

// socket.on("messagefromservertofrontend", (message) => {
//     console.log(message);
//   });

socket.on("messagetofrontend", (message) => {
  const messagesContainer = document.getElementById("message");
  const newMessage = document.createElement("li");
  newMessage.textContent = message;
  messagesContainer.appendChild(newMessage);
});
