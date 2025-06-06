
import { format } from "date-fns";
import { Project, Task } from "@/types/project";
import { Calendar } from "lucide-react";
import { Progress } from "@/components/ui/progress";

interface ProjectProgressProps {
  project: Project;
  tasks: Task[];
}

export function ProjectProgress({ project, tasks }: ProjectProgressProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6 animate-slide-in" style={{ animationDelay: "0.1s" }}>
      <div className="flex flex-col gap-2 bg-gradient-to-br from-card to-card/80 p-4 rounded-lg border shadow-sm">
        <h3 className="text-sm font-medium">Project Timeline</h3>
        <div className="flex items-center gap-2 text-sm">
          <Calendar className="h-4 w-4 text-muted-foreground" />
          <span>
            {format(project.startDate, "MMM d, yyyy")} -{" "}
            {format(project.endDate, "MMM d, yyyy")}
          </span>
        </div>
      </div>

      <div className="flex flex-col gap-2 md:col-span-2 bg-gradient-to-br from-card to-card/80 p-4 rounded-lg border shadow-sm">
        <div className="flex justify-between items-center">
          <h3 className="text-sm font-medium">Project Progress</h3>
          <span className="text-sm font-medium">{project.progress}%</span>
        </div>
        <Progress
          value={project.progress}
          className="h-3 bg-gradient-to-r from-secondary/30 to-secondary/10"
        />
        <p className="text-xs text-muted-foreground mt-1">
          {tasks.filter(t => t.status === 'completed').length} of {tasks.length} tasks completed
        </p>
      </div>
    </div>
  );
}
