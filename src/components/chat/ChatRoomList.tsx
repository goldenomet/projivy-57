
import { Hash } from "lucide-react";
import { ChatRoom } from "@/types/chat";

interface ChatRoomListProps {
  rooms: ChatRoom[];
  selectedRoom: ChatRoom | null;
  onRoomSelect: (room: ChatRoom) => void;
  onJoinRoom: (room: ChatRoom) => void;
}

export function ChatRoomList({ rooms, selectedRoom, onRoomSelect, onJoinRoom }: ChatRoomListProps) {
  return (
    <div className="py-2">
      {rooms.map((room) => (
        <div
          key={room.id}
          className={`flex items-center p-3 mx-2 mb-1 rounded-lg cursor-pointer transition-colors ${
            selectedRoom?.id === room.id
              ? 'bg-primary/10 border border-primary/20'
              : 'hover:bg-muted/50'
          }`}
          onClick={() => onRoomSelect(room)}
        >
          {/* Avatar */}
          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mr-3 flex-shrink-0">
            <Hash className="h-6 w-6 text-primary" />
          </div>
          
          {/* Chat Info */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-1">
              <h3 className="font-medium truncate text-sm">{room.name}</h3>
              <span className="text-xs text-muted-foreground ml-2">
                {new Date(room.updated_at).toLocaleDateString()}
              </span>
            </div>
            <p className="text-xs text-muted-foreground truncate">
              {room.description || 'No description'}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
