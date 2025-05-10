
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
import { Home, Briefcase, Calendar, Users, Settings, LayoutDashboard } from "lucide-react";
import { cn } from "@/lib/utils";

export function Sidebar() {
  return (
    <SidebarContainer>
      <SidebarHeader className="py-6">
        <div className="flex items-center px-2">
          <div className="h-8 w-8 rounded-lg bg-primary/20 flex items-center justify-center mr-2 animate-pulse">
            <LayoutDashboard className="h-5 w-5 text-primary" />
          </div>
          <h2 className="text-xl font-semibold text-transparent bg-gradient-to-r from-primary to-purple-500 bg-clip-text animate-fade-in">Evolve IQ</h2>
        </div>
      </SidebarHeader>
      
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>MAIN MENU</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link to="/" className="flex items-center hover:scale-105 transition-transform">
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
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      
      <SidebarFooter className="border-t p-4 bg-gradient-to-r from-sidebar-accent/50 to-sidebar-accent/20">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-full bg-gradient-to-r from-primary to-purple-400">
            <img 
              src="https://api.dicebear.com/7.x/avataaars/svg?seed=Admin" 
              alt="User" 
              className="h-full w-full rounded-full hover:scale-110 transition-transform"
            />
          </div>
          <div>
            <p className="text-sm font-medium">Admin User</p>
            <p className="text-xs text-muted-foreground">admin@example.com</p>
          </div>
        </div>
      </SidebarFooter>
    </SidebarContainer>
  );
}
