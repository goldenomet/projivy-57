import { useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  FolderOpen,
  Calendar,
  Clock,
  Users,
  MessageCircle,
  Video,
  Settings,
  User,
  Database,
  BookOpen,
  TrendingUp,
  FileText,
  Shield
} from "lucide-react";

interface SidebarItem {
  title: string;
  icon: React.ComponentType<any>;
  href: string;
  isActive: boolean;
  isPremium?: boolean;
}

interface SidebarData {
  menuItems: SidebarItem[];
  settingsItems: SidebarItem[];
}

export function useSidebarData(): SidebarData {
  const location = useLocation();

  const menuItems = [
    {
      title: "Dashboard",
      icon: LayoutDashboard,
      href: "/dashboard",
      isActive: location.pathname === "/dashboard",
    },
    {
      title: "Projects",
      icon: FolderOpen,
      href: "/projects",
      isActive: location.pathname === "/projects",
    },
    {
      title: "Calendar",
      icon: Calendar,
      href: "/calendar",
      isActive: location.pathname === "/calendar",
    },
    {
      title: "Time Tracking",
      icon: Clock,
      href: "/time-tracking",
      isActive: location.pathname === "/time-tracking",
    },
    {
      title: "Team",
      icon: Users,
      href: "/team",
      isActive: location.pathname === "/team",
    },
    {
      title: "Chat",
      icon: MessageCircle,
      href: "/chat",
      isActive: location.pathname === "/chat",
    },
    {
      title: "Meetings",
      icon: Video,
      href: "/meetings",
      isActive: location.pathname === "/meetings",
    },
    {
      title: "Templates",
      icon: FileText,
      href: "/templates",
      isActive: location.pathname === "/templates",
    },
    {
      title: "Productivity",
      icon: TrendingUp,
      href: "/productivity",
      isActive: location.pathname === "/productivity",
    },
  ];

  const settingsItems = [
    {
      title: "Settings",
      icon: Settings,
      href: "/settings",
      isActive: location.pathname === "/settings",
    },
    {
      title: "Profile",
      icon: User,
      href: "/profile",
      isActive: location.pathname === "/profile",
    },
    {
      title: "Admin Controls",
      icon: Shield,
      href: "/admin",
      isActive: location.pathname === "/admin",
      isPremium: true,
    },
    {
      title: "Data Management",
      icon: Database,
      href: "/data",
      isActive: location.pathname === "/data",
    },
    {
      title: "Documentation",
      icon: BookOpen,
      href: "/docs",
      isActive: location.pathname === "/docs",
    },
  ];

  return { menuItems, settingsItems };
}
