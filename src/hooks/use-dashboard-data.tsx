
import { useEffect, useState } from "react";
import { Profile, Project, Task } from "@/types/project";
import { useAuth } from "@/hooks/use-auth";
import { supabase } from "@/integrations/supabase/client";
import { ProjectService } from "@/services/projectService";
import { toast } from "sonner";

export function useDashboardData() {
  const { user } = useAuth();
  const [projects, setProjects] = useState<Project[]>([]);
  const [recentTasks, setRecentTasks] = useState<Task[]>([]);
  const [userProfile, setUserProfile] = useState<Profile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch user profile from Supabase
  useEffect(() => {
    const fetchProfile = async () => {
      if (!user) return;
      
      try {
        const { data, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('user_id', user.id)
          .single();
        
        if (error) {
          console.log('Profile fetch error:', error);
          // If profile doesn't exist, create one
          if (error.code === 'PGRST116') {
            const { data: newProfile, error: createError } = await supabase
              .from('profiles')
              .insert({
                user_id: user.id,
                full_name: user.user_metadata?.full_name || user.email,
                avatar_url: user.user_metadata?.avatar_url
              })
              .select()
              .single();
            
            if (createError) {
              console.error('Error creating profile:', createError);
            } else if (newProfile) {
              setUserProfile(newProfile as Profile);
            }
          }
        } else if (data) {
          setUserProfile(data as Profile);
        }
      } catch (error) {
        console.error('Error fetching profile:', error);
      }
    };
    
    fetchProfile();
  }, [user]);

  useEffect(() => {
    const loadProjectsAndTasks = async () => {
      if (!user) {
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      setError(null);
      
      try {
        const projectsData = await ProjectService.getProjects();
        
        // Get active projects only
        const activeProjects = projectsData.filter(p => p.status === 'active');
        setProjects(activeProjects);
        
        // Gather all tasks from all projects
        const allTasks: Task[] = [];
        projectsData.forEach(project => {
          if (Array.isArray(project.tasks)) {
            allTasks.push(...project.tasks.map(task => ({
              ...task,
              projectId: project.id
            })));
          }
        });
        
        // Show recent tasks sorted by due date (upcoming first)
        const sortedTasks = allTasks
          .sort((a, b) => a.dueDate.getTime() - b.dueDate.getTime())
          .filter(task => task.status !== 'completed')
          .slice(0, 4);
        
        setRecentTasks(sortedTasks);
      } catch (error) {
        console.error("Error loading projects and tasks:", error);
        setError("Failed to load projects and tasks");
        toast.error("Failed to load projects and tasks");
      } finally {
        setIsLoading(false);
      }
    };
    
    loadProjectsAndTasks();
  }, [user]);

  return {
    projects,
    recentTasks,
    userProfile,
    isLoading,
    error
  };
}
