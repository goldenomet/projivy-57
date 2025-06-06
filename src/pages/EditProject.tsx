
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AppLayout } from "@/components/layout/AppLayout";
import ProjectForm from "@/components/projects/ProjectForm";
import { Project } from "@/types/project";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import { toast } from "sonner";

export default function EditProject() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [project, setProject] = useState<Project | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!id) return;
    
    setIsLoading(true);
    
    // Try to load project from localStorage
    const storedProjects = localStorage.getItem("projects");
    if (storedProjects) {
      try {
        const parsedProjects = JSON.parse(storedProjects);
        const localProject = parsedProjects.find((p: any) => p.id === id);
        
        if (localProject) {
          // Parse date strings to Date objects
          const formattedProject = {
            ...localProject,
            startDate: new Date(localProject.startDate),
            endDate: new Date(localProject.endDate),
            tasks: Array.isArray(localProject.tasks) ? localProject.tasks.map((task: any) => ({
              ...task,
              startDate: task.startDate ? new Date(task.startDate) : new Date(),
              dueDate: task.dueDate ? new Date(task.dueDate) : new Date(),
            })) : []
          };
          
          setProject(formattedProject);
          setIsLoading(false);
          return;
        }
      } catch (error) {
        console.error("Error loading project from localStorage:", error);
        toast.error("Error loading project data");
      }
    }
    
    // If project not found
    toast.error("Project not found");
    navigate("/projects");
  }, [id, navigate]);

  const handleFormSubmitting = (isSubmitting: boolean) => {
    setIsSubmitting(isSubmitting);
  };

  return (
    <AppLayout>
      <div className="space-y-6 animate-fade-in">
        <div className="flex flex-col space-y-2">
          <Button 
            variant="ghost" 
            size="sm" 
            className="-ml-2 hover:scale-105 transition-transform"
            onClick={() => navigate(`/projects/${id}`)}
          >
            <ChevronLeft className="h-4 w-4 mr-1" />
            Back to Project
          </Button>
          
          <h1 className="text-3xl font-bold tracking-tight text-transparent bg-gradient-to-r from-primary to-purple-500 bg-clip-text">
            Edit Project
          </h1>
        </div>
        
        <div className="bg-gradient-to-br from-card to-card/90 rounded-lg p-6 border shadow-md animate-slide-in">
          {isLoading ? (
            <div className="flex items-center justify-center py-10">
              <div className="space-y-4 text-center">
                <div className="mx-auto w-12 h-12 rounded-full border-4 border-primary border-t-transparent animate-spin"></div>
                <p className="text-muted-foreground">Loading project...</p>
              </div>
            </div>
          ) : (
            <>
              {project && (
                <ProjectForm 
                  onFormSubmitting={handleFormSubmitting} 
                  projectToEdit={project}
                />
              )}
              {isSubmitting && (
                <div className="fixed inset-0 bg-background/50 backdrop-blur-sm flex items-center justify-center z-50">
                  <div className="bg-card p-6 rounded-lg shadow-lg flex flex-col items-center space-y-4">
                    <div className="w-12 h-12 rounded-full border-4 border-primary border-t-transparent animate-spin"></div>
                    <p className="text-lg font-medium">Saving project changes...</p>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </AppLayout>
  );
}
