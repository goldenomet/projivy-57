
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Search, Users, MessageCircle } from "lucide-react";
import { ChatRoom } from "@/types/chat";
import { ChatRoomList } from "./ChatRoomList";

interface ChatSidebarProps {
  myRooms: ChatRoom[];
  publicRooms: ChatRoom[];
  selectedRoom: ChatRoom | null;
  onRoomSelect: (room: ChatRoom) => void;
  onCreateRoom: () => void;
  onJoinRoom: (room: ChatRoom) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onSearch: () => void;
  loading: boolean;
}

export function ChatSidebar({
  myRooms,
  publicRooms,
  selectedRoom,
  onRoomSelect,
  onCreateRoom,
  onJoinRoom,
  searchQuery,
  onSearchChange,
  onSearch,
  loading
}: ChatSidebarProps) {
  const [showSearch, setShowSearch] = useState(false);

  const filteredRooms = showSearch 
    ? [...myRooms, ...publicRooms].filter(room => 
        room.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        room.description?.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : myRooms;

  if (loading) {
    return (
      <div className="w-80 border-r border-border flex flex-col bg-card">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="animate-spin h-8 w-8 border-2 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
            <p>Loading chat rooms...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-80 border-r border-border flex flex-col bg-card">
      {/* Header */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between mb-3">
          <h1 className="text-xl font-semibold">Chats</h1>
          <div className="flex gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setShowSearch(!showSearch)}
              className="h-8 w-8"
            >
              <Search className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={onCreateRoom}
              className="h-8 w-8"
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        </div>
        
        {showSearch && (
          <div className="flex gap-2">
            <Input
              placeholder="Search chats..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && onSearch()}
              className="flex-1"
            />
          </div>
        )}
      </div>

      {/* Chat List */}
      <div className="flex-1 overflow-auto">
        {filteredRooms.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center p-8">
            <MessageCircle className="h-16 w-16 text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium mb-2">No chats yet</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Start a conversation by creating a new chat room
            </p>
            <Button onClick={onCreateRoom}>
              <Plus className="h-4 w-4 mr-2" />
              New Chat
            </Button>
          </div>
        ) : (
          <ChatRoomList
            rooms={filteredRooms}
            selectedRoom={selectedRoom}
            onRoomSelect={onRoomSelect}
            onJoinRoom={onJoinRoom}
          />
        )}
      </div>

      {/* Quick Actions */}
      <div className="p-3 border-t border-border">
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              setShowSearch(true);
            }}
            className="flex-1"
          >
            <Users className="h-4 w-4 mr-2" />
            Discover
          </Button>
          <Button
            size="sm"
            onClick={onCreateRoom}
            className="flex-1"
          >
            <Plus className="h-4 w-4 mr-2" />
            New Chat
          </Button>
        </div>
      </div>
    </div>
  );
}
