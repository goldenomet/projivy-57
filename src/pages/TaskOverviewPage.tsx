
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AppLayout } from "@/components/layout/AppLayout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
} from "lucide-react";
import { format, isPast, isToday } from "date-fns";
import { supabase } from "@/integrations/supabase/client";
import { cn } from "@/lib/utils";

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
};

const priorityColors: Record<string, string> = {
  low: "bg-green-600",
  medium: "bg-yellow-500",
  high: "bg-red-500",
};

export default function TaskOverviewPage() {
  const navigate = useNavigate();
  const [tasks, setTasks] = useState<TaskWithProject[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortField, setSortField] = useState<string>("dueDate");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

  useEffect(() => {
    fetchAllTasks();
  }, []);

  const fetchAllTasks = async () => {
    setIsLoading(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      // Fetch all tasks with their projects
      const { data: tasksData, error: tasksError } = await supabase
        .from("tasks")
        .select("*")
        .eq("user_id", user.id);

      if (tasksError) throw tasksError;

      const { data: projectsData, error: projectsError } = await supabase
        .from("projects")
        .select("id, name, status")
        .eq("user_id", user.id);

      if (projectsError) throw projectsError;

      // Create a map of project IDs to project info
      const projectMap = new Map(
        (projectsData || []).map((p) => [p.id, { name: p.name, status: p.status }])
      );

      // Map tasks with project info
      const mappedTasks: TaskWithProject[] = (tasksData || []).map((task) => {
        const project = projectMap.get(task.project_id) || { name: "Unknown", status: "active" };
        // Derive category from project name (e.g., EIA, ECM, EAu)
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
      console.error("Error fetching tasks:", error);
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

  const filteredTasks = tasks
    .filter((task) => {
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

  return (
    <AppLayout>
      <div className="space-y-6 animate-fade-in">
        {/* Header */}
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-2xl">📊</span>
            <h1 className="text-3xl font-bold tracking-tight">Project Tracker</h1>
          </div>
          <p className="text-muted-foreground">Central task overview across all projects</p>
        </div>

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
            <Button variant="outline" size="icon">
              <Filter className="h-4 w-4" />
            </Button>
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
          <div className="flex flex-col items-center justify-center py-12 text-center">
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
                      <Badge variant="outline">{task.projectCategory}</Badge>
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
    </AppLayout>
  );
}
