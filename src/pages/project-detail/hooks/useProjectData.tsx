
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Project, Task } from "@/types/project";
import { toast } from "sonner";
import { calculateProjectProgress } from "../utils/projectUtils";

export function useProjectData(id: string | undefined) {
  const navigate = useNavigate();
  const [project, setProject] = useState<Project | null>(null);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [deletedTaskIds, setDeletedTaskIds] = useState<Set<string>>(new Set());

  // Load project data from localStorage
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
          setTasks(formattedProject.tasks || []);
          setIsLoading(false);
          return;
        }
      } catch (error) {
        console.error("Error loading project from localStorage:", error);
        toast.error("Error loading project data");
      }
    }
    
    // Check if the project ID is in the deleted projects list
    const storedDeletedIds = localStorage.getItem("deletedProjectIds");
    if (storedDeletedIds) {
      try {
        const deletedIdsArray = JSON.parse(storedDeletedIds);
        if (Array.isArray(deletedIdsArray) && deletedIdsArray.includes(id)) {
          toast.error("This project has been deleted");
          navigate("/projects");
          return;
        }
      } catch (error) {
        console.error("Error checking deleted project IDs:", error);
      }
    }
    
    // If not found in localStorage and not deleted, redirect to projects page
    toast.error("Project not found");
    navigate("/projects");
  }, [id, navigate]);

  // Update project tasks in state and localStorage
  const updateProjectTasks = (projectId: string, updatedTasks: Task[]) => {
    if (!project) return;
    
    // Update localStorage
    const storedProjects = localStorage.getItem("projects");
    if (storedProjects) {
      try {
        const parsedProjects = JSON.parse(storedProjects);
        const updatedProjects = parsedProjects.map((p: any) => {
          if (p.id === projectId) {
            // Calculate the new progress when updating tasks
            const newProgress = calculateProjectProgress(updatedTasks);
            return { 
              ...p, 
              tasks: updatedTasks,
              progress: newProgress
            };
          }
          return p;
        });
        localStorage.setItem("projects", JSON.stringify(updatedProjects));
      } catch (error) {
        console.error("Error updating project tasks in localStorage:", error);
        toast.error("Failed to save changes");
      }
    }
    
    // Update project state
    const newProgress = calculateProjectProgress(updatedTasks);
    setProject({ ...project, tasks: updatedTasks, progress: newProgress });
  };

  // Update project progress whenever tasks change
  useEffect(() => {
    if (project && tasks.length > 0) {
      const updatedProgress = calculateProjectProgress(tasks);
      
      // Only update if progress has changed
      if (updatedProgress !== project.progress) {
        const updatedProject = { ...project, progress: updatedProgress };
        setProject(updatedProject);
        
        // Update in localStorage
        const storedProjects = localStorage.getItem("projects");
        if (storedProjects) {
          try {
            const parsedProjects = JSON.parse(storedProjects);
            const updatedProjects = parsedProjects.map((p: any) => {
              if (p.id === project.id) {
                return { ...p, progress: updatedProgress };
              }
              return p;
            });
            localStorage.setItem("projects", JSON.stringify(updatedProjects));
          } catch (error) {
            console.error("Error updating project progress in localStorage:", error);
          }
        }
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
