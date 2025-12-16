
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AppLayout } from "@/components/layout/AppLayout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Star,
  Filter,
  Search,
  ArrowUpDown,
  AlertCircle,
  CheckCircle2,
  Clock,
  Loader2,
  FolderOpen,
  ListTodo,
  TrendingUp,
  Calendar,
} from "lucide-react";
import { format, isPast, isToday } from "date-fns";
import { supabase } from "@/integrations/supabase/client";
import { cn } from "@/lib/utils";

interface ProjectSummary {
  id: string;
  name: string;
  category: string;
  status: string;
  progress: number;
  taskCount: number;
  completedTasks: number;
  endDate: Date;
}

interface TaskWithProject {
  id: string;
  name: string;
  projectId: string;
  projectName: string;
  projectCategory: string;
  status: string;
  assignee: string;
  priority: string;
  dueDate: Date;
  updatedAt: Date;
  action: string;
}

const statusColors: Record<string, string> = {
  "not-started": "bg-gray-500",
  "in-progress": "bg-emerald-500",
  "completed": "bg-blue-500",
  "delayed": "bg-red-500",
  "on-hold": "bg-yellow-500",
  "active": "bg-emerald-500",
  "cancelled": "bg-red-500",
};

const priorityColors: Record<string, string> = {
  low: "bg-green-600",
  medium: "bg-yellow-500",
  high: "bg-red-500",
};

const categoryColors: Record<string, string> = {
  EIA: "bg-blue-500",
  ECM: "bg-purple-500",
  EAu: "bg-orange-500",
  Other: "bg-gray-500",
};

export default function TaskOverviewPage() {
  const navigate = useNavigate();
  const [projects, setProjects] = useState<ProjectSummary[]>([]);
  const [tasks, setTasks] = useState<TaskWithProject[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortField, setSortField] = useState<string>("dueDate");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  useEffect(() => {
    fetchAllData();
  }, []);

  const fetchAllData = async () => {
    setIsLoading(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      // Fetch all projects
      const { data: projectsData, error: projectsError } = await supabase
        .from("projects")
        .select("*")
        .eq("user_id", user.id);

      if (projectsError) throw projectsError;

      // Fetch all tasks
      const { data: tasksData, error: tasksError } = await supabase
        .from("tasks")
        .select("*")
        .eq("user_id", user.id);

      if (tasksError) throw tasksError;

      // Create project summaries with task counts
      const projectSummaries: ProjectSummary[] = (projectsData || []).map((p) => {
        const projectTasks = (tasksData || []).filter((t) => t.project_id === p.id);
        const completedTasks = projectTasks.filter((t) => t.status === "completed").length;
        
        return {
          id: p.id,
          name: p.name,
          category: detectCategory(p.name),
          status: p.status || "active",
          progress: p.progress || 0,
          taskCount: projectTasks.length,
          completedTasks,
          endDate: p.end_date ? new Date(p.end_date) : new Date(),
        };
      });

      setProjects(projectSummaries);

      // Create a map of project IDs to project info
      const projectMap = new Map(
        (projectsData || []).map((p) => [p.id, { name: p.name, status: p.status }])
      );

      // Map tasks with project info
      const mappedTasks: TaskWithProject[] = (tasksData || []).map((task) => {
        const project = projectMap.get(task.project_id) || { name: "Unknown", status: "active" };
        const category = task.project_id ? detectCategory(project.name) : "Other";
        
        return {
          id: task.id,
          name: task.title,
          projectId: task.project_id || "",
          projectName: project.name,
          projectCategory: category,
          status: task.status || "not-started",
          assignee: task.assignee || "Unassigned",
          priority: task.priority || "medium",
          dueDate: task.due_date ? new Date(task.due_date) : new Date(),
          updatedAt: task.updated_at ? new Date(task.updated_at) : new Date(),
          action: task.description || "",
        };
      });

      setTasks(mappedTasks);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const detectCategory = (projectName: string): string => {
    const name = projectName.toLowerCase();
    if (name.includes("eia")) return "EIA";
    if (name.includes("ecm")) return "ECM";
    if (name.includes("eau") || name.includes("audit")) return "EAu";
    return "Other";
  };

  const isPastDue = (dueDate: Date, status: string): boolean => {
    return isPast(dueDate) && !isToday(dueDate) && status !== "completed";
  };

  // Filter projects by category
  const filteredProjects = projects.filter((p) => {
    if (selectedCategory === "all") return true;
    return p.category === selectedCategory;
  });

  const filteredTasks = tasks
    .filter((task) => {
      // Category filter
      if (selectedCategory !== "all" && task.projectCategory !== selectedCategory) {
        return false;
      }
      // Tab filter
      if (activeTab === "in-progress") return task.status === "in-progress";
      if (activeTab === "completed") return task.status === "completed";
      if (activeTab === "delayed") return task.status === "delayed" || isPastDue(task.dueDate, task.status);
      return true;
    })
    .filter((task) => {
      // Search filter
      if (!searchQuery) return true;
      const query = searchQuery.toLowerCase();
      return (
        task.name.toLowerCase().includes(query) ||
        task.projectName.toLowerCase().includes(query) ||
        task.assignee.toLowerCase().includes(query)
      );
    })
    .sort((a, b) => {
      let comparison = 0;
      switch (sortField) {
        case "name":
          comparison = a.name.localeCompare(b.name);
          break;
        case "project":
          comparison = a.projectName.localeCompare(b.projectName);
          break;
        case "status":
          comparison = a.status.localeCompare(b.status);
          break;
        case "dueDate":
          comparison = a.dueDate.getTime() - b.dueDate.getTime();
          break;
        case "priority":
          const priorityOrder = { high: 0, medium: 1, low: 2 };
          comparison = (priorityOrder[a.priority as keyof typeof priorityOrder] || 1) - 
                      (priorityOrder[b.priority as keyof typeof priorityOrder] || 1);
          break;
        default:
          comparison = 0;
      }
      return sortDirection === "asc" ? comparison : -comparison;
    });

  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const handleRowClick = (task: TaskWithProject) => {
    navigate(`/projects/${task.projectId}`);
  };

  const handleProjectClick = (projectId: string) => {
    navigate(`/projects/${projectId}`);
  };

  const getStatusBadge = (status: string) => {
    const displayStatus = status.replace("-", " ");
    return (
      <Badge className={cn("capitalize", statusColors[status] || "bg-gray-500")}>
        {displayStatus}
      </Badge>
    );
  };

  const getPriorityBadge = (priority: string) => {
    return (
      <Badge className={cn("capitalize", priorityColors[priority] || "bg-yellow-500")}>
        {priority}
      </Badge>
    );
  };

  // Stats calculations
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((t) => t.status === "completed").length;
  const inProgressTasks = tasks.filter((t) => t.status === "in-progress").length;
  const pastDueTasks = tasks.filter((t) => isPastDue(t.dueDate, t.status)).length;

  const categories = ["all", "EIA", "ECM", "EAu", "Other"];

  return (
    <AppLayout>
      <div className="space-y-6 animate-fade-in">
        {/* Header */}
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-2xl">📊</span>
            <h1 className="text-3xl font-bold tracking-tight">Project Tracker</h1>
          </div>
          <p className="text-muted-foreground">Central overview of all projects and tasks</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card className="bg-gradient-to-br from-blue-500/10 to-blue-600/5 border-blue-500/20">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-500/20 rounded-lg">
                  <FolderOpen className="h-5 w-5 text-blue-500" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{projects.length}</p>
                  <p className="text-xs text-muted-foreground">Total Projects</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-emerald-500/10 to-emerald-600/5 border-emerald-500/20">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-emerald-500/20 rounded-lg">
                  <ListTodo className="h-5 w-5 text-emerald-500" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{totalTasks}</p>
                  <p className="text-xs text-muted-foreground">Total Tasks</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-purple-500/10 to-purple-600/5 border-purple-500/20">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-purple-500/20 rounded-lg">
                  <TrendingUp className="h-5 w-5 text-purple-500" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{inProgressTasks}</p>
                  <p className="text-xs text-muted-foreground">In Progress</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-red-500/10 to-red-600/5 border-red-500/20">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-red-500/20 rounded-lg">
                  <AlertCircle className="h-5 w-5 text-red-500" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{pastDueTasks}</p>
                  <p className="text-xs text-muted-foreground">Past Due</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Category Filters */}
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-sm font-medium text-muted-foreground mr-2">Category:</span>
          {categories.map((cat) => (
            <Button
              key={cat}
              variant={selectedCategory === cat ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(cat)}
              className={cn(
                "capitalize",
                selectedCategory === cat && cat !== "all" && categoryColors[cat]
              )}
            >
              {cat === "all" ? "All" : cat}
              {cat !== "all" && (
                <Badge variant="secondary" className="ml-2 h-5 px-1.5">
                  {projects.filter((p) => p.category === cat).length}
                </Badge>
              )}
            </Button>
          ))}
        </div>

        {/* Projects Overview */}
        {filteredProjects.length > 0 && (
          <div className="space-y-3">
            <h2 className="text-lg font-semibold flex items-center gap-2">
              <FolderOpen className="h-5 w-5" />
              Projects ({filteredProjects.length})
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredProjects.slice(0, 6).map((project) => (
                <Card 
                  key={project.id} 
                  className="cursor-pointer hover:shadow-md transition-all hover:scale-[1.02]"
                  onClick={() => handleProjectClick(project.id)}
                >
                  <CardContent className="p-4 space-y-3">
                    <div className="flex items-start justify-between">
                      <div className="space-y-1">
                        <h3 className="font-medium line-clamp-1">{project.name}</h3>
                        <Badge className={cn("text-xs", categoryColors[project.category])}>
                          {project.category}
                        </Badge>
                      </div>
                      {getStatusBadge(project.status)}
                    </div>
                    <div className="space-y-1">
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>Progress</span>
                        <span>{project.progress}%</span>
                      </div>
                      <Progress value={project.progress} className="h-2" />
                    </div>
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span>{project.completedTasks}/{project.taskCount} tasks</span>
                      <div className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {format(project.endDate, "MMM d, yyyy")}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            {filteredProjects.length > 6 && (
              <Button variant="outline" onClick={() => navigate("/projects")} className="w-full">
                View all {filteredProjects.length} projects
              </Button>
            )}
          </div>
        )}

        {/* Tasks Section */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold flex items-center gap-2">
            <ListTodo className="h-5 w-5" />
            Tasks
          </h2>

          {/* Tabs and Filters */}
          <div className="flex flex-col sm:flex-row justify-between gap-4">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="bg-muted">
                <TabsTrigger value="all" className="gap-2">
                  <Star className="h-4 w-4" />
                  All Tasks
                </TabsTrigger>
                <TabsTrigger value="in-progress">In Progress</TabsTrigger>
                <TabsTrigger value="completed">Completed</TabsTrigger>
                <TabsTrigger value="delayed">Past Due</TabsTrigger>
              </TabsList>
            </Tabs>

            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search tasks..."
                  className="pl-8 w-[200px]"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* Task Count */}
          <div className="text-sm text-muted-foreground">
            Showing {filteredTasks.length} of {tasks.length} tasks
          </div>

          {/* Tasks Table */}
          {isLoading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : filteredTasks.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center border rounded-lg">
              <CheckCircle2 className="h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium">No tasks found</h3>
              <p className="text-muted-foreground">
                {searchQuery ? "Try adjusting your search" : "Create a project and add tasks to get started"}
              </p>
            </div>
          ) : (
            <div className="border rounded-lg overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow className="bg-muted/50">
                    <TableHead className="w-12">S/N</TableHead>
                    <TableHead className="cursor-pointer" onClick={() => handleSort("name")}>
                      <div className="flex items-center gap-1">
                        Task name
                        <ArrowUpDown className="h-3 w-3" />
                      </div>
                    </TableHead>
                    <TableHead className="cursor-pointer" onClick={() => handleSort("project")}>
                      <div className="flex items-center gap-1">
                        Project
                        <ArrowUpDown className="h-3 w-3" />
                      </div>
                    </TableHead>
                    <TableHead className="cursor-pointer" onClick={() => handleSort("status")}>
                      <div className="flex items-center gap-1">
                        Status
                        <ArrowUpDown className="h-3 w-3" />
                      </div>
                    </TableHead>
                    <TableHead>Assignee</TableHead>
                    <TableHead className="cursor-pointer" onClick={() => handleSort("priority")}>
                      <div className="flex items-center gap-1">
                        Priority
                        <ArrowUpDown className="h-3 w-3" />
                      </div>
                    </TableHead>
                    <TableHead className="cursor-pointer" onClick={() => handleSort("dueDate")}>
                      <div className="flex items-center gap-1">
                        Due date
                        <ArrowUpDown className="h-3 w-3" />
                      </div>
                    </TableHead>
                    <TableHead>Past due</TableHead>
                    <TableHead className="max-w-[200px]">Action/Notes</TableHead>
                    <TableHead>Updated at</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredTasks.map((task, index) => (
                    <TableRow
                      key={task.id}
                      className="cursor-pointer hover:bg-muted/50 transition-colors"
                      onClick={() => handleRowClick(task)}
                    >
                      <TableCell className="font-medium text-muted-foreground">
                        {index + 1}
                      </TableCell>
                      <TableCell className="font-medium max-w-[200px]">
                        <span className="line-clamp-2">{task.name}</span>
                      </TableCell>
                      <TableCell>
                        <Badge className={cn("text-xs", categoryColors[task.projectCategory])}>
                          {task.projectCategory}
                        </Badge>
                      </TableCell>
                      <TableCell>{getStatusBadge(task.status)}</TableCell>
                      <TableCell className="text-sm">{task.assignee}</TableCell>
                      <TableCell>{getPriorityBadge(task.priority)}</TableCell>
                      <TableCell className="text-sm">
                        {format(task.dueDate, "dd/MM/yyyy")}
                      </TableCell>
                      <TableCell>
                        {isPastDue(task.dueDate, task.status) ? (
                          <div className="flex items-center gap-1 text-red-500">
                            <AlertCircle className="h-4 w-4" />
                            <span className="text-xs">Past Due</span>
                          </div>
                        ) : (
                          <div className="flex items-center gap-1 text-muted-foreground">
                            <Clock className="h-4 w-4" />
                            <span className="text-xs">On Track</span>
                          </div>
                        )}
                      </TableCell>
                      <TableCell className="max-w-[200px]">
                        <span className="line-clamp-2 text-sm text-muted-foreground">
                          {task.action || "-"}
                        </span>
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground">
                        {format(task.updatedAt, "MMM d, yyyy h:mm a")}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </div>
      </div>
    </AppLayout>
  );
}
