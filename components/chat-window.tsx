"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send } from "lucide-react";
import { cn } from "@/lib/utils";
import socket from "@/app/socket";

interface Message {
  id: string;
  chatId: string;
  senderId: string;
  senderName: string;
  content: string;
  timestamp: string;
}

interface ChatWindowProps {
  messages: Message[];
  currentUserId: string;
  chatId: string;
}

export function ChatWindow({
  messages: initialMessages,
  currentUserId,
  chatId,
}: ChatWindowProps) {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [newMessage, setNewMessage] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom when messages change
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    socket.emit("join_chat", chatId); // Join chat room
  }, [chatId]);

  // Handle incoming messages
  useEffect(() => {
    const handleReceiveMessage = (message: Message) => {
      setMessages((prev) => [...prev, message]);
    };

    socket.on("receive_message", handleReceiveMessage);

    return () => {
      socket.off("receive_message", handleReceiveMessage);
    };
  }, []);

  const handleSendMessage = (content: string) => {
    const messagePayload = {
      chatId,
      senderId: currentUserId,
      content,
    };

    socket.emit("send_message", messagePayload);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newMessage.trim()) {
      handleSendMessage(newMessage.trim());
      setNewMessage("");
    }
  };

  return (
    <div className="flex flex-col h-full bg-gray-50 overflow-hidden w-full">
      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-10 space-y-4 min-h-0">
        {messages.map((message) => {
          const isCurrentUser = message.senderId === currentUserId;

          return (
            <div
              key={message.id}
              className={cn(
                "flex gap-3 max-w-[80%]",
                isCurrentUser ? "ml-auto flex-row-reverse" : ""
              )}
            >
              <div
                className={cn(
                  "flex flex-col gap-1",
                  isCurrentUser ? "items-end" : "items-start"
                )}
              >
                <div
                  className={cn(
                    "rounded-2xl px-4 py-2 max-w-full break-words shadow-sm",
                    isCurrentUser
                      ? "bg-teal-600 text-white rounded-br-md"
                      : "bg-white border border-gray-200 text-gray-800 rounded-bl-md"
                  )}
                >
                  <p className="text-sm">{message.content}</p>
                </div>

                <span className="text-xs text-gray-400">
                  {message.timestamp}
                </span>
              </div>
            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </div>

      {/* Message input */}
      <div className="border-t border-gray-200 p-4 bg-white flex-shrink-0">
        <form onSubmit={handleSubmit} className="flex gap-2">
          <Input
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type a message..."
            className="flex-1"
          />
          <Button
            type="submit"
            size="sm"
            disabled={!newMessage.trim()}
            className="bg-teal-600 hover:bg-teal-700"
          >
            <Send className="h-4 w-4" />
          </Button>
        </form>
      </div>
    </div>
  );
}
