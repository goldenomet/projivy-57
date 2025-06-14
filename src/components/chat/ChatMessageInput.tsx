
import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send, Paperclip, Mic, MicOff } from "lucide-react";
import { VoiceRecorder } from "./VoiceRecorder";
import { FileUploader } from "./FileUploader";

interface ChatMessageInputProps {
  roomName: string;
  onSendMessage: (message: string) => Promise<void>;
  onFileUpload: (file: File) => Promise<void>;
  onVoiceMessage: (audioBlob: Blob, duration: number) => Promise<void>;
  sending: boolean;
}

export function ChatMessageInput({ 
  roomName, 
  onSendMessage, 
  onFileUpload, 
  onVoiceMessage, 
  sending 
}: ChatMessageInputProps) {
  const [newMessage, setNewMessage] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [showFileUploader, setShowFileUploader] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || sending) return;

    const messageText = newMessage.trim();
    setNewMessage("");

    try {
      await onSendMessage(messageText);
    } catch (error) {
      setNewMessage(messageText); // Restore message on error
    } finally {
      inputRef.current?.focus();
    }
  };

  const handleFileUploadComplete = async (file: File) => {
    await onFileUpload(file);
    setShowFileUploader(false);
  };

  const handleVoiceComplete = async (audioBlob: Blob, duration: number) => {
    await onVoiceMessage(audioBlob, duration);
    setIsRecording(false);
  };

  return (
    <>
      {/* Voice Recorder */}
      {isRecording && (
        <div className="border-t border-b p-4 bg-muted/50">
          <VoiceRecorder
            onSave={handleVoiceComplete}
            onCancel={() => setIsRecording(false)}
          />
        </div>
      )}

      {/* File Uploader */}
      {showFileUploader && (
        <div className="border-t border-b p-4 bg-muted/50">
          <FileUploader
            onUpload={handleFileUploadComplete}
            onCancel={() => setShowFileUploader(false)}
          />
        </div>
      )}

      {/* Message Input */}
      <div className="border-t border-border p-4 bg-card">
        <form onSubmit={handleSubmit} className="flex items-end gap-3">
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
              placeholder={`Message ${roomName}...`}
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
    </>
  );
}
