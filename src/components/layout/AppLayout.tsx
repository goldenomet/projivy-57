
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Sidebar } from "./Sidebar";
import { cn } from "@/lib/utils";
import { ThemeSwitcher } from "@/components/theme/ThemeSwitcher";
import { useState, useEffect } from "react";
import { toast } from "sonner";

interface AppLayoutProps {
  children: React.ReactNode;
  className?: string;
}

export function AppLayout({ children, className }: AppLayoutProps) {
  const [currentTime, setCurrentTime] = useState(new Date());
  
  // Update current time every minute
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);
    
    return () => clearInterval(interval);
  }, []);
  
  const formatDate = (date: Date) => {
    const options: Intl.DateTimeFormatOptions = { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    };
    return date.toLocaleDateString(undefined, options);
  };
  
  const showWelcomeMessage = () => {
    const hour = currentTime.getHours();
    let greeting = "Good morning";
    
    if (hour >= 12 && hour < 18) {
      greeting = "Good afternoon";
    } else if (hour >= 18) {
      greeting = "Good evening";
    }
    
    toast(`${greeting}! Welcome to Projivy.`, {
      description: `Today is ${formatDate(currentTime)}`,
      duration: 5000,
    });
  };

  // Show welcome message on first load
  useEffect(() => {
    // Use sessionStorage to only show once per session
    if (!sessionStorage.getItem('welcomeShown')) {
      setTimeout(() => {
        showWelcomeMessage();
        sessionStorage.setItem('welcomeShown', 'true');
      }, 1000);
    }
  }, []);

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gradient-to-br from-background to-background/95">
        <Sidebar />
        <main className="flex-1 overflow-hidden animate-fade-in">
          <div className="container h-full flex flex-col">
            <div className="flex items-center justify-between py-4 border-b border-border/50 bg-gradient-to-r from-card/80 to-card">
              <SidebarTrigger className="hover:scale-105 transition-transform" />
              <div className="ml-auto flex items-center gap-4">
                <ThemeSwitcher />
                <button 
                  className="text-sm text-muted-foreground bg-gradient-to-r from-muted/50 to-transparent px-3 py-1 rounded-md hover:from-muted/70 hover:to-muted/20 transition-all"
                  onClick={showWelcomeMessage}
                >
                  Today is {currentTime.toLocaleDateString()}
                </button>
              </div>
            </div>
            <div className={cn("flex-1 py-6 overflow-auto", className)}>
              <div className="animate-slide-in">
                {children}
              </div>
            </div>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
}
