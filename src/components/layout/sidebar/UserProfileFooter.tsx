
import { Link } from "react-router-dom";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Profile } from "@/types/project";
import { User } from "@supabase/supabase-js";

interface UserProfileFooterProps {
  user: User | null;
  profile: Profile | null;
  getInitials: (name: string | null) => string;
}

export function UserProfileFooter({ user, profile, getInitials }: UserProfileFooterProps) {
  return (
    <div className="border-t p-4 bg-gradient-to-r from-sidebar-accent/50 to-sidebar-accent/20">
      <Link to="/profile" className="block">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-full overflow-hidden bg-gradient-to-r from-primary to-purple-400">
            {profile?.avatar_url ? (
              <Avatar className="h-full w-full">
                <AvatarImage 
                  src={profile.avatar_url} 
                  alt={profile.full_name || "User"} 
                  className="hover:scale-110 transition-transform"
                />
                <AvatarFallback className="bg-primary/20">
                  {getInitials(profile.full_name)}
                </AvatarFallback>
              </Avatar>
            ) : (
              <Avatar className="h-full w-full">
                <AvatarFallback className="bg-primary/20">
                  {user?.email ? user.email.charAt(0).toUpperCase() : "U"}
                </AvatarFallback>
              </Avatar>
            )}
          </div>
          <div>
            <p className="text-sm font-medium">{profile?.full_name || user?.email?.split('@')[0] || "User"}</p>
            <p className="text-xs text-muted-foreground">{user?.email || "Not logged in"}</p>
          </div>
        </div>
      </Link>
    </div>
  );
}
