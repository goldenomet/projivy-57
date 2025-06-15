
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Sidebar } from "./Sidebar";
import { cn } from "@/lib/utils";
import { ThemeSwitcher } from "@/components/theme/ThemeSwitcher";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import { LogOut, User } from "lucide-react";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { WelcomeQuestionnaire } from "@/components/auth/WelcomeQuestionnaire";

interface AppLayoutProps {
  children: React.ReactNode;
  className?: string;
}

export function AppLayout({
  children,
  className
}: AppLayoutProps) {
  const [currentTime, setCurrentTime] = useState(new Date());
  const {
    user,
    signOut,
    showQuestionnaire,
    completeQuestionnaire
  } = useAuth();

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
      duration: 5000
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

  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <ProtectedRoute>
      <SidebarProvider>
        <div className="min-h-screen flex w-full" style={{
          backgroundColor: 'hsl(var(--background))'
        }}>
          <Sidebar />
          <main className="flex-1 overflow-hidden animate-fade-in" style={{
            backgroundColor: 'hsl(var(--background))'
          }}>
            <div className="h-full flex flex-col">
              {/* Enhanced Navigation Bar */}
              <div className="w-full bg-gradient-to-r from-card via-card/95 to-card backdrop-blur-lg border-b border-border/50 shadow-lg">
                <div className="flex items-center justify-between px-6 py-4">
                  <div className="flex items-center gap-4">
                    <SidebarTrigger className="hover:scale-105 transition-all duration-200 hover:bg-primary/10 hover:text-primary rounded-lg p-2" />
                    <div className="h-6 w-px bg-gradient-to-b from-transparent via-border to-transparent" />
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <button className="text-sm px-4 py-2 rounded-lg bg-gradient-to-r from-muted/50 to-muted transition-all duration-200 hover:from-primary/10 hover:to-primary/5 hover:scale-105 border border-border/50 hover:border-primary/20" onClick={showWelcomeMessage}>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                        {currentTime.toLocaleDateString()}
                      </div>
                    </button>
                    
                    <div className="h-6 w-px bg-gradient-to-b from-transparent via-border to-transparent" />
                    
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground hover:bg-primary/10 transition-all duration-200 flex items-center gap-2 px-3 py-2 rounded-lg">
                        <User className="h-4 w-4" />
                        <span className="hidden sm:inline">{user?.email}</span>
                      </Button>
                      
                      <Button variant="ghost" size="icon" onClick={handleSignOut} className="text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-all duration-200 rounded-lg">
                        <LogOut className="h-4 w-4" />
                      </Button>
                      
                      <div className="h-6 w-px bg-gradient-to-b from-transparent via-border to-transparent" />
                      
                      <ThemeSwitcher />
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Main Content */}
              <div className={cn("flex-1 py-6 px-6 overflow-auto", className)}>
                <div className="animate-slide-in max-w-7xl mx-auto">
                  {children}
                </div>
              </div>
            </div>
          </main>
        </div>
        
        {/* Welcome Questionnaire Overlay */}
        {showQuestionnaire && (
          <WelcomeQuestionnaire onComplete={completeQuestionnaire} />
        )}
      </SidebarProvider>
    </ProtectedRoute>
  );
}
