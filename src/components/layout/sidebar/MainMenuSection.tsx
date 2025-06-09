
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
      <SidebarGroupLabel className="animate-fade-in">MAIN MENU</SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          <SidebarMenuItem className="animate-slide-in animate-stagger-1">
            <SidebarMenuButton asChild>
              <Link to="/dashboard" className="flex items-center hover:scale-105 transition-all duration-300 hover:bg-accent/50 rounded-md group">
                <Home className="mr-2 h-4 w-4 group-hover:scale-110 transition-transform duration-200" />
                <span>Dashboard</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          
          <SidebarMenuItem className="animate-slide-in animate-stagger-2">
            <SidebarMenuButton asChild>
              <Link to="/projects" className="flex items-center hover:scale-105 transition-all duration-300 hover:bg-accent/50 rounded-md group">
                <Briefcase className="mr-2 h-4 w-4 group-hover:scale-110 transition-transform duration-200" />
                <span>Projects</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          
          <SidebarMenuItem className="animate-slide-in animate-stagger-3">
            <SidebarMenuButton asChild>
              <Link to="/time-tracking" className="flex items-center hover:scale-105 transition-all duration-300 hover:bg-accent/50 rounded-md group">
                <Clock className="mr-2 h-4 w-4 group-hover:scale-110 transition-transform duration-200" />
                <span>Time Tracking</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          
          <SidebarMenuItem className="animate-slide-in animate-stagger-4">
            <SidebarMenuButton asChild>
              <Link to="/calendar" className="flex items-center hover:scale-105 transition-all duration-300 hover:bg-accent/50 rounded-md group">
                <Calendar className="mr-2 h-4 w-4 group-hover:scale-110 transition-transform duration-200" />
                <span>Calendar</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>

          <SidebarMenuItem className="animate-slide-in animate-stagger-5">
            <SidebarMenuButton asChild>
              <Link to="/meetings" className="flex items-center hover:scale-105 transition-all duration-300 hover:bg-accent/50 rounded-md group">
                <Video className="mr-2 h-4 w-4 group-hover:scale-110 transition-transform duration-200" />
                <span>Meetings</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          
          <SidebarMenuItem className="animate-slide-in animate-stagger-1">
            <SidebarMenuButton asChild>
              <Link to="/team" className="flex items-center hover:scale-105 transition-all duration-300 hover:bg-accent/50 rounded-md group">
                <Users className="mr-2 h-4 w-4 group-hover:scale-110 transition-transform duration-200" />
                <span>Team</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          
          <SidebarMenuItem className="animate-slide-in animate-stagger-2">
            <SidebarMenuButton asChild>
              <Link to="/subscription" className="flex items-center hover:scale-105 transition-all duration-300 bg-gradient-to-r from-amber-50/50 to-yellow-50/50 dark:from-amber-900/10 dark:to-yellow-900/10 rounded-md group hover:from-amber-100/50 hover:to-yellow-100/50 dark:hover:from-amber-800/20 dark:hover:to-yellow-800/20">
                <Sparkles className="mr-2 h-4 w-4 text-amber-500 group-hover:animate-wiggle" />
                <span className="text-amber-700 dark:text-amber-400 font-medium">Upgrade</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>

          {isAdmin && (
            <SidebarMenuItem className="animate-slide-in animate-stagger-3">
              <SidebarMenuButton asChild>
                <Link to="/admin" className="flex items-center hover:scale-105 transition-all duration-300 bg-gradient-to-r from-primary/10 to-purple-500/10 rounded-md group hover:from-primary/20 hover:to-purple-500/20">
                  <Shield className="mr-2 h-4 w-4 text-primary group-hover:animate-bounce-gentle" />
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
