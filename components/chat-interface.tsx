"use client";

import { useState, useEffect } from "react";
import { ChatSidebar } from "./chat-sidebar";
import { ChatWindow } from "./chat-window";
import { NewChatDialog } from "./new-chat-dialog";
import { Button } from "@/components/ui/button";
import { LogOut, Menu, X } from "lucide-react";

interface Chat {
  id: string;
  name: string;
  lastMessage: string;
  timestamp: string;
  unread: number;
}

interface Message {
  id: string;
  chatId: string;
  senderId: string;
  senderName: string;
  content: string;
  timestamp: string;
}

export function ChatInterface() {
  const [selectedChatId, setSelectedChatId] = useState<string | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [chats, setChats] = useState<Chat[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newChatDialogOpen, setNewChatDialogOpen] = useState(false);

  const user = {
    id: "1",
    name: "John Doe",
  };

  // Mock data initialization
  useEffect(() => {
    const mockChats: Chat[] = [
      {
        id: "1",
        name: "Alice Johnson",
        lastMessage: "Hey! How are you doing?",
        timestamp: "2 min ago",
        unread: 2,
      },
      {
        id: "2",
        name: "Bob Smith",
        lastMessage: "Thanks for the help yesterday",
        timestamp: "1 hour ago",
        unread: 0,
      },
      {
        id: "3",
        name: "Team Project",
        lastMessage: "Meeting at 3 PM tomorrow",
        timestamp: "3 hours ago",
        unread: 1,
      },
      {
        id: "4",
        name: "Sarah Wilson",
        lastMessage: "Let's catch up soon!",
        timestamp: "1 day ago",
        unread: 0,
      },
    ];

    const mockMessages: Message[] = [
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
        senderId: user?.id || "me",
        senderName: user?.name || "You",
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
        senderId: user?.id || "me",
        senderName: user?.name || "You",
        content: "No problem! Happy to help anytime.",
        timestamp: "9:20 AM",
      },
    ];

    setChats(mockChats);
    setMessages(mockMessages);
    setSelectedChatId("1");
  }, []);

  const handleSendMessage = (content: string) => {
    if (!selectedChatId || !user) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      chatId: selectedChatId,
      senderId: user.id,
      senderName: user.name,
      content,
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    setMessages((prev) => [...prev, newMessage]);

    // Update chat's last message
    setChats((prev) =>
      prev.map((chat) =>
        chat.id === selectedChatId
          ? { ...chat, lastMessage: content, timestamp: "now" }
          : chat
      )
    );
  };

  const handleCreateChat = (userId: string, userName: string) => {
    // Check if chat already exists
    const existingChat = chats.find((chat) => chat.name === userName);
    if (existingChat) {
      setSelectedChatId(existingChat.id);
      setSidebarOpen(false);
      return;
    }

    // Create new chat
    const newChatId = `chat_${Date.now()}`;
    const newChat: Chat = {
      id: newChatId,
      name: userName,
      lastMessage: "Start a conversation",
      timestamp: "now",
      unread: 0,
    };

    setChats((prev) => [newChat, ...prev]);
    setSelectedChatId(newChatId);
    setSidebarOpen(false);
  };

  const selectedChat = chats.find((chat) => chat.id === selectedChatId);
  const chatMessages = messages.filter(
    (message) => message.chatId === selectedChatId
  );

  return (
    <div className="flex h-screen bg-gray-100 overflow-hidden">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`
        fixed lg:static inset-y-0 left-0 z-50 w-80 bg-white border-r border-gray-200 transform transition-transform duration-300 ease-in-out flex flex-col
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
      `}
      >
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <h1 className="text-xl font-semibold text-gray-900">Chats</h1>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              // onClick={logout}
              className="text-gray-600 hover:text-gray-900"
            >
              <LogOut className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>
        <ChatSidebar
          chats={chats}
          selectedChatId={selectedChatId}
          onSelectChat={setSelectedChatId}
          onNewChat={() => setNewChatDialogOpen(true)}
        />
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-h-0">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden"
            >
              <Menu className="h-4 w-4" />
            </Button>
            <div>
              <h2 className="font-semibold text-gray-900">
                {selectedChat?.name || "Select a chat"}
              </h2>
              <p className="text-sm text-gray-500">
                {selectedChat ? "Online" : ""}
              </p>
            </div>
          </div>
          <div className="hidden lg:flex items-center gap-2">
            <span className="text-sm text-gray-600">Welcome, {user?.name}</span>
            <Button
              variant="ghost"
              size="sm"
              // onClick={logout}
              className="text-gray-600 hover:text-gray-900"
            >
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Chat window */}
        <div className="flex-1 min-h-0">
          {selectedChatId ? (
            <ChatWindow
              messages={chatMessages}
              currentUserId={user?.id || ""}
              onSendMessage={handleSendMessage}
            />
          ) : (
            <div className="flex items-center justify-center h-full text-gray-500 bg-gray-50">
              <div className="text-center">
                <h3 className="text-lg font-medium mb-2">Welcome to ChatApp</h3>
                <p>Select a conversation to start chatting</p>
                <Button
                  className="mt-4 bg-teal-600 hover:bg-teal-700"
                  onClick={() => setNewChatDialogOpen(true)}
                >
                  Start a new conversation
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* New Chat Dialog */}
      <NewChatDialog
        open={newChatDialogOpen}
        onOpenChange={setNewChatDialogOpen}
        onCreateChat={handleCreateChat}
      />
    </div>
  );
}
