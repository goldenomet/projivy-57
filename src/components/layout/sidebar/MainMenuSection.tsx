
import { Link } from "react-router-dom";
import { Home, Briefcase, Calendar, Users, Clock, Video, Sparkles, Shield } from "lucide-react";
import {
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel
} from "@/components/ui/sidebar";

interface MainMenuSectionProps {
  isAdmin: boolean;
}

export function MainMenuSection({ isAdmin }: MainMenuSectionProps) {
  return (
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
              <Link to="/time-tracking" className="flex items-center hover:scale-105 transition-transform">
                <Clock className="mr-2 h-4 w-4" />
                <span>Time Tracking</span>
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
              <Link to="/meetings" className="flex items-center hover:scale-105 transition-transform">
                <Video className="mr-2 h-4 w-4" />
                <span>Meetings</span>
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
          
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Link to="/subscription" className="flex items-center hover:scale-105 transition-transform bg-amber-50/50 dark:bg-amber-900/10 rounded-md">
                <Sparkles className="mr-2 h-4 w-4 text-amber-500" />
                <span className="text-amber-700 dark:text-amber-400">Upgrade</span>
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
  );
}
