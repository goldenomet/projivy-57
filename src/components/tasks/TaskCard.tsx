
import { Task } from "@/types/project";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { StatusBadge } from "./StatusBadge";
import { format } from "date-fns";
import { Users, Calendar, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";

interface TaskCardProps {
  task: Task;
  onClick?: () => void;
}

export function TaskCard({ task, onClick }: TaskCardProps) {
  return (
    <Card className="hover:shadow-md transition-shadow cursor-pointer animate-fade-in" onClick={onClick}>
      <CardHeader className="py-4 px-6">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-lg font-semibold line-clamp-1">{task.name}</h3>
            <p className="text-sm text-muted-foreground line-clamp-2 mt-1">{task.description}</p>
          </div>
          <StatusBadge status={task.status} />
        </div>
      </CardHeader>
      <CardContent className="py-3 px-6">
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2 text-sm">
            <Users className="h-4 w-4 text-muted-foreground" />
            <span>{task.assignedTo.length} assignees</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <span>Due: {format(task.dueDate, "MMM d, yyyy")}</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Clock className="h-4 w-4 text-muted-foreground" />
            <span>{task.duration} days</span>
          </div>
        </div>
        {task.remarks && (
          <div className="mt-3 pt-3 border-t text-sm">
            <p className="italic text-muted-foreground">{task.remarks}</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
