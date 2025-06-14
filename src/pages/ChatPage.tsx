
import { useState, useEffect } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, MessageCircle, Search, Users, Hash } from "lucide-react";
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
  const [activeTab, setActiveTab] = useState("my-rooms");

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

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

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
      <div className="h-[calc(100vh-8rem)] flex gap-4">
        {/* Chat Rooms Sidebar */}
        <Card className="w-80 flex flex-col">
          <CardHeader className="flex-shrink-0">
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <MessageCircle className="h-5 w-5" />
                Team Chat
              </CardTitle>
              <Button
                size="sm"
                onClick={() => setShowCreateDialog(true)}
                className="h-8 w-8 p-0"
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          
          <CardContent className="flex-1 overflow-auto p-0">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="h-full">
              <TabsList className="grid w-full grid-cols-2 mx-4 mb-4">
                <TabsTrigger value="my-rooms" className="text-xs">
                  My Rooms ({myRooms.length})
                </TabsTrigger>
                <TabsTrigger value="discover" className="text-xs">
                  Discover
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="my-rooms" className="px-4 mt-0">
                {myRooms.length === 0 ? (
                  <div className="text-center text-muted-foreground py-8">
                    <Hash className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p className="font-medium">No rooms yet</p>
                    <p className="text-sm">Create your first room to get started</p>
                  </div>
                ) : (
                  <div className="space-y-2">
                    {myRooms.map((room) => (
                      <div
                        key={room.id}
                        className={`p-3 rounded-lg cursor-pointer transition-colors border ${
                          selectedRoom?.id === room.id
                            ? 'bg-primary/10 border-primary/20'
                            : 'hover:bg-muted/50 border-transparent'
                        }`}
                        onClick={() => handleJoinRoom(room)}
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1 min-w-0">
                            <h3 className="font-medium truncate"># {room.name}</h3>
                            {room.description && (
                              <p className="text-sm text-muted-foreground line-clamp-2 mt-1">
                                {room.description}
                              </p>
                            )}
                          </div>
                        </div>
                        <div className="flex items-center justify-between mt-2">
                          <span className="text-xs text-muted-foreground">
                            {formatDate(room.updated_at)}
                          </span>
                          <Badge variant="secondary" className="text-xs">
                            <Users className="h-3 w-3 mr-1" />
                            Room
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </TabsContent>
              
              <TabsContent value="discover" className="px-4 mt-0">
                <div className="space-y-4">
                  <div className="flex gap-2">
                    <Input
                      placeholder="Search rooms..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                      className="flex-1"
                    />
                    <Button variant="outline" size="icon" onClick={handleSearch}>
                      <Search className="h-4 w-4" />
                    </Button>
                  </div>
                  
                  {publicRooms.length === 0 ? (
                    <div className="text-center text-muted-foreground py-8">
                      <Search className="h-12 w-12 mx-auto mb-4 opacity-50" />
                      <p className="font-medium">No rooms found</p>
                      <p className="text-sm">Try a different search term</p>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      {publicRooms.map((room) => (
                        <div
                          key={room.id}
                          className="p-3 rounded-lg border hover:bg-muted/50 cursor-pointer transition-colors"
                          onClick={() => handleJoinRoom(room)}
                        >
                          <div className="flex items-start justify-between">
                            <div className="flex-1 min-w-0">
                              <h3 className="font-medium truncate"># {room.name}</h3>
                              {room.description && (
                                <p className="text-sm text-muted-foreground line-clamp-2 mt-1">
                                  {room.description}
                                </p>
                              )}
                            </div>
                          </div>
                          <div className="flex items-center justify-between mt-2">
                            <span className="text-xs text-muted-foreground">
                              Created {formatDate(room.created_at)}
                            </span>
                            <Badge variant="outline" className="text-xs">
                              <Plus className="h-3 w-3 mr-1" />
                              Join
                            </Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* Chat Window */}
        <div className="flex-1">
          {selectedRoom ? (
            <ChatWindow room={selectedRoom} />
          ) : (
            <Card className="h-full flex items-center justify-center">
              <div className="text-center text-muted-foreground max-w-md">
                <MessageCircle className="h-16 w-16 mx-auto mb-4 opacity-50" />
                <h3 className="text-lg font-medium mb-2">Welcome to Team Chat</h3>
                <p className="mb-4">Connect with your team in real-time. Create chat rooms, share files, and collaborate effectively.</p>
                <div className="space-y-2 text-sm">
                  <p>• Create new chat rooms for different topics</p>
                  <p>• Join existing rooms to participate in discussions</p>
                  <p>• Share files and voice messages</p>
                </div>
              </div>
            </Card>
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
