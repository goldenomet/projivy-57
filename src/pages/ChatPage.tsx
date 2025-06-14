
import { useState, useEffect } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Plus, MessageCircle, Search, Users, Hash, MoreVertical } from "lucide-react";
import { ChatService } from "@/services/chatService";
import { ChatRoom } from "@/types/chat";
import { toast } from "sonner";
import { ChatRoomDialog } from "@/components/chat/ChatRoomDialog";
import { ChatWindow } from "@/components/chat/ChatWindow";

export default function ChatPage() {
  const [myRooms, setMyRooms] = useState<ChatRoom[]>([]);
  const [publicRooms, setPublicRooms] = useState<ChatRoom[]>([]);
  const [selectedRoom, setSelectedRoom] = useState<ChatRoom | null>(null);
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [showSearch, setShowSearch] = useState(false);

  useEffect(() => {
    loadInitialData();
  }, []);

  const loadInitialData = async () => {
    try {
      setLoading(true);
      await Promise.all([
        loadMyChatRooms(),
        loadPublicRooms()
      ]);
    } catch (error) {
      console.error('Error loading chat data:', error);
      toast.error('Failed to load chat rooms');
    } finally {
      setLoading(false);
    }
  };

  const loadMyChatRooms = async () => {
    try {
      const rooms = await ChatService.getChatRooms();
      setMyRooms(rooms);
      
      // Auto-select first room if none selected
      if (rooms.length > 0 && !selectedRoom) {
        setSelectedRoom(rooms[0]);
      }
    } catch (error) {
      console.error('Error loading my chat rooms:', error);
    }
  };

  const loadPublicRooms = async () => {
    try {
      const rooms = await ChatService.getAllPublicRooms();
      setPublicRooms(rooms);
    } catch (error) {
      console.error('Error loading public rooms:', error);
    }
  };

  const handleCreateRoom = async (name: string, description?: string) => {
    try {
      const newRoom = await ChatService.createChatRoom(name, description);
      await ChatService.joinChatRoom(newRoom.id);
      setMyRooms(prev => [newRoom, ...prev]);
      setSelectedRoom(newRoom);
      setShowCreateDialog(false);
      toast.success('Chat room created successfully');
    } catch (error) {
      console.error('Error creating chat room:', error);
      toast.error('Failed to create chat room');
    }
  };

  const handleJoinRoom = async (room: ChatRoom) => {
    try {
      await ChatService.joinChatRoom(room.id);
      setSelectedRoom(room);
      
      // Add to my rooms if not already there
      if (!myRooms.find(r => r.id === room.id)) {
        setMyRooms(prev => [room, ...prev]);
      }
      
      toast.success(`Joined ${room.name}`);
    } catch (error) {
      console.error('Error joining room:', error);
      toast.error('Failed to join room');
    }
  };

  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      loadPublicRooms();
      return;
    }

    try {
      const results = await ChatService.searchRooms(searchQuery);
      setPublicRooms(results);
    } catch (error) {
      console.error('Error searching rooms:', error);
      toast.error('Failed to search rooms');
    }
  };

  const formatLastMessage = (room: ChatRoom) => {
    return `Last updated ${new Date(room.updated_at).toLocaleDateString()}`;
  };

  const filteredRooms = showSearch 
    ? [...myRooms, ...publicRooms].filter(room => 
        room.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        room.description?.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : myRooms;

  if (loading) {
    return (
      <AppLayout>
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="animate-spin h-8 w-8 border-2 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
            <p>Loading chat rooms...</p>
          </div>
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <div className="h-[calc(100vh-8rem)] flex">
        {/* Chat Rooms Sidebar - Telegram Style */}
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
                  onClick={() => setShowCreateDialog(true)}
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
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
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
                <Button onClick={() => setShowCreateDialog(true)}>
                  <Plus className="h-4 w-4 mr-2" />
                  New Chat
                </Button>
              </div>
            ) : (
              <div className="py-2">
                {filteredRooms.map((room) => (
                  <div
                    key={room.id}
                    className={`flex items-center p-3 mx-2 mb-1 rounded-lg cursor-pointer transition-colors ${
                      selectedRoom?.id === room.id
                        ? 'bg-primary/10 border border-primary/20'
                        : 'hover:bg-muted/50'
                    }`}
                    onClick={() => setSelectedRoom(room)}
                  >
                    {/* Avatar */}
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mr-3 flex-shrink-0">
                      <Hash className="h-6 w-6 text-primary" />
                    </div>
                    
                    {/* Chat Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <h3 className="font-medium truncate text-sm">{room.name}</h3>
                        <span className="text-xs text-muted-foreground ml-2">
                          {new Date(room.updated_at).toLocaleDateString()}
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground truncate">
                        {room.description || 'No description'}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
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
                  loadPublicRooms();
                }}
                className="flex-1"
              >
                <Users className="h-4 w-4 mr-2" />
                Discover
              </Button>
              <Button
                size="sm"
                onClick={() => setShowCreateDialog(true)}
                className="flex-1"
              >
                <Plus className="h-4 w-4 mr-2" />
                New Chat
              </Button>
            </div>
          </div>
        </div>

        {/* Chat Window */}
        <div className="flex-1 flex flex-col">
          {selectedRoom ? (
            <ChatWindow room={selectedRoom} />
          ) : (
            <div className="flex-1 flex items-center justify-center bg-muted/20">
              <div className="text-center max-w-md">
                <MessageCircle className="h-20 w-20 mx-auto mb-6 text-muted-foreground" />
                <h2 className="text-2xl font-semibold mb-4">Welcome to Team Chat</h2>
                <p className="text-muted-foreground mb-6">
                  Select a chat to start messaging or create a new one to get started.
                </p>
                <Button onClick={() => setShowCreateDialog(true)}>
                  <Plus className="h-4 w-4 mr-2" />
                  Create New Chat
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>

      <ChatRoomDialog
        open={showCreateDialog}
        onOpenChange={setShowCreateDialog}
        onCreateRoom={handleCreateRoom}
      />
    </AppLayout>
  );
}
