
import { Link } from "react-router-dom";
import { Settings, User } from "lucide-react";
import {
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel
} from "@/components/ui/sidebar";

export function SettingsMenuSection() {
  return (
    <SidebarGroup>
      <SidebarGroupLabel className="animate-fade-in">SETTINGS</SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          <SidebarMenuItem className="animate-slide-in animate-stagger-1">
            <SidebarMenuButton asChild>
              <Link to="/settings" className="flex items-center hover:scale-105 transition-all duration-300 hover:bg-accent/50 rounded-md group">
                <Settings className="mr-2 h-4 w-4 group-hover:rotate-45 transition-transform duration-300" />
                <span>Settings</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem className="animate-slide-in animate-stagger-2">
            <SidebarMenuButton asChild>
              <Link to="/profile" className="flex items-center hover:scale-105 transition-all duration-300 hover:bg-accent/50 rounded-md group">
                <User className="mr-2 h-4 w-4 group-hover:scale-110 transition-transform duration-200" />
                <span>Profile</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
