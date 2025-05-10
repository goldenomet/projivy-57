
import { AppLayout } from "@/components/layout/AppLayout";
import ProjectForm from "@/components/projects/ProjectForm";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import { Link } from "react-router-dom";

export default function NewProject() {
  return (
    <AppLayout>
      <div className="space-y-6">
        <div className="flex flex-col space-y-2">
          <Link to="/projects">
            <Button variant="ghost" size="sm" className="-ml-2">
              <ChevronLeft className="h-4 w-4 mr-1" />
              Back to Projects
            </Button>
          </Link>
          <h1 className="text-3xl font-bold tracking-tight">Create New Project</h1>
        </div>
        
        <div className="bg-card rounded-lg p-6 border shadow-sm">
          <ProjectForm />
        </div>
      </div>
    </AppLayout>
  );
}
