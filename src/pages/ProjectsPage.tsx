
import { useState, useEffect } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { mockProjects } from "@/data/mockData";
import { Project, ProjectStatus } from "@/types/project";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { Button } from "@/components/ui/button";
import { PlusCircle, Filter, ChevronLeft } from "lucide-react";
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
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Load projects from localStorage first
    setIsLoading(true);
    const storedProjects = localStorage.getItem("projects");
    let localProjects: Project[] = [];
    
    if (storedProjects) {
      try {
        const parsedProjects = JSON.parse(storedProjects);
        localProjects = Array.isArray(parsedProjects) ? parsedProjects.map((project: any) => ({
          ...project,
          startDate: new Date(project.startDate),
          endDate: new Date(project.endDate),
          tasks: Array.isArray(project.tasks) ? project.tasks.map((task: any) => ({
            ...task,
            startDate: task.startDate ? new Date(task.startDate) : new Date(),
            dueDate: task.dueDate ? new Date(task.dueDate) : new Date(),
          })) : [],
        })) : [];
        
        console.log("Loaded projects from localStorage:", localProjects);
      } catch (error) {
        console.error("Error loading projects from localStorage:", error);
      }
    }

    // Combine local projects with mock data, preventing duplicates by ID
    const existingIds = new Set(localProjects.map(p => p.id));
    const filteredMockProjects = mockProjects.filter(p => !existingIds.has(p.id));
    
    // Set combined projects
    setProjects([...localProjects, ...filteredMockProjects]);
    setIsLoading(false);
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
      <div className="space-y-6 animate-fade-in">
        <div className="flex flex-col space-y-2">
          <Link to="/">
            <Button variant="ghost" size="sm" className="-ml-2 hover:scale-105 transition-transform">
              <ChevronLeft className="h-4 w-4 mr-1" />
              Back to Dashboard
            </Button>
          </Link>
          
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold tracking-tight text-transparent bg-gradient-to-r from-primary to-purple-500 bg-clip-text">Projects</h1>
            <Link to="/projects/new">
              <Button className="bg-gradient-to-r from-primary to-purple-500 hover:opacity-90 transition-opacity shadow-md hover:shadow-lg hover:scale-105 transition-all">
                <PlusCircle className="mr-2 h-4 w-4" />
                New Project
              </Button>
            </Link>
          </div>
        </div>

        <div className="flex items-center gap-4 animate-slide-in" style={{ animationDelay: "0.1s" }}>
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="Search projects..."
              className="w-full pl-4 py-2 pr-10 rounded-md border border-input bg-gradient-to-br from-card to-card/80 focus:ring-2 focus:ring-primary/50 transition-all"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <span className="absolute right-3 top-2.5 text-muted-foreground">
              ⌕
            </span>
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="gap-2 hover:bg-gradient-to-r hover:from-accent/50 hover:to-accent/30 transition-all">
                <Filter className="h-4 w-4" />
                Filter
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-48 bg-gradient-to-br from-popover to-popover/95 backdrop-blur-sm">
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

        <div className="animate-slide-in" style={{ animationDelay: "0.2s" }}>
          {!isLoading ? (
            filteredProjects.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProjects.map((project, index) => (
                  <div key={project.id} className="hover:scale-[1.02] transition-transform animate-fade-in" style={{ animationDelay: `${index * 0.1 + 0.3}s` }}>
                    <ProjectCard key={project.id} project={project} />
                  </div>
                ))}
              </div>
            ) : (
              <div className="py-16 flex flex-col items-center justify-center border rounded-lg bg-gradient-to-br from-muted/40 to-muted/20 animate-pulse">
                <p className="text-muted-foreground mb-2">No projects found</p>
                <p className="text-sm text-muted-foreground">
                  {projects.length > 0
                    ? "Try changing your filters"
                    : "Create your first project!"}
                </p>
                <Link to="/projects/new" className="mt-4">
                  <Button className="bg-gradient-to-r from-primary to-purple-500 hover:opacity-90 hover:scale-105 transition-all">
                    <PlusCircle className="mr-2 h-4 w-4" />
                    New Project
                  </Button>
                </Link>
              </div>
            )
          ) : (
            <div className="py-16 flex flex-col items-center justify-center border rounded-lg bg-gradient-to-br from-muted/40 to-muted/20 animate-pulse">
              <p className="text-muted-foreground">Loading projects...</p>
            </div>
          )}
        </div>
      </div>
    </AppLayout>
  );
}
