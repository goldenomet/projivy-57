
import { Hash, Users, Clock } from "lucide-react";
import { ChatRoom } from "@/types/chat";
import { formatDistanceToNow } from "date-fns";

interface ChatRoomListProps {
  rooms: ChatRoom[];
  selectedRoom: ChatRoom | null;
  onRoomSelect: (room: ChatRoom) => void;
  onJoinRoom: (room: ChatRoom) => void;
}

export function ChatRoomList({ rooms, selectedRoom, onRoomSelect, onJoinRoom }: ChatRoomListProps) {
  return (
    <div className="py-2 space-y-2">
      {rooms.map((room) => (
        <div
          key={room.id}
          className={`group relative mx-2 p-4 rounded-xl cursor-pointer transition-all duration-200 ${
            selectedRoom?.id === room.id
              ? 'bg-gradient-to-r from-primary/15 to-primary/5 border-2 border-primary/30 shadow-md'
              : 'hover:bg-gradient-to-r hover:from-muted/50 hover:to-muted/30 border-2 border-transparent hover:border-muted/40 hover:shadow-sm'
          }`}
          onClick={() => onRoomSelect(room)}
        >
          {/* Active indicator */}
          {selectedRoom?.id === room.id && (
            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-primary rounded-r-full" />
          )}
          
          <div className="flex items-start gap-3">
            {/* Avatar with gradient background */}
            <div className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-200 ${
              selectedRoom?.id === room.id
                ? 'bg-gradient-to-br from-primary to-primary/80 text-white shadow-lg'
                : 'bg-gradient-to-br from-muted to-muted/60 text-muted-foreground group-hover:from-primary/20 group-hover:to-primary/10 group-hover:text-primary'
            }`}>
              <Hash className="h-5 w-5" />
            </div>
            
            {/* Chat Info */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-1">
                <h3 className={`font-semibold truncate transition-colors duration-200 ${
                  selectedRoom?.id === room.id ? 'text-primary' : 'text-foreground group-hover:text-primary'
                }`}>
                  {room.name}
                </h3>
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Clock className="h-3 w-3" />
                  <span>{formatDistanceToNow(new Date(room.updated_at), { addSuffix: true })}</span>
                </div>
              </div>
              
              <p className="text-sm text-muted-foreground truncate mb-2">
                {room.description || 'No description available'}
              </p>
              
              {/* Room stats */}
              <div className="flex items-center gap-3 text-xs text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Users className="h-3 w-3" />
                  <span>Active members</span>
                </div>
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <span>Online</span>
              </div>
            </div>
          </div>
          
          {/* Hover effect overlay */}
          <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
        </div>
      ))}
    </div>
  );
}
