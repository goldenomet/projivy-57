
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Hash, Phone, Video, MoreVertical, Users, Sparkles } from "lucide-react";
import { ChatRoom, ChatRoomMember } from "@/types/chat";

interface ChatHeaderProps {
  room: ChatRoom;
  members: ChatRoomMember[];
  showInfo: boolean;
  onToggleInfo: () => void;
}

export function ChatHeader({ room, members, showInfo, onToggleInfo }: ChatHeaderProps) {
  const activeMembers = members.filter(m => m.is_active).length;
  
  return (
    <div className="border-b border-border p-6 bg-gradient-to-r from-card to-card/80">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          {/* Enhanced Room Avatar */}
          <div className="relative">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center shadow-lg">
              <Hash className="h-6 w-6 text-white" />
            </div>
            {activeMembers > 0 && (
              <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-background rounded-full animate-pulse" />
            )}
          </div>
          
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-1">
              <h2 className="font-bold text-xl bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
                {room.name}
              </h2>
              <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20">
                <Sparkles className="h-3 w-3 mr-1" />
                Active
              </Badge>
            </div>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <Users className="h-4 w-4" />
                <span className="font-medium">{members.length}</span>
                <span>member{members.length !== 1 ? 's' : ''}</span>
              </div>
              {activeMembers > 0 && (
                <>
                  <div className="w-1 h-1 rounded-full bg-muted-foreground" />
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 rounded-full bg-green-500" />
                    <span>{activeMembers} online</span>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
        
        {/* Action Buttons */}
        <div className="flex items-center gap-1">
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-9 w-9 hover:bg-primary/10 hover:text-primary transition-all duration-200"
          >
            <Phone className="h-4 w-4" />
          </Button>
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-9 w-9 hover:bg-primary/10 hover:text-primary transition-all duration-200"
          >
            <Video className="h-4 w-4" />
          </Button>
          <Button 
            variant="ghost" 
            size="icon" 
            className={`h-9 w-9 transition-all duration-200 ${
              showInfo ? 'bg-primary/10 text-primary' : 'hover:bg-primary/10 hover:text-primary'
            }`}
            onClick={onToggleInfo}
          >
            <MoreVertical className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      {room.description && (
        <div className="mt-4 p-3 bg-muted/30 rounded-lg border border-muted/50">
          <p className="text-sm text-muted-foreground leading-relaxed">
            {room.description}
          </p>
        </div>
      )}
    </div>
  );
}
