
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Sidebar } from "./Sidebar";
import { cn } from "@/lib/utils";
import { ThemeSwitcher } from "@/components/theme/ThemeSwitcher";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { PlusCircle } from "lucide-react";

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
                <Link to="/projects/new">
                  <Button size="sm" variant="outline" className="gap-1">
                    <PlusCircle className="h-4 w-4" />
                    New Project
                  </Button>
                </Link>
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
