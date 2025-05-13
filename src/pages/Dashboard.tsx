
import { useEffect, useState } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { mockProjects, mockTasks } from "@/data/mockData";
import { Project, Task, Profile } from "@/types/project";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { TaskCard } from "@/components/tasks/TaskCard";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { PlusCircle, ChevronLeft } from "lucide-react";
import { toast } from "sonner";
import { useAuth } from "@/hooks/use-auth";
import { supabase } from "@/integrations/supabase/client";

export default function Dashboard() {
  const { user } = useAuth();
  const [projects, setProjects] = useState<Project[]>([]);
  const [recentTasks, setRecentTasks] = useState<Task[]>([]);
  const [userProfile, setUserProfile] = useState<Profile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch user profile from Supabase
  useEffect(() => {
    const fetchProfile = async () => {
      if (!user) return;
      
      try {
        const { data, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single();
        
        if (error) {
          throw error;
        }
        
        if (data) {
          setUserProfile(data as Profile);
        }
      } catch (error) {
        console.error('Error fetching profile:', error);
        toast.error('Failed to load user profile');
      }
    };
    
    fetchProfile();
  }, [user]);

  useEffect(() => {
    const loadProjects = () => {
      setIsLoading(true);
      
      // Try to load projects from localStorage
      try {
        const storedProjects = localStorage.getItem("projects");
        let localProjects: Project[] = [];
        
        if (storedProjects) {
          const parsedProjects = JSON.parse(storedProjects);
          localProjects = Array.isArray(parsedProjects) ? parsedProjects.map((project: any) => ({
            ...project,
            startDate: new Date(project.startDate),
            endDate: new Date(project.endDate),
            tasks: Array.isArray(project.tasks) ? project.tasks.map((task: any) => ({
              ...task,
              startDate: task.startDate ? new Date(task.startDate) : new Date(),
              dueDate: task.dueDate ? new Date(task.dueDate) : new Date(),
            })) : [],
          })) : [];
        }
        
        // Combine with mock data (preventing duplicates)
        const existingIds = new Set(localProjects.map(p => p.id));
        const filteredMockProjects = mockProjects.filter(p => !existingIds.has(p.id));
        const allProjects = [...localProjects, ...filteredMockProjects];
        
        // Get active projects only
        const activeProjects = allProjects.filter(p => p.status === 'active');
        
        setProjects(activeProjects);
        
        // Gather all tasks from all projects
        const allTasks: Task[] = [];
        allProjects.forEach(project => {
          if (Array.isArray(project.tasks)) {
            allTasks.push(...project.tasks.map(task => ({
              ...task,
              projectId: project.id
            })));
          }
        });
        
        // Add mock tasks
        mockTasks.forEach(task => {
          if (!allTasks.some(t => t.id === task.id)) {
            allTasks.push(task);
          }
        });
        
        // Show recent tasks sorted by due date (upcoming first)
        const sortedTasks = allTasks
          .sort((a, b) => a.dueDate.getTime() - b.dueDate.getTime())
          .filter(task => task.status !== 'completed')
          .slice(0, 4);
        
        setRecentTasks(sortedTasks);
        setIsLoading(false);
      } catch (error) {
        console.error("Error loading projects:", error);
        toast.error("Failed to load projects");
        setIsLoading(false);
      }
    };
    
    // Load projects after a brief delay to allow for animations
    setTimeout(loadProjects, 300);
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

        <div className="animate-slide-in">
          <h2 className="text-xl font-semibold mb-4 text-transparent bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text">Active Projects</h2>
          {!isLoading ? (
            projects.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {projects.map((project, index) => (
                  <div key={project.id} className="animate-fade-in hover:scale-[1.02] transition-transform" style={{ animationDelay: `${index * 0.1}s` }}>
                    <ProjectCard project={project} />
                  </div>
                ))}
              </div>
            ) : (
              <div className="py-12 flex flex-col items-center justify-center border rounded-lg bg-gradient-to-br from-muted/50 to-muted/30">
                <p className="text-muted-foreground mb-4">No active projects found</p>
                <Link to="/projects/new">
                  <Button className="bg-gradient-to-r from-primary to-purple-500 hover:opacity-90 transition-opacity hover:scale-105 transition-all">
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Create New Project
                  </Button>
                </Link>
              </div>
            )
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
          {!isLoading ? (
            recentTasks.length > 0 ? (
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
              <div className="py-12 flex items-center justify-center border rounded-lg bg-gradient-to-br from-muted/50 to-muted/30">
                <p className="text-muted-foreground">No upcoming tasks found</p>
              </div>
            )
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
