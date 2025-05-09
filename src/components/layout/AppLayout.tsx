
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
      <div className="min-h-screen flex w-full">
        <Sidebar />
        <main className="flex-1 overflow-hidden">
          <div className="container h-full flex flex-col">
            <div className="flex items-center justify-between py-4 border-b">
              <SidebarTrigger />
              <div className="ml-auto flex items-center gap-4">
                <ThemeSwitcher />
                <span className="text-sm text-muted-foreground">Today is {new Date().toLocaleDateString()}</span>
              </div>
            </div>
            <div className={cn("flex-1 py-6 overflow-auto", className)}>
              {children}
            </div>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
}
