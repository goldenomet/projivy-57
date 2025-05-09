
import { Project } from "@/types/project";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { format } from "date-fns";
import { Calendar, FileText } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800";
      case "completed":
        return "bg-blue-100 text-blue-800";
      case "on-hold":
        return "bg-yellow-100 text-yellow-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusLabel = (status: string) => {
    return status.charAt(0).toUpperCase() + status.slice(1).replace("-", " ");
  };

  return (
    <Link to={`/projects/${project.id}`}>
      <Card className="h-full hover:shadow-md transition-shadow cursor-pointer animate-fade-in">
        <CardHeader className="pb-2">
          <div className="flex justify-between items-start">
            <CardTitle>{project.name}</CardTitle>
            <Badge className={getStatusColor(project.status)}>
              {getStatusLabel(project.status)}
            </Badge>
          </div>
          <p className="text-sm text-muted-foreground">
            {project.description}
          </p>
        </CardHeader>
        <CardContent className="space-y-4 pb-2">
          <div className="space-y-2">
            <div className="flex justify-between items-center text-sm">
              <span>Progress</span>
              <span className="font-medium">{project.progress}%</span>
            </div>
            <Progress value={project.progress} />
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <Calendar className="h-4 w-4" />
              <span>{format(project.startDate, "MMM d")}</span>
              <span>-</span>
              <span>{format(project.endDate, "MMM d, yyyy")}</span>
            </div>
            <div className="flex items-center gap-1 text-sm text-muted-foreground justify-end">
              <FileText className="h-4 w-4" />
              <span>{project.tasks.length} tasks</span>
            </div>
          </div>
        </CardContent>
        <CardFooter className="pt-2">
          <div className="w-full flex justify-between items-center">
            <div className="flex -space-x-2">
              {[...new Set(project.tasks.flatMap(task => task.assignedTo))].slice(0, 3).map((userId, i) => (
                <div key={userId} className="h-8 w-8 rounded-full border-2 border-background overflow-hidden">
                  <img
                    src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${userId}`}
                    alt="User avatar"
                    className="h-full w-full object-cover"
                  />
                </div>
              ))}
              {[...new Set(project.tasks.flatMap(task => task.assignedTo))].length > 3 && (
                <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center text-xs border-2 border-background">
                  +{[...new Set(project.tasks.flatMap(task => task.assignedTo))].length - 3}
                </div>
              )}
            </div>
            <span className="text-sm font-medium text-primary">View Project</span>
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
}
