
import { Project } from "@/types/project";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";

interface ProjectsSectionProps {
  projects: Project[];
  isLoading: boolean;
}

export function ProjectsSection({ projects, isLoading }: ProjectsSectionProps) {
  return (
    <div className="animate-slide-in">
      <h2 className="text-xl font-semibold mb-4 text-transparent bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text">Active Projects</h2>
      {!isLoading ? (
        projects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project, index) => (
              <div key={project.id} className="animate-fade-in hover:scale-[1.02] transition-transform" style={{ animationDelay: `${index * 0.1}s` }}>
                <ProjectCard project={project} />
              </div>
            ))}
          </div>
        ) : (
          <div className="py-12 flex flex-col items-center justify-center border rounded-lg bg-gradient-to-br from-muted/50 to-muted/30">
            <p className="text-muted-foreground mb-4">No active projects found</p>
            <Link to="/projects/new">
              <Button className="bg-gradient-to-r from-primary to-purple-500 hover:opacity-90 transition-opacity hover:scale-105 transition-all">
                <PlusCircle className="mr-2 h-4 w-4" />
                Create New Project
              </Button>
            </Link>
          </div>
        )
      ) : (
        <div className="py-12 flex items-center justify-center border rounded-lg bg-gradient-to-br from-muted/50 to-muted/30 animate-pulse">
          <p className="text-muted-foreground">Loading projects...</p>
        </div>
      )}
    </div>
  );
}
