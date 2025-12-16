
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AppLayout } from "@/components/layout/AppLayout";
import { Project, Task } from "@/types/project";
import { TaskForm } from "@/components/tasks/TaskForm";
import { FileManager } from "@/components/files/FileManager";
import { CollaborationPanel } from "@/components/collaboration/CollaborationPanel";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DeleteConfirmDialog } from "@/components/projects/DeleteConfirmDialog";
import { useProjectData } from "./hooks/useProjectData";
import { ProjectHeader } from "./components/ProjectHeader";
import { ProjectProgress } from "./components/ProjectProgress";
import { ProjectActions } from "./components/ProjectActions";
import { TaskList } from "./components/TaskList";

export default function ProjectDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  const { 
    project, 
    tasks, 
    isLoading,
    createTask,
    updateTask,
    deleteTask,
    deleteProject
  } = useProjectData(id);
  
  const [isNewTaskDialogOpen, setIsNewTaskDialogOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [activeTab, setActiveTab] = useState("tasks");
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState<Task | null>(null);
  const [isProjectDeleteDialogOpen, setIsProjectDeleteDialogOpen] = useState(false);

  const handleNewTask = () => {
    setSelectedTask(null);
    setIsNewTaskDialogOpen(true);
  };

  const handleTaskClick = (task: Task) => {
    setSelectedTask(task);
    setIsNewTaskDialogOpen(true);
  };

  const handleTaskSubmit = async (taskData: any) => {
    try {
      if (selectedTask) {
        // Update existing task
        const success = await updateTask(selectedTask.id, taskData);
        if (success) {
          if (taskData.status === 'completed' && selectedTask.status !== 'completed') {
            toast.success(`Task "${taskData.name}" marked as completed!`);
          } else {
            toast.success("Task updated successfully");
          }
        } else {
          toast.error("Failed to update task");
        }
      } else {
        // Create new task
        const newTask = await createTask(taskData);
        if (newTask) {
          toast.success("New task created successfully");
        } else {
          toast.error("Failed to create task");
        }
      }
      setIsNewTaskDialogOpen(false);
    } catch (error) {
      console.error("Error handling task submission:", error);
      toast.error("Failed to save task");
    }
  };

  // Function to handle task deletion
  const handleDeleteTask = (task: Task, event: React.MouseEvent) => {
    event.stopPropagation();
    setTaskToDelete(task);
    setIsDeleteDialogOpen(true);
  };

  // Function to confirm task deletion
  const confirmDeleteTask = async () => {
    if (!taskToDelete) return;
    
    try {
      const success = await deleteTask(taskToDelete.id);
      if (success) {
        toast.success("Task deleted successfully");
      } else {
        toast.error("Failed to delete task");
      }
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
  const confirmDeleteProject = async () => {
    try {
      const success = await deleteProject();
      if (!success) {
        toast.error("Failed to delete project");
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
            <ProjectHeader project={project} />
            <ProjectActions 
              projectId={project.id}
              onNewTask={handleNewTask}
              onDeleteProject={handleDeleteProject}
            />
          </div>

          <ProjectProgress project={project} tasks={tasks} />
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
              <TabsTrigger value="collaboration" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary/50 data-[state=active]:to-purple-500/50 data-[state=active]:text-primary-foreground transition-all">Collaboration</TabsTrigger>
            </TabsList>

            <TabsContent value="tasks" className="mt-0">
              <TaskList 
                tasks={tasks}
                onTaskClick={handleTaskClick}
                onDeleteTask={handleDeleteTask}
              />
            </TabsContent>

            <TabsContent value="files" className="mt-0">
              <FileManager projectId={project.id} />
            </TabsContent>

            <TabsContent value="collaboration" className="mt-0">
              <CollaborationPanel projectId={project.id} />
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
