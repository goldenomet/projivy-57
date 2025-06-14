
import { useState, useEffect } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { ChatService } from "@/services/chatService";
import { ChatRoom } from "@/types/chat";
import { toast } from "sonner";
import { ChatRoomDialog } from "@/components/chat/ChatRoomDialog";
import { ChatWindow } from "@/components/chat/ChatWindow";
import { ChatSidebar } from "@/components/chat/ChatSidebar";
import { ChatEmptyState } from "@/components/chat/ChatEmptyState";

export default function ChatPage() {
  const [myRooms, setMyRooms] = useState<ChatRoom[]>([]);
  const [publicRooms, setPublicRooms] = useState<ChatRoom[]>([]);
  const [selectedRoom, setSelectedRoom] = useState<ChatRoom | null>(null);
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

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

  return (
    <AppLayout>
      <div className="h-[calc(100vh-8rem)] flex">
        <ChatSidebar
          myRooms={myRooms}
          publicRooms={publicRooms}
          selectedRoom={selectedRoom}
          onRoomSelect={setSelectedRoom}
          onCreateRoom={() => setShowCreateDialog(true)}
          onJoinRoom={handleJoinRoom}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          onSearch={handleSearch}
          loading={loading}
        />

        <div className="flex-1 flex flex-col">
          {selectedRoom ? (
            <ChatWindow room={selectedRoom} />
          ) : (
            <ChatEmptyState onCreateRoom={() => setShowCreateDialog(true)} />
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
