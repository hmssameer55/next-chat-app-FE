"use client";

import { useState } from "react";
import { PlusCircle } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
} from "@/components/ui/sidebar";
import { NewChatDialog } from "./new-chat-dialog";
import { Button } from "./ui/button";
import Link from "next/link";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { useParams } from "next/navigation";

const mockChats = [
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

export function AppSidebar() {
  const params = useParams();

  const [isNewChatDialogOpen, setIsNewChatDialogOpen] = useState(false);

  const OpenNewChatDialog = () => {
    setIsNewChatDialogOpen(true);
  };

  const handleCreateChat = (userId: string, userName: string) => {
    console.log(`Creating chat with user ${userId} (${userName})`);
    setIsNewChatDialogOpen(false);
  };

  return (
    <>
      <NewChatDialog
        open={isNewChatDialogOpen}
        onOpenChange={setIsNewChatDialogOpen}
        onCreateChat={handleCreateChat}
      />
      <Sidebar>
        <SidebarHeader>
          <h1>Chat App</h1>
          <div className="p-3">
            <Button
              variant="outline"
              className="w-full justify-start gap-2 text-teal-600 border-teal-200 hover:bg-teal-50 hover:text-teal-700"
              onClick={OpenNewChatDialog}
            >
              <PlusCircle className="h-4 w-4" />
              New Conversation
            </Button>
          </div>
        </SidebarHeader>
        <SidebarContent>
          <div className="flex-1 overflow-y-auto min-h-0">
            {mockChats.map((chat) => (
              <Link
                href={`/chats/${chat.id}`}
                key={chat.id}
                className={`flex items-center gap-3 p-4 ${
                  params.id !== chat.id && "hover:bg-gray-100"
                } cursor-pointer border-b border-gray-100 transition-colors ${
                  params.id == chat.id && "bg-emerald-200"
                }`}
              >
                <Avatar className="h-12 w-12">
                  <AvatarFallback className="bg-teal-100 text-teal-600">
                    {chat.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")
                      .toUpperCase()}
                  </AvatarFallback>
                </Avatar>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="font-medium text-gray-900 truncate">
                      {chat.name}
                    </h3>
                    <span className="text-xs text-gray-500 flex-shrink-0">
                      {chat.timestamp}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-gray-600 truncate">
                      {chat.lastMessage}
                    </p>
                    {chat.unread > 0 && (
                      <Badge
                        variant="default"
                        className="ml-2 bg-teal-600 text-white"
                      >
                        {chat.unread}
                      </Badge>
                    )}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </SidebarContent>
      </Sidebar>
    </>
  );
}
