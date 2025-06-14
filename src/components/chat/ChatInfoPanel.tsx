
import { Users } from "lucide-react";
import { ChatRoomMember } from "@/types/chat";

interface ChatInfoPanelProps {
  members: ChatRoomMember[];
  currentUserId?: string;
  show: boolean;
}

export function ChatInfoPanel({ members, currentUserId, show }: ChatInfoPanelProps) {
  if (!show) return null;

  return (
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
                {member.user_id === currentUserId ? 'You' : `User ${member.user_id.slice(-4)}`}
              </p>
              <p className="text-xs text-muted-foreground">
                {member.is_active ? 'Online' : 'Offline'}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
