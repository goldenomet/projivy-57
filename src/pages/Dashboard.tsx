
import { useEffect, useState } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { mockProjects, mockTasks } from "@/data/mockData";
import { Project, Task } from "@/types/project";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { TaskCard } from "@/components/tasks/TaskCard";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { PlusCircle, ChevronLeft } from "lucide-react";

export default function Dashboard() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [recentTasks, setRecentTasks] = useState<Task[]>([]);

  useEffect(() => {
    // Simulate data loading
    setTimeout(() => {
      setProjects(mockProjects);
      
      // Show recent tasks sorted by due date (upcoming first)
      const sortedTasks = [...mockTasks].sort(
        (a, b) => a.dueDate.getTime() - b.dueDate.getTime()
      ).slice(0, 4);
      
      setRecentTasks(sortedTasks);
    }, 300);
  }, []);

  return (
    <AppLayout>
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <div className="space-y-2 animate-fade-in">
            <Link to="/" className="inline-block">
              <Button variant="ghost" size="sm" className="-ml-2 hover:scale-105 transition-transform">
                <ChevronLeft className="h-4 w-4 mr-1" />
                Home
              </Button>
            </Link>
            <h1 className="text-3xl font-bold tracking-tight text-transparent bg-gradient-to-r from-primary to-purple-500 bg-clip-text">Dashboard</h1>
          </div>
          <Link to="/projects/new">
            <Button className="bg-gradient-to-r from-primary to-purple-500 hover:opacity-90 transition-opacity shadow-md hover:shadow-lg hover:scale-105 transition-all">
              <PlusCircle className="mr-2 h-4 w-4" />
              New Project
            </Button>
          </Link>
        </div>

        <div className="animate-slide-in">
          <h2 className="text-xl font-semibold mb-4 text-transparent bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text">Active Projects</h2>
          {projects.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((project, index) => (
                <div key={project.id} className="animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                  <ProjectCard project={project} />
                </div>
              ))}
            </div>
          ) : (
            <div className="py-12 flex items-center justify-center border rounded-lg bg-gradient-to-br from-muted/50 to-muted/30 animate-pulse">
              <p className="text-muted-foreground">Loading projects...</p>
            </div>
          )}
        </div>

        <div className="animate-slide-in" style={{ animationDelay: "0.3s" }}>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-transparent bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text">Upcoming Tasks</h2>
            <Link to="/projects" className="text-primary hover:text-primary/80 hover:underline text-sm transition-colors">
              View all tasks
            </Link>
          </div>
          {recentTasks.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {recentTasks.map((task, index) => (
                <div key={task.id} className="animate-fade-in hover:scale-[1.02] transition-transform" style={{ animationDelay: `${(index * 0.1) + 0.4}s` }}>
                  <Link to={`/projects/${task.projectId}`}>
                    <TaskCard task={task} />
                  </Link>
                </div>
              ))}
            </div>
          ) : (
            <div className="py-12 flex items-center justify-center border rounded-lg bg-gradient-to-br from-muted/50 to-muted/30 animate-pulse">
              <p className="text-muted-foreground">Loading tasks...</p>
            </div>
          )}
        </div>
      </div>
    </AppLayout>
  );
}
