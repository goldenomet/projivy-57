
import { useState, useEffect, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Send, Paperclip, Mic, MicOff, Users, Hash, MoreVertical, Phone, Video } from "lucide-react";
import { ChatService } from "@/services/chatService";
import { ChatRoom, ChatMessage, ChatRoomMember } from "@/types/chat";
import { toast } from "sonner";
import { useAuth } from "@/hooks/use-auth";
import { MessageList } from "./MessageList";
import { VoiceRecorder } from "./VoiceRecorder";
import { FileUploader } from "./FileUploader";

interface ChatWindowProps {
  room: ChatRoom;
}

export function ChatWindow({ room }: ChatWindowProps) {
  const { user } = useAuth();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [showFileUploader, setShowFileUploader] = useState(false);
  const [members, setMembers] = useState<ChatRoomMember[]>([]);
  const [showInfo, setShowInfo] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

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

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || sending) return;

    const messageText = newMessage.trim();
    setNewMessage("");
    setSending(true);

    try {
      await ChatService.sendMessage(room.id, messageText);
    } catch (error) {
      console.error('Error sending message:', error);
      toast.error('Failed to send message');
      setNewMessage(messageText); // Restore message on error
    } finally {
      setSending(false);
      inputRef.current?.focus();
    }
  };

  const handleFileUpload = async (file: File) => {
    try {
      await ChatService.sendFileMessage(room.id, file);
      setShowFileUploader(false);
      toast.success('File uploaded successfully');
    } catch (error) {
      console.error('Error uploading file:', error);
      toast.error('Failed to upload file');
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
    }
  };

  return (
    <div className="h-full flex flex-col">
      {/* Chat Header - Telegram Style */}
      <div className="border-b border-border p-4 bg-card">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
              <Hash className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h2 className="font-semibold text-lg">{room.name}</h2>
              <p className="text-sm text-muted-foreground">
                {members.length} member{members.length !== 1 ? 's' : ''}
                {members.length > 0 && ' • online'}
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <Phone className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <Video className="h-4 w-4" />
            </Button>
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-8 w-8"
              onClick={() => setShowInfo(!showInfo)}
            >
              <MoreVertical className="h-4 w-4" />
            </Button>
          </div>
        </div>
        
        {room.description && (
          <p className="text-sm text-muted-foreground mt-2 ml-13">{room.description}</p>
        )}
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-hidden">
        <MessageList messages={messages} currentUserId={user?.id} loading={loading} />
      </div>

      {/* Voice Recorder */}
      {isRecording && (
        <div className="border-t border-b p-4 bg-muted/50">
          <VoiceRecorder
            onSave={handleVoiceMessage}
            onCancel={() => setIsRecording(false)}
          />
        </div>
      )}

      {/* File Uploader */}
      {showFileUploader && (
        <div className="border-t border-b p-4 bg-muted/50">
          <FileUploader
            onUpload={handleFileUpload}
            onCancel={() => setShowFileUploader(false)}
          />
        </div>
      )}

      {/* Message Input - Telegram Style */}
      <div className="border-t border-border p-4 bg-card">
        <form onSubmit={handleSendMessage} className="flex items-end gap-3">
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={() => setShowFileUploader(!showFileUploader)}
            className="h-10 w-10 flex-shrink-0"
          >
            <Paperclip className="h-5 w-5" />
          </Button>
          
          <div className="flex-1 relative">
            <Input
              ref={inputRef}
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder={`Message ${room.name}...`}
              disabled={sending}
              className="pr-12 resize-none min-h-[40px] rounded-full border-2"
            />
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={() => setIsRecording(!isRecording)}
              className={`absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 ${
                isRecording ? "text-red-500" : ""
              }`}
            >
              {isRecording ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
            </Button>
          </div>

          <Button 
            type="submit" 
            disabled={!newMessage.trim() || sending} 
            size="icon"
            className="h-10 w-10 flex-shrink-0 rounded-full"
          >
            <Send className="h-4 w-4" />
          </Button>
        </form>
      </div>

      {/* Info Panel */}
      {showInfo && (
        <div className="absolute right-4 top-16 w-80 bg-card border border-border rounded-lg shadow-lg z-50 p-4">
          <h3 className="font-medium text-sm mb-3 flex items-center gap-2">
            <Users className="h-4 w-4" />
            Chat Members ({members.length})
          </h3>
          <div className="space-y-2 max-h-60 overflow-auto">
            {members.map((member) => (
              <div key={member.id} className="flex items-center gap-2 p-2 rounded-md bg-muted/50">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="text-xs font-medium">
                    {member.user_id.charAt(0).toUpperCase()}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">
                    {member.user_id === user?.id ? 'You' : `User ${member.user_id.slice(-4)}`}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {member.is_active ? 'Online' : 'Offline'}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
