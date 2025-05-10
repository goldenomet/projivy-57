
import { useState, useEffect } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { mockProjects } from "@/data/mockData";
import { Project, ProjectStatus } from "@/types/project";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { Button } from "@/components/ui/button";
import { PlusCircle, Filter } from "lucide-react";
import { Link } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [statusFilter, setStatusFilter] = useState<ProjectStatus[]>([
    "active",
    "on-hold",
    "completed",
    "cancelled",
  ]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    // Load projects from localStorage first
    const storedProjects = localStorage.getItem("projects");
    let localProjects: Project[] = [];
    
    if (storedProjects) {
      try {
        localProjects = JSON.parse(storedProjects).map((project: any) => ({
          ...project,
          startDate: new Date(project.startDate),
          endDate: new Date(project.endDate),
          tasks: project.tasks.map((task: any) => ({
            ...task,
            startDate: new Date(task.startDate),
            dueDate: new Date(task.dueDate),
          })),
        }));
      } catch (error) {
        console.error("Error loading projects from localStorage:", error);
      }
    }

    // Combine local projects with mock data, preventing duplicates by ID
    const existingIds = new Set(localProjects.map(p => p.id));
    const filteredMockProjects = mockProjects.filter(p => !existingIds.has(p.id));
    
    // Set combined projects
    setProjects([...localProjects, ...filteredMockProjects]);
  }, []);

  const filteredProjects = projects.filter(
    (project) =>
      statusFilter.includes(project.status) &&
      project.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleStatusFilterChange = (status: ProjectStatus) => {
    setStatusFilter((prev) =>
      prev.includes(status)
        ? prev.filter((s) => s !== status)
        : [...prev, status]
    );
  };

  return (
    <AppLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold tracking-tight">Projects</h1>
          <Link to="/projects/new">
            <Button>
              <PlusCircle className="mr-2 h-4 w-4" />
              New Project
            </Button>
          </Link>
        </div>

        <div className="flex items-center gap-4">
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="Search projects..."
              className="w-full pl-4 py-2 pr-10 rounded-md border border-input"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <span className="absolute right-3 top-2.5 text-muted-foreground">
              ⌕
            </span>
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="gap-2">
                <Filter className="h-4 w-4" />
                Filter
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-48">
              <DropdownMenuCheckboxItem
                checked={statusFilter.includes("active")}
                onCheckedChange={() => handleStatusFilterChange("active")}
              >
                Active
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                checked={statusFilter.includes("completed")}
                onCheckedChange={() => handleStatusFilterChange("completed")}
              >
                Completed
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                checked={statusFilter.includes("on-hold")}
                onCheckedChange={() => handleStatusFilterChange("on-hold")}
              >
                On Hold
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                checked={statusFilter.includes("cancelled")}
                onCheckedChange={() => handleStatusFilterChange("cancelled")}
              >
                Cancelled
              </DropdownMenuCheckboxItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {filteredProjects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        ) : (
          <div className="py-16 flex flex-col items-center justify-center border rounded-lg bg-muted/30">
            <p className="text-muted-foreground mb-2">No projects found</p>
            <p className="text-sm text-muted-foreground">
              {projects.length > 0
                ? "Try changing your filters"
                : "Create your first project!"}
            </p>
            <Link to="/projects/new" className="mt-4">
              <Button>
                <PlusCircle className="mr-2 h-4 w-4" />
                New Project
              </Button>
            </Link>
          </div>
        )}
      </div>
    </AppLayout>
  );
}
