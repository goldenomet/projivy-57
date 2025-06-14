import { BarChart3, FolderOpen, Calendar, Users, Clock, Video, TrendingUp, MessageCircle } from "lucide-react";
import { useLocation, Link } from "react-router-dom";
import { cn } from "@/lib/utils";

export function MainMenuSection() {
  const location = useLocation();

  const menuItems = [
    {
      title: "Dashboard",
      icon: BarChart3,
      href: "/dashboard",
    },
    {
      title: "Projects",
      icon: FolderOpen,
      href: "/projects",
    },
    {
      title: "Team Chat",
      icon: MessageCircle,
      href: "/chat",
    },
    {
      title: "Calendar",
      icon: Calendar,
      href: "/calendar",
    },
    {
      title: "Team",
      icon: Users,
      href: "/team",
    },
    {
      title: "Time Tracking",
      icon: Clock,
      href: "/time-tracking",
    },
    {
      title: "Meetings",
      icon: Video,
      href: "/meetings",
    },
    {
      title: "Team Metrics",
      icon: TrendingUp,
      href: "/team-metrics",
    },
  ];

  return (
    <div className="pb-4">
      <p className="menu-label">MENU</p>
      <ul className="space-y-1">
        {menuItems.map((item) => (
          <li key={item.href}>
            <Link
              to={item.href}
              className={cn(
                "menu-item",
                location.pathname === item.href ? "active" : ""
              )}
            >
              <item.icon className="menu-item-icon" />
              <span>{item.title}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
