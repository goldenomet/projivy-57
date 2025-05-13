
import {
  Sidebar as SidebarContainer,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel
} from "@/components/ui/sidebar";
import { Link } from "react-router-dom";
import { Home, Briefcase, Calendar, Users, Settings, User, Shield } from "lucide-react";
import { Logo } from "@/components/ui/logo";
import { useAuth } from "@/hooks/use-auth";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Profile } from "@/types/project";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

export function Sidebar() {
  const { user } = useAuth();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  
  useEffect(() => {
    const fetchProfile = async () => {
      if (!user) return;
      
      try {
        const { data, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single();
        
        if (error) {
          console.error('Error fetching profile:', error);
          return;
        }
        
        if (data) {
          setProfile(data as Profile);
          
          // For demo purposes - check if the email includes "admin"
          if (user.email?.includes("admin")) {
            setIsAdmin(true);
          }
        }
      } catch (error) {
        console.error('Error fetching profile:', error);
      }
    };
    
    fetchProfile();
  }, [user]);

  // Generate initials from full name for avatar fallback
  const getInitials = (name: string | null) => {
    if (!name) return "U";
    return name
      .split(" ")
      .map(part => part[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <SidebarContainer>
      <SidebarHeader className="py-6">
        <div className="flex items-center px-2">
          <Logo />
        </div>
      </SidebarHeader>
      
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>MAIN MENU</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link to="/dashboard" className="flex items-center hover:scale-105 transition-transform">
                    <Home className="mr-2 h-4 w-4" />
                    <span>Dashboard</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link to="/projects" className="flex items-center hover:scale-105 transition-transform">
                    <Briefcase className="mr-2 h-4 w-4" />
                    <span>Projects</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link to="/calendar" className="flex items-center hover:scale-105 transition-transform">
                    <Calendar className="mr-2 h-4 w-4" />
                    <span>Calendar</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link to="/team" className="flex items-center hover:scale-105 transition-transform">
                    <Users className="mr-2 h-4 w-4" />
                    <span>Team</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>

              {isAdmin && (
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <Link to="/admin" className="flex items-center hover:scale-105 transition-transform bg-primary/10 rounded-md">
                      <Shield className="mr-2 h-4 w-4 text-primary" />
                      <span className="font-medium">Admin</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              )}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        
        <SidebarGroup>
          <SidebarGroupLabel>SETTINGS</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link to="/settings" className="flex items-center hover:scale-105 transition-transform">
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Settings</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link to="/profile" className="flex items-center hover:scale-105 transition-transform">
                    <User className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      
      <SidebarFooter className="border-t p-4 bg-gradient-to-r from-sidebar-accent/50 to-sidebar-accent/20">
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
      </SidebarFooter>
    </SidebarContainer>
  );
}
