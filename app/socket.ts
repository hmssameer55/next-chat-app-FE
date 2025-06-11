"use client";

// lib/socket.ts
import { io, Socket } from "socket.io-client";

const socket: Socket = io("http://localhost:8000", {
  transports: ["websocket"], // force WebSocket (optional)
  autoConnect: false, // we will manually connect
});

export default socket;
