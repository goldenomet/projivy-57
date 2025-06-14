
import { useState, useEffect } from "react";
import { ChatService } from "@/services/chatService";
import { ChatRoom, ChatMessage, ChatRoomMember } from "@/types/chat";
import { toast } from "sonner";
import { useAuth } from "@/hooks/use-auth";
import { MessageList } from "./MessageList";
import { ChatHeader } from "./ChatHeader";
import { ChatMessageInput } from "./ChatMessageInput";
import { ChatInfoPanel } from "./ChatInfoPanel";

interface ChatWindowProps {
  room: ChatRoom;
}

export function ChatWindow({ room }: ChatWindowProps) {
  const { user } = useAuth();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [members, setMembers] = useState<ChatRoomMember[]>([]);
  const [showInfo, setShowInfo] = useState(false);

  // Check if current user is admin
  const isAdmin = members.some(m => 
    m.user_id === user?.id && (m.role === 'admin' || room.created_by === user?.id)
  );

  useEffect(() => {
    loadMessages();
    loadMembers();
    
    // Subscribe to real-time messages
    const subscription = ChatService.subscribeToMessages(room.id, (message) => {
      setMessages(prev => [...prev, message]);
    });

    return () => {
      if (subscription) {
        subscription.unsubscribe();
      }
    };
  }, [room.id]);

  const loadMessages = async () => {
    try {
      setLoading(true);
      const roomMessages = await ChatService.getMessages(room.id);
      setMessages(roomMessages);
    } catch (error) {
      console.error('Error loading messages:', error);
      toast.error('Failed to load messages');
    } finally {
      setLoading(false);
    }
  };

  const loadMembers = async () => {
    try {
      const roomMembers = await ChatService.getRoomMembers(room.id);
      setMembers(roomMembers);
    } catch (error) {
      console.error('Error loading members:', error);
    }
  };

  const handleSendMessage = async (messageText: string) => {
    setSending(true);
    try {
      await ChatService.sendMessage(room.id, messageText);
    } catch (error) {
      console.error('Error sending message:', error);
      toast.error('Failed to send message');
      throw error; // Re-throw to handle in input component
    } finally {
      setSending(false);
    }
  };

  const handleFileUpload = async (file: File) => {
    try {
      await ChatService.sendFileMessage(room.id, file);
      toast.success('File uploaded successfully');
    } catch (error) {
      console.error('Error uploading file:', error);
      toast.error('Failed to upload file');
      throw error;
    }
  };

  const handleVoiceMessage = async (audioBlob: Blob, duration: number) => {
    try {
      const file = new File([audioBlob], `voice-${Date.now()}.webm`, { type: 'audio/webm' });
      await ChatService.sendFileMessage(room.id, file);
      toast.success('Voice message sent');
    } catch (error) {
      console.error('Error sending voice message:', error);
      toast.error('Failed to send voice message');
      throw error;
    }
  };

  return (
    <div className="h-full flex flex-col">
      {/* Chat Header */}
      <ChatHeader
        room={room}
        members={members}
        showInfo={showInfo}
        onToggleInfo={() => setShowInfo(!showInfo)}
      />

      {/* Messages Area */}
      <div className="flex-1 overflow-hidden">
        <MessageList messages={messages} currentUserId={user?.id} loading={loading} />
      </div>

      {/* Message Input */}
      <ChatMessageInput
        roomName={room.name}
        onSendMessage={handleSendMessage}
        onFileUpload={handleFileUpload}
        onVoiceMessage={handleVoiceMessage}
        sending={sending}
      />

      {/* Info Panel */}
      <ChatInfoPanel
        members={members}
        currentUserId={user?.id}
        roomId={room.id}
        isAdmin={isAdmin}
        show={showInfo}
        onClose={() => setShowInfo(false)}
      />
    </div>
  );
}
