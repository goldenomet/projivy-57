
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Project, Task } from "@/types/project";
import { toast } from "sonner";
import { calculateProjectProgress } from "../utils/projectUtils";
import { ProjectService } from "@/services/projectService";
import { supabase } from "@/integrations/supabase/client";

export function useProjectData(id: string | undefined) {
  const navigate = useNavigate();
  const [project, setProject] = useState<Project | null>(null);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [deletedTaskIds, setDeletedTaskIds] = useState<Set<string>>(new Set());

  // Load project data from Supabase
  useEffect(() => {
    if (!id) return;
    
    const fetchProject = async () => {
      setIsLoading(true);
      
      try {
        const projects = await ProjectService.getProjects();
        const foundProject = projects.find(p => p.id === id);
        
        if (foundProject) {
          setProject(foundProject);
          setTasks(foundProject.tasks || []);
        } else {
          toast.error("Project not found");
          navigate("/projects");
        }
      } catch (error) {
        console.error("Error loading project:", error);
        toast.error("Error loading project data");
        navigate("/projects");
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchProject();
  }, [id, navigate]);

  // Update project tasks in Supabase
  const updateProjectTasks = async (projectId: string, updatedTasks: Task[]) => {
    if (!project) return;
    
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('No authenticated user');

      // Calculate the new progress
      const newProgress = calculateProjectProgress(updatedTasks);
      
      // Update project progress in Supabase
      await ProjectService.updateProject(projectId, { progress: newProgress });
      
      // Update project state
      setProject({ ...project, tasks: updatedTasks, progress: newProgress });
    } catch (error) {
      console.error("Error updating project tasks:", error);
      toast.error("Failed to save changes");
    }
  };

  // Update project progress whenever tasks change
  useEffect(() => {
    if (project && tasks.length > 0) {
      const updatedProgress = calculateProjectProgress(tasks);
      
      // Only update if progress has changed
      if (updatedProgress !== project.progress) {
        const updatedProject = { ...project, progress: updatedProgress };
        setProject(updatedProject);
        
        // Update in Supabase
        ProjectService.updateProject(project.id, { progress: updatedProgress });
      }
    }
  }, [tasks, project]);

  return { 
    project, 
    setProject, 
    tasks, 
    setTasks, 
    isLoading, 
    deletedTaskIds, 
    setDeletedTaskIds, 
    updateProjectTasks 
  };
}
