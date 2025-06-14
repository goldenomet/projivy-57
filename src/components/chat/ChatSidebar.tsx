
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Plus, Search, Users, MessageCircle, Hash, Sparkles } from "lucide-react";
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
  const [activeTab, setActiveTab] = useState<'my-chats' | 'discover'>('my-chats');

  const displayRooms = activeTab === 'my-chats' ? myRooms : publicRooms;

  if (loading) {
    return (
      <div className="w-80 border-r border-border flex flex-col bg-gradient-to-b from-card to-card/80">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="animate-spin h-8 w-8 border-2 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading amazing chats...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-80 border-r border-border flex flex-col bg-gradient-to-b from-card to-card/80">
      {/* Enhanced Header */}
      <div className="p-6 border-b border-border bg-gradient-to-r from-primary/5 to-primary/10">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center">
              <MessageCircle className="h-4 w-4 text-white" />
            </div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
              Team Chat
            </h1>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={onCreateRoom}
            className="h-8 w-8 bg-primary/10 hover:bg-primary/20 text-primary"
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>
        
        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search conversations..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && onSearch()}
            className="pl-10 bg-background/50 border-2 border-muted/20 focus:border-primary/50 rounded-xl"
          />
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="px-4 py-3 border-b border-border bg-muted/20">
        <div className="flex gap-1 p-1 bg-muted/50 rounded-lg">
          <button
            onClick={() => setActiveTab('my-chats')}
            className={`flex-1 flex items-center justify-center gap-2 px-3 py-2 text-sm font-medium rounded-md transition-all duration-200 ${
              activeTab === 'my-chats'
                ? 'bg-primary text-primary-foreground shadow-sm'
                : 'text-muted-foreground hover:text-foreground hover:bg-background/50'
            }`}
          >
            <Hash className="h-4 w-4" />
            My Chats
            {myRooms.length > 0 && (
              <Badge variant="secondary" className="ml-1 h-5 w-5 text-xs p-0 flex items-center justify-center">
                {myRooms.length}
              </Badge>
            )}
          </button>
          <button
            onClick={() => setActiveTab('discover')}
            className={`flex-1 flex items-center justify-center gap-2 px-3 py-2 text-sm font-medium rounded-md transition-all duration-200 ${
              activeTab === 'discover'
                ? 'bg-primary text-primary-foreground shadow-sm'
                : 'text-muted-foreground hover:text-foreground hover:bg-background/50'
            }`}
          >
            <Sparkles className="h-4 w-4" />
            Discover
          </button>
        </div>
      </div>

      {/* Chat List */}
      <div className="flex-1 overflow-auto">
        {displayRooms.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center p-8">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center mb-4">
              <MessageCircle className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-lg font-semibold mb-2">
              {activeTab === 'my-chats' ? 'No chats yet' : 'No rooms found'}
            </h3>
            <p className="text-sm text-muted-foreground mb-4">
              {activeTab === 'my-chats' 
                ? 'Start connecting with your team by creating a new chat room'
                : 'Try adjusting your search or check back later for new rooms'
              }
            </p>
            {activeTab === 'my-chats' && (
              <Button onClick={onCreateRoom} className="bg-gradient-to-r from-primary to-primary/80">
                <Plus className="h-4 w-4 mr-2" />
                Create Your First Chat
              </Button>
            )}
          </div>
        ) : (
          <ChatRoomList
            rooms={displayRooms}
            selectedRoom={selectedRoom}
            onRoomSelect={onRoomSelect}
            onJoinRoom={onJoinRoom}
          />
        )}
      </div>

      {/* Enhanced Footer */}
      <div className="p-4 border-t border-border bg-gradient-to-r from-muted/20 to-muted/10">
        <div className="grid grid-cols-2 gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setActiveTab('discover')}
            className="flex items-center gap-2 bg-background/50"
          >
            <Users className="h-4 w-4" />
            Explore
          </Button>
          <Button
            size="sm"
            onClick={onCreateRoom}
            className="flex items-center gap-2 bg-gradient-to-r from-primary to-primary/80"
          >
            <Plus className="h-4 w-4" />
            New Chat
          </Button>
        </div>
      </div>
    </div>
  );
}
