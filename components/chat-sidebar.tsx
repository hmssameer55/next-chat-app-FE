"use client"

import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { PlusCircle } from "lucide-react"

interface Chat {
  id: string
  name: string
  lastMessage: string
  timestamp: string
  unread: number
}

interface ChatSidebarProps {
  chats: Chat[]
  selectedChatId: string | null
  onSelectChat: (chatId: string) => void
  onNewChat: () => void
}

export function ChatSidebar({ chats, selectedChatId, onSelectChat, onNewChat }: ChatSidebarProps) {
  return (
    <div className="flex flex-col h-full overflow-hidden">
      <div className="p-3">
        <Button
          variant="outline"
          className="w-full justify-start gap-2 text-teal-600 border-teal-200 hover:bg-teal-50 hover:text-teal-700"
          onClick={onNewChat}
        >
          <PlusCircle className="h-4 w-4" />
          New Conversation
        </Button>
      </div>

      <div className="flex-1 overflow-y-auto min-h-0">
        {chats.map((chat) => (
          <div
            key={chat.id}
            onClick={() => onSelectChat(chat.id)}
            className={cn(
              "flex items-center gap-3 p-4 hover:bg-gray-50 cursor-pointer border-b border-gray-100 transition-colors",
              selectedChatId === chat.id && "bg-teal-50 border-teal-200",
            )}
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
                <h3 className="font-medium text-gray-900 truncate">{chat.name}</h3>
                <span className="text-xs text-gray-500 flex-shrink-0">{chat.timestamp}</span>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-sm text-gray-600 truncate">{chat.lastMessage}</p>
                {chat.unread > 0 && (
                  <Badge variant="default" className="ml-2 bg-teal-600 text-white">
                    {chat.unread}
                  </Badge>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
