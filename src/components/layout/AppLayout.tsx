
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Sidebar } from "./Sidebar";
import { cn } from "@/lib/utils";
import { ThemeSwitcher } from "@/components/theme/ThemeSwitcher";

interface AppLayoutProps {
  children: React.ReactNode;
  className?: string;
}

export function AppLayout({ children, className }: AppLayoutProps) {
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
                <span className="text-sm text-muted-foreground bg-gradient-to-r from-muted/50 to-transparent px-3 py-1 rounded-md">
                  Today is {new Date().toLocaleDateString()}
                </span>
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
