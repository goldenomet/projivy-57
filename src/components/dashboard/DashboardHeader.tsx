
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { PlusCircle, ChevronLeft } from "lucide-react";
import { Profile } from "@/types/project";

interface DashboardHeaderProps {
  userProfile: Profile | null;
}

export function DashboardHeader({ userProfile }: DashboardHeaderProps) {
  return (
    <div className="flex items-center justify-between">
      <div className="space-y-2 animate-fade-in">
        <Link to="/" className="inline-block">
          <Button variant="ghost" size="sm" className="-ml-2 hover:scale-105 transition-transform">
            <ChevronLeft className="h-4 w-4 mr-1" />
            Home
          </Button>
        </Link>
        <h1 className="text-3xl font-bold tracking-tight text-transparent bg-gradient-to-r from-primary to-purple-500 bg-clip-text">
          {userProfile ? `Welcome, ${userProfile.full_name || 'User'}` : 'Dashboard'}
        </h1>
      </div>
      <Link to="/projects/new">
        <Button className="bg-gradient-to-r from-primary to-purple-500 hover:opacity-90 transition-opacity shadow-md hover:shadow-lg hover:scale-105 transition-all">
          <PlusCircle className="mr-2 h-4 w-4" />
          New Project
        </Button>
      </Link>
    </div>
  );
}
