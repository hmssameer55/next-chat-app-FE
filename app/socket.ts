"use client";

// lib/socket.ts
import { io, Socket } from "socket.io-client";

const socket: Socket = io("http://localhost:8000");

export default socket;
