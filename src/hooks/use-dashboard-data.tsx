
import { useEffect, useState } from "react";
import { Profile, Project, Task } from "@/types/project";
import { useAuth } from "@/hooks/use-auth";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { mockProjects, mockTasks } from "@/data/mockData";

export function useDashboardData() {
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

  return {
    projects,
    recentTasks,
    userProfile,
    isLoading
  };
}
