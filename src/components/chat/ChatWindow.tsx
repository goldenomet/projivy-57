
import { useState, useEffect, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Send, Paperclip, Mic, MicOff, Users, Hash } from "lucide-react";
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
  const [showMembers, setShowMembers] = useState(false);
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
    <Card className="h-full flex flex-col">
      <CardHeader className="flex-shrink-0 border-b">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <Hash className="h-5 w-5 text-muted-foreground" />
              <CardTitle className="text-lg">{room.name}</CardTitle>
            </div>
            <Badge variant="secondary" className="text-xs">
              <Users className="h-3 w-3 mr-1" />
              {members.length} member{members.length !== 1 ? 's' : ''}
            </Badge>
          </div>
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => setShowMembers(!showMembers)}
          >
            <Users className="h-4 w-4 mr-2" />
            Members
          </Button>
        </div>
        {room.description && (
          <p className="text-sm text-muted-foreground mt-2">{room.description}</p>
        )}
      </CardHeader>

      <CardContent className="flex-1 flex flex-col p-0">
        <div className="flex flex-1 overflow-hidden">
          {/* Messages Area */}
          <div className="flex-1 overflow-auto">
            <MessageList messages={messages} currentUserId={user?.id} loading={loading} />
          </div>

          {/* Members Panel */}
          {showMembers && (
            <div className="w-64 border-l bg-muted/20 overflow-auto">
              <div className="p-4">
                <h3 className="font-medium text-sm mb-3">Room Members</h3>
                <div className="space-y-2">
                  {members.map((member) => (
                    <div key={member.id} className="flex items-center gap-2 p-2 rounded-md bg-background">
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
                          Joined {new Date(member.joined_at).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Voice Recorder */}
        {isRecording && (
          <div className="border-t border-b p-4">
            <VoiceRecorder
              onSave={handleVoiceMessage}
              onCancel={() => setIsRecording(false)}
            />
          </div>
        )}

        {/* File Uploader */}
        {showFileUploader && (
          <div className="border-t border-b p-4">
            <FileUploader
              onUpload={handleFileUpload}
              onCancel={() => setShowFileUploader(false)}
            />
          </div>
        )}

        {/* Message Input */}
        <div className="border-t p-4">
          <form onSubmit={handleSendMessage} className="flex items-center gap-2">
            <Button
              type="button"
              variant="outline"
              size="icon"
              onClick={() => setShowFileUploader(!showFileUploader)}
            >
              <Paperclip className="h-4 w-4" />
            </Button>
            
            <Button
              type="button"
              variant="outline"
              size="icon"
              onClick={() => setIsRecording(!isRecording)}
              className={isRecording ? "bg-red-100 border-red-300" : ""}
            >
              {isRecording ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
            </Button>

            <Input
              ref={inputRef}
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder={`Message #${room.name}`}
              disabled={sending}
              className="flex-1"
            />
            
            <Button type="submit" disabled={!newMessage.trim() || sending} size="icon">
              <Send className="h-4 w-4" />
            </Button>
          </form>
        </div>
      </CardContent>
    </Card>
  );
}
