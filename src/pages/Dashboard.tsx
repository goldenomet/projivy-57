
import { useEffect, useState } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { mockProjects, mockTasks } from "@/data/mockData";
import { Project, Task } from "@/types/project";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { TaskCard } from "@/components/tasks/TaskCard";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { PlusCircle } from "lucide-react";

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
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <Link to="/projects/new">
            <Button>
              <PlusCircle className="mr-2 h-4 w-4" />
              New Project
            </Button>
          </Link>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4">Active Projects</h2>
          {projects.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          ) : (
            <div className="py-12 flex items-center justify-center border rounded-lg bg-muted/30">
              <p className="text-muted-foreground">Loading projects...</p>
            </div>
          )}
        </div>

        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Upcoming Tasks</h2>
            <Link to="/projects" className="text-primary hover:underline text-sm">
              View all tasks
            </Link>
          </div>
          {recentTasks.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {recentTasks.map((task) => (
                <Link key={task.id} to={`/projects/${task.projectId}`}>
                  <TaskCard task={task} />
                </Link>
              ))}
            </div>
          ) : (
            <div className="py-12 flex items-center justify-center border rounded-lg bg-muted/30">
              <p className="text-muted-foreground">Loading tasks...</p>
            </div>
          )}
        </div>
      </div>
    </AppLayout>
  );
}
