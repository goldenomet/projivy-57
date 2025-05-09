
import { AppLayout } from "@/components/layout/AppLayout";
import ProjectForm from "@/components/projects/ProjectForm";

export default function NewProject() {
  return (
    <AppLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold tracking-tight">Create New Project</h1>
        </div>
        
        <div className="bg-card rounded-lg p-6 border shadow-sm">
          <ProjectForm />
        </div>
      </div>
    </AppLayout>
  );
}
