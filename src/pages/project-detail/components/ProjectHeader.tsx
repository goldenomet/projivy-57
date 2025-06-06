
import { Link } from "react-router-dom";
import { Project } from "@/types/project";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ChevronLeft } from "lucide-react";
import { getStatusIcon, getStatusLabel } from "../utils/projectUtils";
import { icons } from "lucide-react";

interface ProjectHeaderProps {
  project: Project;
}

export function ProjectHeader({ project }: ProjectHeaderProps) {
  // Dynamic icon component
  const StatusIcon = icons[getStatusIcon(project.status) as keyof typeof icons];
  
  return (
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
      <Badge className="flex gap-1 items-center px-3 py-1 bg-gradient-to-r from-secondary/80 to-secondary/60 hover:from-secondary hover:to-secondary/80 transition-all">
        {StatusIcon && <StatusIcon className="h-5 w-5 text-secondary" />}
        <span>{getStatusLabel(project.status)}</span>
      </Badge>
    </div>
  );
}
