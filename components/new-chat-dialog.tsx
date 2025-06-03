"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Search, UserPlus } from "lucide-react"

interface User {
  id: string
  name: string
  email: string
}

interface NewChatDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onCreateChat: (userId: string, userName: string) => void
}

export function NewChatDialog({ open, onOpenChange, onCreateChat }: NewChatDialogProps) {
  const [searchQuery, setSearchQuery] = useState("")

  // Mock user data - in a real app, this would come from an API
  const mockUsers: User[] = [
    { id: "user1", name: "Alice Johnson", email: "alice@example.com" },
    { id: "user2", name: "Bob Smith", email: "bob@example.com" },
    { id: "user3", name: "Carol Davis", email: "carol@example.com" },
    { id: "user4", name: "David Wilson", email: "david@example.com" },
    { id: "user5", name: "Emma Brown", email: "emma@example.com" },
    { id: "user6", name: "Frank Miller", email: "frank@example.com" },
    { id: "user7", name: "Grace Lee", email: "grace@example.com" },
  ]

  const filteredUsers = searchQuery
    ? mockUsers.filter(
        (user) =>
          user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          user.email.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    : mockUsers

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>New Conversation</DialogTitle>
        </DialogHeader>

        <div className="relative mt-2">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
          <Input
            placeholder="Search for users..."
            className="pl-9"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="mt-4 max-h-[300px] overflow-y-auto">
          {filteredUsers.length > 0 ? (
            <div className="space-y-1">
              {filteredUsers.map((user) => (
                <div
                  key={user.id}
                  className="flex items-center gap-3 p-2 rounded-md hover:bg-gray-100 cursor-pointer"
                  onClick={() => {
                    onCreateChat(user.id, user.name)
                    onOpenChange(false)
                  }}
                >
                  <Avatar className="h-10 w-10">
                    <AvatarFallback className="bg-teal-100 text-teal-600">
                      {user.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")
                        .toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-gray-900">{user.name}</p>
                    <p className="text-sm text-gray-500 truncate">{user.email}</p>
                  </div>
                  <Button size="sm" variant="ghost" className="text-teal-600">
                    <UserPlus className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          ) : (
            <div className="py-6 text-center text-gray-500">
              <p>No users found</p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
