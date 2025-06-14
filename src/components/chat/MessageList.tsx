
import { useEffect, useRef } from "react";
import { ChatMessage } from "@/types/chat";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { FileText, Download, Play } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

interface MessageListProps {
  messages: ChatMessage[];
  currentUserId?: string;
  loading: boolean;
}

export function MessageList({ messages, currentUserId, loading }: MessageListProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center text-muted-foreground">
          <div className="animate-spin h-6 w-6 border-2 border-primary border-t-transparent rounded-full mx-auto mb-2"></div>
          Loading messages...
        </div>
      </div>
    );
  }

  if (messages.length === 0) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center text-muted-foreground">
          <p className="text-lg mb-2">No messages yet</p>
          <p className="text-sm">Start the conversation by sending a message</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 space-y-4">
      {messages.map((message) => {
        const isOwnMessage = message.sender_id === currentUserId;
        
        return (
          <div
            key={message.id}
            className={`flex items-start gap-3 ${isOwnMessage ? 'flex-row-reverse' : ''}`}
          >
            <Avatar className="w-8 h-8 flex-shrink-0">
              <AvatarFallback>
                {message.sender_id?.charAt(0)?.toUpperCase() || 'U'}
              </AvatarFallback>
            </Avatar>
            
            <div className={`flex-1 max-w-[70%] ${isOwnMessage ? 'text-right' : ''}`}>
              <Card className={`p-3 ${isOwnMessage ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}>
                {message.message_type === 'text' && (
                  <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                )}
                
                {message.message_type === 'file' && (
                  <div className="flex items-center gap-2">
                    <FileText className="h-4 w-4 flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{message.file_name}</p>
                      <p className="text-xs opacity-70">
                        {message.file_size ? `${(message.file_size / 1024).toFixed(1)} KB` : 'File'}
                      </p>
                    </div>
                    {message.file_url && (
                      <a
                        href={message.file_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1 hover:bg-black/10 rounded"
                      >
                        <Download className="h-4 w-4" />
                      </a>
                    )}
                  </div>
                )}
                
                {message.message_type === 'voice' && (
                  <div className="flex items-center gap-2">
                    <Play className="h-4 w-4 flex-shrink-0" />
                    <div className="flex-1">
                      <p className="text-sm font-medium">Voice Message</p>
                      <p className="text-xs opacity-70">
                        {message.voice_duration ? `${message.voice_duration}s` : 'Audio'}
                      </p>
                    </div>
                    {message.file_url && (
                      <audio controls className="max-w-[200px]">
                        <source src={message.file_url} type="audio/webm" />
                        Your browser does not support the audio element.
                      </audio>
                    )}
                  </div>
                )}
              </Card>
              
              <p className={`text-xs text-muted-foreground mt-1 ${isOwnMessage ? 'text-right' : ''}`}>
                {formatDistanceToNow(new Date(message.created_at), { addSuffix: true })}
              </p>
            </div>
          </div>
        );
      })}
      <div ref={messagesEndRef} />
    </div>
  );
}
