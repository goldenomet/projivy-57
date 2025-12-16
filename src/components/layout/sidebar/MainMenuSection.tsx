
import { BarChart3, FolderOpen, Calendar, Users, Clock, Video, TrendingUp, MessageCircle, ListTodo } from "lucide-react";
import { useLocation, Link } from "react-router-dom";
import { cn } from "@/lib/utils";

export function MainMenuSection() {
  const location = useLocation();
  
  const mainMenuItems = [{
    title: "Dashboard",
    icon: BarChart3,
    href: "/dashboard",
    color: "text-blue-500",
    bgHover: "hover:bg-blue-50 dark:hover:bg-blue-900/20"
  }, {
    title: "Task Overview",
    icon: ListTodo,
    href: "/tasks",
    color: "text-amber-500",
    bgHover: "hover:bg-amber-50 dark:hover:bg-amber-900/20"
  }, {
    title: "Projects",
    icon: FolderOpen,
    href: "/projects",
    color: "text-green-500",
    bgHover: "hover:bg-green-50 dark:hover:bg-green-900/20"
  }, {
    title: "Team Chat",
    icon: MessageCircle,
    href: "/chat",
    color: "text-purple-500",
    bgHover: "hover:bg-purple-50 dark:hover:bg-purple-900/20"
  }, {
    title: "Calendar",
    icon: Calendar,
    href: "/calendar",
    color: "text-orange-500",
    bgHover: "hover:bg-orange-50 dark:hover:bg-orange-900/20"
  }, {
    title: "Team",
    icon: Users,
    href: "/team",
    color: "text-pink-500",
    bgHover: "hover:bg-pink-50 dark:hover:bg-pink-900/20"
  }, {
    title: "Time Tracking",
    icon: Clock,
    href: "/time-tracking",
    color: "text-indigo-500",
    bgHover: "hover:bg-indigo-50 dark:hover:bg-indigo-900/20"
  }, {
    title: "Meetings",
    icon: Video,
    href: "/meetings",
    color: "text-cyan-500",
    bgHover: "hover:bg-cyan-50 dark:hover:bg-cyan-900/20"
  }];

  const developmentItems = [{
    title: "Team Metrics",
    icon: TrendingUp,
    href: "/team-metrics",
    color: "text-emerald-500",
    bgHover: "hover:bg-emerald-50 dark:hover:bg-emerald-900/20"
  }];

  const renderMenuSection = (items: typeof mainMenuItems, sectionTitle: string) => (
    <div className="pb-6">
      <div className="px-3 mb-4">
        <h2 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">{sectionTitle}</h2>
      </div>
      <nav className="space-y-1 px-2">
        {items.map(item => {
          const isActive = location.pathname === item.href;
          return (
            <Link 
              key={item.href} 
              to={item.href} 
              className={cn(
                "group flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium transition-all duration-200 ease-in-out",
                "hover:scale-[1.02] hover:shadow-sm",
                isActive 
                  ? "bg-gradient-to-r from-primary/10 to-primary/5 text-primary shadow-sm border border-primary/20" 
                  : "text-muted-foreground hover:text-foreground",
                !isActive && item.bgHover
              )}
            >
              <div className={cn(
                "flex items-center justify-center w-8 h-8 rounded-lg transition-all duration-200",
                isActive 
                  ? "bg-primary/10 text-primary" 
                  : cn("bg-muted/50 group-hover:bg-white group-hover:shadow-sm", item.color)
              )}>
                <item.icon className="w-4 h-4" />
              </div>
              <span className="font-medium">{item.title}</span>
              {isActive && <div className="ml-auto w-2 h-2 rounded-full bg-primary animate-pulse" />}
            </Link>
          );
        })}
      </nav>
    </div>
  );

  return (
    <div>
      {renderMenuSection(mainMenuItems, "MAIN")}
      {renderMenuSection(developmentItems, "DEVELOPMENT")}
    </div>
  );
}
