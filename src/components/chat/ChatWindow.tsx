
import { useState, useEffect, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send, Paperclip, Mic, MicOff, Users } from "lucide-react";
import { ChatService } from "@/services/chatService";
import { ChatRoom, ChatMessage } from "@/types/chat";
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
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    loadMessages();
    
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
          <div>
            <CardTitle className="text-lg">{room.name}</CardTitle>
            {room.description && (
              <p className="text-sm text-muted-foreground mt-1">{room.description}</p>
            )}
          </div>
          <Button variant="outline" size="sm">
            <Users className="h-4 w-4 mr-2" />
            Members
          </Button>
        </div>
      </CardHeader>

      <CardContent className="flex-1 flex flex-col p-0">
        {/* Messages Area */}
        <div className="flex-1 overflow-auto">
          <MessageList messages={messages} currentUserId={user?.id} loading={loading} />
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
              placeholder="Type your message..."
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
