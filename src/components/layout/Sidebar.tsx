
import {
  Sidebar as SidebarContainer,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
} from "@/components/ui/sidebar";
import { Logo } from "@/components/ui/logo";
import { useAuth } from "@/hooks/use-auth";
import { useDashboardData } from "@/hooks/use-dashboard-data";
import { MainMenuSection } from "./sidebar/MainMenuSection";
import { SettingsMenuSection } from "./sidebar/SettingsMenuSection";
import { UserProfileFooter } from "./sidebar/UserProfileFooter";

export function Sidebar() {
  const { user } = useAuth();
  const { userProfile } = useDashboardData();

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
        <MainMenuSection />
        <SettingsMenuSection />
      </SidebarContent>
      
      <SidebarFooter>
        <UserProfileFooter 
          user={user}
          profile={userProfile}
          getInitials={getInitials}
        />
      </SidebarFooter>
    </SidebarContainer>
  );
}
