
import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Project, Task } from "@/types/project";
import { toast } from "sonner";
import { calculateProjectProgress } from "../utils/projectUtils";
import { ProjectService } from "@/services/projectService";
import { TaskService } from "@/services/taskService";
import { supabase } from "@/integrations/supabase/client";

export function useProjectData(id: string | undefined) {
  const navigate = useNavigate();
  const [project, setProject] = useState<Project | null>(null);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Load project data from Supabase
  const fetchProjectData = useCallback(async () => {
    if (!id) return;
    
    setIsLoading(true);
    
    try {
      const projects = await ProjectService.getProjects();
      const foundProject = projects.find(p => p.id === id);
      
      if (foundProject) {
        setProject(foundProject);
        // Fetch tasks separately for this project
        const projectTasks = await TaskService.getTasksByProject(id);
        setTasks(projectTasks);
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
  }, [id, navigate]);

  useEffect(() => {
    fetchProjectData();
  }, [fetchProjectData]);

  // Create a new task
  const createTask = async (taskData: Omit<Task, 'id' | 'projectId'>) => {
    if (!project) return null;
    
    try {
      const newTask = await TaskService.createTask(project.id, taskData);
      if (newTask) {
        const updatedTasks = [...tasks, newTask];
        setTasks(updatedTasks);
        
        // Update project progress
        const newProgress = calculateProjectProgress(updatedTasks);
        await ProjectService.updateProject(project.id, { progress: newProgress });
        setProject({ ...project, progress: newProgress });
        
        return newTask;
      }
      return null;
    } catch (error) {
      console.error("Error creating task:", error);
      throw error;
    }
  };

  // Update an existing task
  const updateTask = async (taskId: string, updates: Partial<Task>) => {
    if (!project) return false;
    
    try {
      const success = await TaskService.updateTask(taskId, updates);
      if (success) {
        const updatedTasks = tasks.map(t => 
          t.id === taskId ? { ...t, ...updates } : t
        );
        setTasks(updatedTasks);
        
        // Update project progress
        const newProgress = calculateProjectProgress(updatedTasks);
        await ProjectService.updateProject(project.id, { progress: newProgress });
        setProject({ ...project, progress: newProgress });
        
        return true;
      }
      return false;
    } catch (error) {
      console.error("Error updating task:", error);
      throw error;
    }
  };

  // Delete a task
  const deleteTask = async (taskId: string) => {
    if (!project) return false;
    
    try {
      const success = await TaskService.deleteTask(taskId);
      if (success) {
        const updatedTasks = tasks.filter(t => t.id !== taskId);
        setTasks(updatedTasks);
        
        // Update project progress
        const newProgress = calculateProjectProgress(updatedTasks);
        await ProjectService.updateProject(project.id, { progress: newProgress });
        setProject({ ...project, progress: newProgress });
        
        return true;
      }
      return false;
    } catch (error) {
      console.error("Error deleting task:", error);
      throw error;
    }
  };

  // Delete the project
  const deleteProject = async () => {
    if (!project) return false;
    
    try {
      const success = await ProjectService.deleteProject(project.id);
      if (success) {
        toast.success("Project deleted successfully");
        navigate("/projects");
        return true;
      }
      return false;
    } catch (error) {
      console.error("Error deleting project:", error);
      throw error;
    }
  };

  return { 
    project, 
    setProject, 
    tasks, 
    setTasks, 
    isLoading,
    createTask,
    updateTask,
    deleteTask,
    deleteProject,
    refetch: fetchProjectData
  };
}
