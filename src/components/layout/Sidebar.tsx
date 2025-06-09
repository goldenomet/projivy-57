
import {
  Sidebar as SidebarContainer,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
} from "@/components/ui/sidebar";
import { Logo } from "@/components/ui/logo";
import { useSidebarData } from "@/hooks/use-sidebar-data";
import { MainMenuSection } from "./sidebar/MainMenuSection";
import { SettingsMenuSection } from "./sidebar/SettingsMenuSection";
import { UserProfileFooter } from "./sidebar/UserProfileFooter";

export function Sidebar() {
  const { user, profile, isAdmin, getInitials } = useSidebarData();

  return (
    <SidebarContainer>
      <SidebarHeader className="py-6">
        <div className="flex items-center px-2">
          <Logo />
        </div>
      </SidebarHeader>
      
      <SidebarContent>
        <MainMenuSection isAdmin={isAdmin} />
        <SettingsMenuSection />
      </SidebarContent>
      
      <SidebarFooter>
        <UserProfileFooter 
          user={user}
          profile={profile}
          getInitials={getInitials}
        />
      </SidebarFooter>
    </SidebarContainer>
  );
}
