
import { Button } from "@/components/ui/button";
import { Hash, Phone, Video, MoreVertical } from "lucide-react";
import { ChatRoom, ChatRoomMember } from "@/types/chat";

interface ChatHeaderProps {
  room: ChatRoom;
  members: ChatRoomMember[];
  showInfo: boolean;
  onToggleInfo: () => void;
}

export function ChatHeader({ room, members, showInfo, onToggleInfo }: ChatHeaderProps) {
  return (
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
            onClick={onToggleInfo}
          >
            <MoreVertical className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      {room.description && (
        <p className="text-sm text-muted-foreground mt-2 ml-13">{room.description}</p>
      )}
    </div>
  );
}
