
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
    <div className="border-t p-4 bg-gradient-to-r from-sidebar-accent/50 to-sidebar-accent/20 backdrop-blur-sm animate-slide-in">
      <Link to="/profile" className="block group">
        <div className="flex items-center gap-2 transition-all duration-300 hover:scale-105 hover:bg-white/5 rounded-lg p-2 -m-2">
          <div className="h-8 w-8 rounded-full overflow-hidden bg-gradient-to-r from-primary to-purple-400 transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-primary/20">
            {profile?.avatar_url ? (
              <Avatar className="h-full w-full">
                <AvatarImage 
                  src={profile.avatar_url} 
                  alt={profile.full_name || "User"} 
                  className="hover:scale-110 transition-transform duration-300"
                />
                <AvatarFallback className="bg-primary/20 transition-colors duration-200 group-hover:bg-primary/30">
                  {getInitials(profile.full_name)}
                </AvatarFallback>
              </Avatar>
            ) : (
              <Avatar className="h-full w-full">
                <AvatarFallback className="bg-primary/20 transition-colors duration-200 group-hover:bg-primary/30">
                  {user?.email ? user.email.charAt(0).toUpperCase() : "U"}
                </AvatarFallback>
              </Avatar>
            )}
          </div>
          <div className="transition-transform duration-200 group-hover:translate-x-1">
            <p className="text-sm font-medium transition-colors duration-200 group-hover:text-primary">
              {profile?.full_name || user?.email?.split('@')[0] || "User"}
            </p>
            <p className="text-xs text-muted-foreground transition-colors duration-200 group-hover:text-muted-foreground/80">
              {user?.email || "Not logged in"}
            </p>
          </div>
        </div>
      </Link>
    </div>
  );
}
