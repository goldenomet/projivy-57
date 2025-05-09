
import { AppLayout } from "@/components/layout/AppLayout";
import ProjectForm from "@/components/projects/ProjectForm";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

export default function NewProject() {
  return (
    <AppLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <Link to="/projects">
                <Button variant="ghost" size="sm" className="gap-1">
                  <ArrowLeft className="h-4 w-4" /> Back
                </Button>
              </Link>
            </div>
            <h1 className="text-3xl font-bold tracking-tight">Create New Project</h1>
            <p className="text-muted-foreground">
              Fill in the details below to create a new project.
            </p>
          </div>
        </div>
        
        <div className="bg-card rounded-lg p-6 border shadow-sm">
          <ProjectForm />
        </div>
      </div>
    </AppLayout>
  );
}
