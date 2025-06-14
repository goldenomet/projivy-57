
import { useState } from "react";
import { Users, UserPlus, Settings, Crown, Shield, User, X } from "lucide-react";
import { ChatRoomMember } from "@/types/chat";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ChatService } from "@/services/chatService";
import { toast } from "sonner";

interface ChatInfoPanelProps {
  members: ChatRoomMember[];
  currentUserId?: string;
  roomId: string;
  isAdmin: boolean;
  show: boolean;
  onClose: () => void;
}

export function ChatInfoPanel({ members, currentUserId, roomId, isAdmin, show, onClose }: ChatInfoPanelProps) {
  const [showInvite, setShowInvite] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  if (!show) return null;

  const handleSearchUsers = async (query: string) => {
    if (query.length < 2) {
      setSearchResults([]);
      return;
    }

    setIsSearching(true);
    try {
      const users = await ChatService.searchUsers(query);
      // Filter out users who are already members
      const memberIds = members.map(m => m.user_id);
      const filteredUsers = users.filter(user => !memberIds.includes(user.id));
      setSearchResults(filteredUsers);
    } catch (error) {
      console.error('Error searching users:', error);
      toast.error('Failed to search users');
    } finally {
      setIsSearching(false);
    }
  };

  const handleInviteUser = async (userId: string, userName: string) => {
    try {
      await ChatService.inviteMember(roomId, userId);
      toast.success(`${userName} has been invited to the chat`);
      setSearchQuery("");
      setSearchResults([]);
      setShowInvite(false);
    } catch (error) {
      console.error('Error inviting user:', error);
      toast.error('Failed to invite user');
    }
  };

  const handleRemoveMember = async (userId: string, userName: string) => {
    if (userId === currentUserId) {
      toast.error("You cannot remove yourself from the chat");
      return;
    }

    try {
      await ChatService.removeMember(roomId, userId);
      toast.success(`${userName} has been removed from the chat`);
    } catch (error) {
      console.error('Error removing member:', error);
      toast.error('Failed to remove member');
    }
  };

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'admin':
        return <Crown className="h-3 w-3 text-yellow-500" />;
      case 'moderator':
        return <Shield className="h-3 w-3 text-blue-500" />;
      default:
        return <User className="h-3 w-3 text-gray-500" />;
    }
  };

  const getRoleBadge = (role: string) => {
    const variants = {
      admin: 'default',
      moderator: 'secondary',
      member: 'outline'
    } as const;

    return (
      <Badge variant={variants[role as keyof typeof variants]} className="text-xs">
        {role}
      </Badge>
    );
  };

  return (
    <div className="absolute right-4 top-16 w-80 bg-card border border-border rounded-lg shadow-lg z-50">
      {/* Header */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between">
          <h3 className="font-medium text-sm flex items-center gap-2">
            <Users className="h-4 w-4" />
            Chat Members ({members.length})
          </h3>
          <Button variant="ghost" size="icon" onClick={onClose} className="h-6 w-6">
            <X className="h-4 w-4" />
          </Button>
        </div>
        
        {isAdmin && (
          <div className="mt-3 flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowInvite(!showInvite)}
              className="flex items-center gap-2"
            >
              <UserPlus className="h-3 w-3" />
              Invite
            </Button>
            <Button variant="outline" size="sm" className="flex items-center gap-2">
              <Settings className="h-3 w-3" />
              Settings
            </Button>
          </div>
        )}
      </div>

      {/* Invite Section */}
      {showInvite && isAdmin && (
        <div className="p-4 border-b border-border bg-muted/30">
          <div className="space-y-3">
            <Input
              placeholder="Search users to invite..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                handleSearchUsers(e.target.value);
              }}
              className="h-8"
            />
            
            {isSearching && (
              <p className="text-xs text-muted-foreground">Searching...</p>
            )}
            
            {searchResults.length > 0 && (
              <div className="space-y-1 max-h-32 overflow-auto">
                {searchResults.map((user) => (
                  <div key={user.id} className="flex items-center justify-between p-2 rounded bg-background">
                    <span className="text-sm font-medium">{user.full_name || `User ${user.id.slice(-4)}`}</span>
                    <Button
                      size="sm"
                      onClick={() => handleInviteUser(user.id, user.full_name || `User ${user.id.slice(-4)}`)}
                      className="h-6 px-2 text-xs"
                    >
                      Invite
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Members List */}
      <div className="space-y-2 max-h-60 overflow-auto p-4">
        {members.map((member) => (
          <div key={member.id} className="flex items-center gap-3 p-2 rounded-md hover:bg-muted/30 transition-colors">
            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
              <span className="text-xs font-medium">
                {member.user_id.charAt(0).toUpperCase()}
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <p className="text-sm font-medium truncate">
                  {member.user_id === currentUserId ? 'You' : `User ${member.user_id.slice(-4)}`}
                </p>
                {getRoleIcon(member.role)}
              </div>
              <div className="flex items-center gap-2">
                {getRoleBadge(member.role)}
                <span className="text-xs text-muted-foreground">
                  {member.is_active ? 'Online' : 'Offline'}
                </span>
              </div>
            </div>
            
            {isAdmin && member.user_id !== currentUserId && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleRemoveMember(member.user_id, `User ${member.user_id.slice(-4)}`)}
                className="h-6 w-6 p-0 text-destructive hover:text-destructive"
              >
                <X className="h-3 w-3" />
              </Button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
