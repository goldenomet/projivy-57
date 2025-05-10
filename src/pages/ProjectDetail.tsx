import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { AppLayout } from "@/components/layout/AppLayout";
import { mockProjects, mockTasks } from "@/data/mockData";
import { Project, Task } from "@/types/project";
import { Button } from "@/components/ui/button";
import { TaskCard } from "@/components/tasks/TaskCard";
import { TaskForm } from "@/components/tasks/TaskForm";
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
  ChevronLeft
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function ProjectDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [project, setProject] = useState<Project | null>(null);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isNewTaskDialogOpen, setIsNewTaskDialogOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [activeTab, setActiveTab] = useState("all");

  useEffect(() => {
    if (!id) return;
    
    // Try to load project from localStorage first
    const storedProjects = localStorage.getItem("projects");
    if (storedProjects) {
      try {
        const parsedProjects = JSON.parse(storedProjects);
        const localProject = parsedProjects.find((p: any) => p.id === id);
        
        if (localProject) {
          // Convert date strings to Date objects
          const project = {
            ...localProject,
            startDate: new Date(localProject.startDate),
            endDate: new Date(localProject.endDate),
            tasks: localProject.tasks?.map((task: any) => ({
              ...task,
              startDate: new Date(task.startDate),
              dueDate: new Date(task.dueDate),
            })) || []
          };
          
          setProject(project);
          setTasks(project.tasks || []);
          return;
        }
      } catch (error) {
        console.error("Error loading project from localStorage:", error);
      }
    }
    
    // If not found in localStorage, try mock data
    const foundProject = mockProjects.find((p) => p.id === id);
    if (foundProject) {
      setProject(foundProject);
      setTasks(mockTasks.filter((task) => task.projectId === id));
    } else {
      navigate("/projects");
    }
  }, [id, navigate]);

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
    if (activeTab === "all") return true;
    return task.status === activeTab;
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
      }
    } else {
      // Create new task
      const newTask: Task = {
        id: `task${tasks.length + 1}`,
        projectId: project?.id || "",
        ...taskData,
      };
      const updatedTasks = [...tasks, newTask];
      setTasks(updatedTasks);
      
      // Update project in state and localStorage
      if (project) {
        updateProjectTasks(project.id, updatedTasks);
      }
    }
    setIsNewTaskDialogOpen(false);
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
            return { ...p, tasks: updatedTasks };
          }
          return p;
        });
        localStorage.setItem("projects", JSON.stringify(updatedProjects));
      } catch (error) {
        console.error("Error updating project tasks in localStorage:", error);
      }
    }
    
    // Update project state
    if (project) {
      setProject({ ...project, tasks: updatedTasks });
    }
  };

  if (!project) {
    return (
      <AppLayout>
        <div className="flex items-center justify-center h-full">
          <p>Loading project...</p>
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <div className="space-y-8">
        <div>
          <div className="flex items-start justify-between">
            <div className="space-y-2">
              <Link to="/projects">
                <Button variant="ghost" size="sm" className="mb-2 -ml-2">
                  <ChevronLeft className="h-4 w-4 mr-1" />
                  Back to Projects
                </Button>
              </Link>
              <h1 className="text-3xl font-bold tracking-tight">
                {project.name}
              </h1>
              <p className="text-muted-foreground">
                {project.description}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Badge className="flex gap-1 items-center px-3 py-1">
                {getStatusIcon(project.status)}
                <span>{getStatusLabel(project.status)}</span>
              </Badge>
              <Button onClick={handleNewTask}>
                <PlusCircle className="mr-2 h-4 w-4" />
                New Task
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
            <div className="flex flex-col gap-2">
              <h3 className="text-sm font-medium">Project Timeline</h3>
              <div className="flex items-center gap-2 text-sm">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span>
                  {format(project.startDate, "MMM d, yyyy")} -{" "}
                  {format(project.endDate, "MMM d, yyyy")}
                </span>
              </div>
            </div>

            <div className="flex flex-col gap-2 md:col-span-2">
              <div className="flex justify-between items-center">
                <h3 className="text-sm font-medium">Project Progress</h3>
                <span className="text-sm font-medium">{project.progress}%</span>
              </div>
              <Progress
                value={project.progress}
                className="h-3"
              />
            </div>
          </div>
        </div>

        <div>
          <Tabs
            defaultValue="all"
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full"
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Tasks</h2>
              <TabsList>
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="not-started">Not Started</TabsTrigger>
                <TabsTrigger value="in-progress">In Progress</TabsTrigger>
                <TabsTrigger value="completed">Completed</TabsTrigger>
                <TabsTrigger value="delayed">Delayed</TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value={activeTab} className="mt-0">
              {filteredTasks.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredTasks.map((task) => (
                    <TaskCard
                      key={task.id}
                      task={task}
                      onClick={() => handleTaskClick(task)}
                    />
                  ))}
                </div>
              ) : (
                <div className="py-16 flex items-center justify-center border rounded-lg bg-muted/30">
                  <p className="text-muted-foreground">
                    {activeTab === "all"
                      ? "No tasks in this project yet"
                      : `No ${activeTab.replace("-", " ")} tasks`}
                  </p>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>

        <Dialog
          open={isNewTaskDialogOpen}
          onOpenChange={setIsNewTaskDialogOpen}
        >
          <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
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
      </div>
    </AppLayout>
  );
}
