
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
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-transparent bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text">
          Active Projects
        </h2>
        <Link to="/projects">
          <Button variant="outline" size="sm">
            View All Projects
          </Button>
        </Link>
      </div>
      
      {!isLoading ? (
        projects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {projects.map((project, index) => (
              <div key={project.id} className="animate-fade-in hover:scale-[1.02] transition-transform" style={{ animationDelay: `${index * 0.1}s` }}>
                <ProjectCard project={project} />
              </div>
            ))}
          </div>
        ) : (
          <div className="py-16 flex flex-col items-center justify-center border-2 border-dashed border-muted rounded-lg bg-gradient-to-br from-muted/20 to-muted/10">
            <div className="text-center space-y-4">
              <div className="mx-auto w-16 h-16 bg-muted/30 rounded-full flex items-center justify-center">
                <PlusCircle className="h-8 w-8 text-muted-foreground" />
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">No Active Projects</h3>
                <p className="text-muted-foreground mb-4 max-w-sm">
                  Get started by creating your first project to organize your tasks and collaborate with your team.
                </p>
                <Link to="/projects/new">
                  <Button className="bg-gradient-to-r from-primary to-purple-500 hover:opacity-90 transition-opacity hover:scale-105 transition-all">
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Create New Project
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        )
      ) : (
        <div className="py-16 flex items-center justify-center border rounded-lg bg-gradient-to-br from-muted/50 to-muted/30">
          <div className="flex items-center gap-3">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
            <p className="text-muted-foreground">Loading projects...</p>
          </div>
        </div>
      )}
    </div>
  );
}
