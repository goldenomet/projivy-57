
import { AppLayout } from "@/components/layout/AppLayout";
import ProjectForm from "@/components/projects/ProjectForm";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import { Link } from "react-router-dom";

export default function NewProject() {
  return (
    <AppLayout>
      <div className="space-y-6 animate-fade-in">
        <div className="flex flex-col space-y-2">
          <Link to="/projects">
            <Button variant="ghost" size="sm" className="-ml-2 hover:scale-105 transition-transform">
              <ChevronLeft className="h-4 w-4 mr-1" />
              Back to Projects
            </Button>
          </Link>
          <h1 className="text-3xl font-bold tracking-tight text-transparent bg-gradient-to-r from-primary to-purple-500 bg-clip-text">Create New Project</h1>
        </div>
        
        <div className="bg-gradient-to-br from-card to-card/90 rounded-lg p-6 border shadow-md animate-slide-in">
          <ProjectForm />
        </div>
      </div>
    </AppLayout>
  );
}
