
import { useState, useEffect } from 'react';
import { AppLayout } from '@/components/layout/AppLayout';
import { ExportImportManager } from '@/components/data/ExportImportManager';
import { Button } from '@/components/ui/button';
import { ChevronLeft, Database } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Project } from '@/types/project';
import { toast } from 'sonner';

export default function DataManagementPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = () => {
    try {
      const storedProjects = localStorage.getItem('projects');
      if (storedProjects) {
        const parsedProjects = JSON.parse(storedProjects);
        const formattedProjects = Array.isArray(parsedProjects) ? parsedProjects.map((project: any) => ({
          ...project,
          startDate: new Date(project.startDate),
          endDate: new Date(project.endDate),
          tasks: Array.isArray(project.tasks) ? project.tasks.map((task: any) => ({
            ...task,
            startDate: task.startDate ? new Date(task.startDate) : new Date(),
            dueDate: task.dueDate ? new Date(task.dueDate) : new Date(),
          })) : []
        })) : [];
        
        setProjects(formattedProjects);
      }
    } catch (error) {
      console.error('Error loading projects:', error);
      toast.error('Failed to load projects');
    } finally {
      setIsLoading(false);
    }
  };

  const handleImportSuccess = (newProjects: Project[]) => {
    setProjects(newProjects);
    toast.success('Data imported successfully');
  };

  return (
    <AppLayout>
      <div className="space-y-6 animate-fade-in">
        <div className="flex flex-col space-y-2">
          <Link to="/settings">
            <Button variant="ghost" size="sm" className="-ml-2 hover:scale-105 transition-transform">
              <ChevronLeft className="h-4 w-4 mr-1" />
              Back to Settings
            </Button>
          </Link>
          
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold tracking-tight text-transparent bg-gradient-to-r from-primary to-purple-500 bg-clip-text flex items-center gap-3">
                <Database className="h-8 w-8 text-primary" />
                Data Management
              </h1>
              <p className="text-muted-foreground mt-2">
                Export and import your projects and tasks with various file formats
              </p>
            </div>
          </div>
        </div>

        <div className="animate-slide-in" style={{ animationDelay: "0.1s" }}>
          {!isLoading ? (
            <ExportImportManager 
              projects={projects} 
              onImportSuccess={handleImportSuccess}
            />
          ) : (
            <div className="py-16 flex flex-col items-center justify-center border rounded-lg bg-gradient-to-br from-muted/40 to-muted/20 animate-pulse">
              <p className="text-muted-foreground">Loading data...</p>
            </div>
          )}
        </div>
      </div>
    </AppLayout>
  );
}
