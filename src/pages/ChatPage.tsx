
import { useState, useEffect } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, MessageCircle } from "lucide-react";
import { ChatService } from "@/services/chatService";
import { ChatRoom } from "@/types/chat";
import { toast } from "sonner";
import { ChatRoomDialog } from "@/components/chat/ChatRoomDialog";
import { ChatWindow } from "@/components/chat/ChatWindow";

export default function ChatPage() {
  const [rooms, setRooms] = useState<ChatRoom[]>([]);
  const [selectedRoom, setSelectedRoom] = useState<ChatRoom | null>(null);
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadChatRooms();
  }, []);

  const loadChatRooms = async () => {
    try {
      setLoading(true);
      const chatRooms = await ChatService.getChatRooms();
      setRooms(chatRooms);
    } catch (error) {
      console.error('Error loading chat rooms:', error);
      toast.error('Failed to load chat rooms');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateRoom = async (name: string, description?: string) => {
    try {
      const newRoom = await ChatService.createChatRoom(name, description);
      await ChatService.joinChatRoom(newRoom.id);
      setRooms(prev => [newRoom, ...prev]);
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
    } catch (error) {
      console.error('Error joining room:', error);
      toast.error('Failed to join room');
    }
  };

  if (loading) {
    return (
      <AppLayout>
        <div className="flex items-center justify-center h-64">
          <div className="text-center">Loading chat rooms...</div>
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
                Chat Rooms
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
            <div className="space-y-2 p-4">
              {rooms.length === 0 ? (
                <div className="text-center text-muted-foreground py-8">
                  <MessageCircle className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>No chat rooms yet</p>
                  <p className="text-sm">Create your first room to get started</p>
                </div>
              ) : (
                rooms.map((room) => (
                  <div
                    key={room.id}
                    className={`p-3 rounded-lg cursor-pointer transition-colors ${
                      selectedRoom?.id === room.id
                        ? 'bg-primary/10 border border-primary/20'
                        : 'hover:bg-muted/50'
                    }`}
                    onClick={() => handleJoinRoom(room)}
                  >
                    <h3 className="font-medium">{room.name}</h3>
                    {room.description && (
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {room.description}
                      </p>
                    )}
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>

        {/* Chat Window */}
        <div className="flex-1">
          {selectedRoom ? (
            <ChatWindow room={selectedRoom} />
          ) : (
            <Card className="h-full flex items-center justify-center">
              <div className="text-center text-muted-foreground">
                <MessageCircle className="h-16 w-16 mx-auto mb-4 opacity-50" />
                <h3 className="text-lg font-medium mb-2">Welcome to Team Chat</h3>
                <p>Select a chat room to start messaging with your team</p>
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
