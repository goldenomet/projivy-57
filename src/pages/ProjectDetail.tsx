import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { AppLayout } from "@/components/layout/AppLayout";
import { Project, Task } from "@/types/project";
import { Button } from "@/components/ui/button";
import { TaskCard } from "@/components/tasks/TaskCard";
import { TaskForm } from "@/components/tasks/TaskForm";
import { FileManager } from "@/components/files/FileManager";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import {
  PlusCircle,
  Calendar,
  CheckCircle,
  XCircle,
  PauseCircle,
  PlayCircle,
  ChevronLeft,
  Trash2
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { DeleteConfirmDialog } from "@/components/projects/DeleteConfirmDialog";

export default function ProjectDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [project, setProject] = useState<Project | null>(null);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isNewTaskDialogOpen, setIsNewTaskDialogOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [activeTab, setActiveTab] = useState("tasks");
  const [taskSubTab, setTaskSubTab] = useState("all");
  const [isLoading, setIsLoading] = useState(true);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState<Task | null>(null);
  const [isProjectDeleteDialogOpen, setIsProjectDeleteDialogOpen] = useState(false);
  const [deletedTaskIds, setDeletedTaskIds] = useState<Set<string>>(new Set());
  
  // Calculate project progress based on task completion
  const calculateProjectProgress = (projectTasks: Task[]): number => {
    if (!projectTasks || projectTasks.length === 0) return 0;
    
    const completedTasks = projectTasks.filter(task => task.status === 'completed').length;
    return Math.round((completedTasks / projectTasks.length) * 100);
  };

  useEffect(() => {
    if (!id) return;
    
    setIsLoading(true);
    
    // Try to load project from localStorage first
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

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "active":
        return <PlayCircle className="h-5 w-5 text-green-600" />;
      case "completed":
        return <CheckCircle className="h-5 w-5 text-blue-600" />;
      case "on-hold":
        return <PauseCircle className="h-5 w-5 text-yellow-600" />;
      case "cancelled":
        return <XCircle className="h-5 w-5 text-red-600" />;
      default:
        return null;
    }
  };

  const getStatusLabel = (status: string) => {
    return status.charAt(0).toUpperCase() + status.slice(1).replace("-", " ");
  };

  const filteredTasks = tasks.filter((task) => {
    if (taskSubTab === "all") return true;
    return task.status === taskSubTab;
  });

  const handleNewTask = () => {
    setSelectedTask(null);
    setIsNewTaskDialogOpen(true);
  };

  const handleTaskClick = (task: Task) => {
    setSelectedTask(task);
    setIsNewTaskDialogOpen(true);
  };

  const handleTaskSubmit = (taskData: any) => {
    try {
      if (selectedTask) {
        // Update existing task
        const updatedTasks = tasks.map((task) =>
          task.id === selectedTask.id
            ? { ...task, ...taskData }
            : task
        );
        setTasks(updatedTasks);
        
        // Update project in state and localStorage
        if (project) {
          updateProjectTasks(project.id, updatedTasks);
          
          // Show appropriate toast message based on status change
          if (taskData.status === 'completed' && selectedTask.status !== 'completed') {
            toast.success(`Task "${taskData.name}" marked as completed!`);
          } else {
            toast.success("Task updated successfully");
          }
        }
      } else {
        // Create new task
        const newTask: Task = {
          id: `task${Date.now()}`, // More unique ID
          projectId: project?.id || "",
          ...taskData,
        };
        const updatedTasks = [...tasks, newTask];
        setTasks(updatedTasks);
        
        // Update project in state and localStorage
        if (project) {
          updateProjectTasks(project.id, updatedTasks);
          toast.success("New task created successfully");
        }
      }
      setIsNewTaskDialogOpen(false);
    } catch (error) {
      console.error("Error handling task submission:", error);
      toast.error("Failed to save task");
    }
  };
  
  // Helper function to update project tasks in state and localStorage
  const updateProjectTasks = (projectId: string, updatedTasks: Task[]) => {
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
              progress: newProgress // Update progress based on task completion
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
    if (project) {
      const newProgress = calculateProjectProgress(updatedTasks);
      setProject({ ...project, tasks: updatedTasks, progress: newProgress });
    }
  };

  // Function to handle task deletion
  const handleDeleteTask = (task: Task, event: React.MouseEvent) => {
    event.stopPropagation(); // Prevent clicking through to the task card
    setTaskToDelete(task);
    setIsDeleteDialogOpen(true);
  };

  // Function to confirm task deletion
  const confirmDeleteTask = () => {
    if (!taskToDelete || !project) return;
    
    try {
      const updatedTasks = tasks.filter((t) => t.id !== taskToDelete.id);
      setTasks(updatedTasks);
      
      // Add to deleted tasks set
      const newDeletedIds = new Set(deletedTaskIds);
      newDeletedIds.add(taskToDelete.id);
      setDeletedTaskIds(newDeletedIds);
      
      // Update project in state and localStorage
      updateProjectTasks(project.id, updatedTasks);
      toast.success("Task deleted successfully");
      
      // Close the dialog
      setIsDeleteDialogOpen(false);
      setTaskToDelete(null);
    } catch (error) {
      console.error("Error deleting task:", error);
      toast.error("Failed to delete task");
    }
  };

  // Function to delete the entire project
  const handleDeleteProject = () => {
    setIsProjectDeleteDialogOpen(true);
  };

  // Function to confirm project deletion
  const confirmDeleteProject = () => {
    if (!project) return;
    
    try {
      // Get existing projects from localStorage
      const storedProjects = localStorage.getItem("projects");
      if (storedProjects) {
        const parsedProjects = JSON.parse(storedProjects);
        const updatedProjects = parsedProjects.filter((p: any) => p.id !== project.id);
        
        // Update localStorage
        localStorage.setItem("projects", JSON.stringify(updatedProjects));
        
        // Add to deleted projects list
        const storedDeletedIds = localStorage.getItem("deletedProjectIds");
        let deletedIds: string[] = [];
        
        if (storedDeletedIds) {
          try {
            deletedIds = JSON.parse(storedDeletedIds);
          } catch (error) {
            console.error("Error parsing deleted project IDs:", error);
          }
        }
        
        if (!deletedIds.includes(project.id)) {
          deletedIds.push(project.id);
          localStorage.setItem("deletedProjectIds", JSON.stringify(deletedIds));
        }
        
        // Show success message and navigate back to projects page
        toast.success("Project deleted successfully");
        navigate("/projects");
      } else {
        // Just navigate away as the project might be from mock data
        navigate("/projects");
      }
    } catch (error) {
      console.error("Error deleting project:", error);
      toast.error("Failed to delete project");
    }
  };

  if (isLoading) {
    return (
      <AppLayout>
        <div className="flex items-center justify-center h-full">
          <div className="space-y-4 text-center animate-pulse">
            <div className="mx-auto w-12 h-12 rounded-full border-4 border-primary border-t-transparent animate-spin"></div>
            <p className="text-muted-foreground">Loading project...</p>
          </div>
        </div>
      </AppLayout>
    );
  }

  if (!project) {
    return (
      <AppLayout>
        <div className="flex flex-col items-center justify-center h-full space-y-4">
          <p className="text-xl text-muted-foreground">Project not found</p>
          <Button onClick={() => navigate("/projects")}>
            <ChevronLeft className="mr-2 h-4 w-4" />
            Back to Projects
          </Button>
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <div className="space-y-8 animate-fade-in">
        <div>
          <div className="flex items-start justify-between">
            <div className="space-y-2">
              <Link to="/projects">
                <Button variant="ghost" size="sm" className="mb-2 -ml-2 hover:scale-105 transition-transform">
                  <ChevronLeft className="h-4 w-4 mr-1" />
                  Back to Projects
                </Button>
              </Link>
              <h1 className="text-3xl font-bold tracking-tight text-transparent bg-gradient-to-r from-primary to-purple-500 bg-clip-text">
                {project.name}
              </h1>
              <p className="text-muted-foreground">
                {project.description}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Badge className="flex gap-1 items-center px-3 py-1 bg-gradient-to-r from-secondary/80 to-secondary/60 hover:from-secondary hover:to-secondary/80 transition-all">
                {getStatusIcon(project.status)}
                <span>{getStatusLabel(project.status)}</span>
              </Badge>
              <Button 
                onClick={handleNewTask}
                className="bg-gradient-to-r from-primary to-purple-500 hover:opacity-90 shadow-md hover:shadow-lg hover:scale-105 transition-all"
              >
                <PlusCircle className="mr-2 h-4 w-4" />
                New Task
              </Button>
              <Button
                onClick={handleDeleteProject}
                variant="destructive"
                size="icon"
                className="hover:bg-destructive/90 hover:scale-105 transition-all"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6 animate-slide-in" style={{ animationDelay: "0.1s" }}>
            <div className="flex flex-col gap-2 bg-gradient-to-br from-card to-card/80 p-4 rounded-lg border shadow-sm">
              <h3 className="text-sm font-medium">Project Timeline</h3>
              <div className="flex items-center gap-2 text-sm">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span>
                  {format(project.startDate, "MMM d, yyyy")} -{" "}
                  {format(project.endDate, "MMM d, yyyy")}
                </span>
              </div>
            </div>

            <div className="flex flex-col gap-2 md:col-span-2 bg-gradient-to-br from-card to-card/80 p-4 rounded-lg border shadow-sm">
              <div className="flex justify-between items-center">
                <h3 className="text-sm font-medium">Project Progress</h3>
                <span className="text-sm font-medium">{project.progress}%</span>
              </div>
              <Progress
                value={project.progress}
                className="h-3 bg-gradient-to-r from-secondary/30 to-secondary/10"
              />
              <p className="text-xs text-muted-foreground mt-1">
                {tasks.filter(t => t.status === 'completed').length} of {tasks.length} tasks completed
              </p>
            </div>
          </div>
        </div>

        <div className="animate-slide-in" style={{ animationDelay: "0.2s" }}>
          <Tabs
            defaultValue="tasks"
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full"
          >
            <TabsList className="bg-gradient-to-r from-muted to-muted/80 mb-6">
              <TabsTrigger value="tasks" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary/50 data-[state=active]:to-purple-500/50 data-[state=active]:text-primary-foreground transition-all">Tasks</TabsTrigger>
              <TabsTrigger value="files" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary/50 data-[state=active]:to-purple-500/50 data-[state=active]:text-primary-foreground transition-all">Files</TabsTrigger>
            </TabsList>

            <TabsContent value="tasks" className="mt-0">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-transparent bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text">Tasks</h2>
                <Tabs
                  defaultValue="all"
                  value={taskSubTab}
                  onValueChange={setTaskSubTab}
                  className="w-auto"
                >
                  <TabsList className="bg-gradient-to-r from-muted to-muted/80">
                    <TabsTrigger value="all" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary/50 data-[state=active]:to-purple-500/50 data-[state=active]:text-primary-foreground transition-all">All</TabsTrigger>
                    <TabsTrigger value="not-started" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary/50 data-[state=active]:to-purple-500/50 data-[state=active]:text-primary-foreground transition-all">Not Started</TabsTrigger>
                    <TabsTrigger value="in-progress" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary/50 data-[state=active]:to-purple-500/50 data-[state=active]:text-primary-foreground transition-all">In Progress</TabsTrigger>
                    <TabsTrigger value="completed" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary/50 data-[state=active]:to-purple-500/50 data-[state=active]:text-primary-foreground transition-all">Completed</TabsTrigger>
                    <TabsTrigger value="delayed" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary/50 data-[state=active]:to-purple-500/50 data-[state=active]:text-primary-foreground transition-all">Delayed</TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>

              {filteredTasks.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredTasks.map((task, index) => (
                    <div key={task.id} className="hover:scale-[1.02] transition-transform animate-fade-in relative" style={{ animationDelay: `${index * 0.1 + 0.3}s` }}>
                      <div className="absolute top-2 right-2 z-10">
                        <Button 
                          variant="destructive" 
                          size="icon" 
                          className="h-7 w-7 bg-destructive/80 hover:bg-destructive"
                          onClick={(e) => handleDeleteTask(task, e)}
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </Button>
                      </div>
                      <div onClick={() => handleTaskClick(task)}>
                        <TaskCard task={task} />
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="py-16 flex items-center justify-center border rounded-lg bg-gradient-to-br from-muted/40 to-muted/20 animate-pulse">
                  <p className="text-muted-foreground">
                    {taskSubTab === "all"
                      ? "No tasks in this project yet"
                      : `No ${taskSubTab.replace("-", " ")} tasks`}
                  </p>
                </div>
              )}
            </TabsContent>

            <TabsContent value="files" className="mt-0">
              <FileManager projectId={project.id} />
            </TabsContent>
          </Tabs>
        </div>

        <Dialog
          open={isNewTaskDialogOpen}
          onOpenChange={setIsNewTaskDialogOpen}
        >
          <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto bg-gradient-to-br from-card to-card/95 animate-fade-in">
            <DialogHeader>
              <DialogTitle className="text-transparent bg-gradient-to-r from-primary to-purple-500 bg-clip-text">
                {selectedTask ? "Edit Task" : "Create New Task"}
              </DialogTitle>
            </DialogHeader>
            <TaskForm
              task={selectedTask || undefined}
              projectId={project.id}
              existingTasks={tasks.filter(
                (task) => !selectedTask || task.id !== selectedTask.id
              )}
              onSubmit={handleTaskSubmit}
              onCancel={() => setIsNewTaskDialogOpen(false)}
            />
          </DialogContent>
        </Dialog>

        {/* Task Delete Confirmation Dialog */}
        <DeleteConfirmDialog
          isOpen={isDeleteDialogOpen}
          onClose={() => {
            setIsDeleteDialogOpen(false);
            setTaskToDelete(null);
          }}
          onConfirm={confirmDeleteTask}
          title="Delete Task"
          description="Are you sure you want to delete this task? This action cannot be undone."
        />

        {/* Project Delete Confirmation Dialog */}
        <DeleteConfirmDialog
          isOpen={isProjectDeleteDialogOpen}
          onClose={() => setIsProjectDeleteDialogOpen(false)}
          onConfirm={confirmDeleteProject}
          title="Delete Project"
          description="Are you sure you want to delete this entire project? This will delete all tasks and cannot be undone."
        />
      </div>
    </AppLayout>
  );
}
