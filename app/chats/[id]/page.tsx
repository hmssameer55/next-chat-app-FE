import { ChatWindow } from "@/components/chat-window";
import React from "react";

const ChatDetail = () => {
  const mockMessages = [
    {
      id: "1",
      chatId: "1",
      senderId: "alice",
      senderName: "Alice Johnson",
      content: "Hey! How are you doing?",
      timestamp: "10:30 AM",
    },
    {
      id: "2",
      chatId: "1",
      senderId: "me",
      senderName: "You",
      content: "I'm doing great! Thanks for asking. How about you?",
      timestamp: "10:32 AM",
    },
    {
      id: "3",
      chatId: "1",
      senderId: "alice",
      senderName: "Alice Johnson",
      content: "I'm good too! Working on some exciting projects.",
      timestamp: "10:35 AM",
    },
    {
      id: "4",
      chatId: "2",
      senderId: "bob",
      senderName: "Bob Smith",
      content: "Thanks for the help yesterday",
      timestamp: "9:15 AM",
    },
    {
      id: "5",
      chatId: "2",
      senderId: "me",
      senderName: "You",
      content: "No problem! Happy to help anytime.",
      timestamp: "9:20 AM",
    },
  ];

  return <ChatWindow messages={mockMessages} currentUserId="me" />;
};

export default ChatDetail;
