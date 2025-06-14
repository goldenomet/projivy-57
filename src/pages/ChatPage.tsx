
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
  const [selectedRoom, setSelectedRoom] = useState<ChatRoom | null>(null);
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadInitialData();
  }, []);

  const loadInitialData = async () => {
    try {
      setLoading(true);
      await loadMyChatRooms();
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
      console.log('Loaded my rooms:', rooms);
      setMyRooms(rooms);
      
      // Auto-select first room if none selected
      if (rooms.length > 0 && !selectedRoom) {
        setSelectedRoom(rooms[0]);
      }
    } catch (error) {
      console.error('Error loading my chat rooms:', error);
      toast.error('Failed to load your chat rooms');
    }
  };

  const handleCreateRoom = async (name: string, description?: string) => {
    try {
      console.log('Creating room:', { name, description });
      const newRoom = await ChatService.createChatRoom(name, description);
      console.log('Room created:', newRoom);
      
      // Update the rooms list and select the new room
      setMyRooms(prev => [newRoom, ...prev]);
      setSelectedRoom(newRoom);
      setShowCreateDialog(false);
      toast.success(`Chat room "${name}" created successfully`);
    } catch (error) {
      console.error('Error creating chat room:', error);
      if (error instanceof Error) {
        toast.error(`Failed to create chat room: ${error.message}`);
      } else {
        toast.error('Failed to create chat room');
      }
    }
  };

  return (
    <AppLayout>
      <div className="h-[calc(100vh-8rem)] flex">
        <ChatSidebar
          myRooms={myRooms}
          publicRooms={[]} // No public rooms anymore
          selectedRoom={selectedRoom}
          onRoomSelect={setSelectedRoom}
          onCreateRoom={() => setShowCreateDialog(true)}
          onJoinRoom={() => {}} // Not needed for private rooms
          searchQuery=""
          onSearchChange={() => {}} // Not needed for private rooms
          onSearch={() => {}} // Not needed for private rooms
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
