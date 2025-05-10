
import { Task } from "@/types/project";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { StatusBadge } from "./StatusBadge";
import { format } from "date-fns";
import { Users, Calendar, Clock } from "lucide-react";

interface TaskCardProps {
  task: Task;
  onClick?: () => void;
}

export function TaskCard({ task, onClick }: TaskCardProps) {
  // Calculate if task is late (due date is before today and not completed)
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const dueDate = new Date(task.dueDate);
  dueDate.setHours(0, 0, 0, 0);
  const isLate = dueDate < today && task.status !== 'completed';

  return (
    <Card 
      className={`
        hover:shadow-md transition-shadow cursor-pointer animate-fade-in 
        ${isLate ? 'border-red-300 hover:border-red-400' : ''} 
        hover:scale-[1.02] transition-transform bg-gradient-to-br from-card to-card/95
      `}
      onClick={onClick}
    >
      <CardHeader className="py-4 px-6 border-b border-border/30">
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
            <span className="flex-1">
              {task.assignedTo && task.assignedTo.length > 0 
                ? `${task.assignedTo.length} assignee${task.assignedTo.length !== 1 ? 's' : ''}` 
                : "No assignees"}
            </span>
          </div>
          <div className={`flex items-center gap-2 text-sm ${isLate ? 'text-red-500 font-medium' : ''}`}>
            <Calendar className={`h-4 w-4 ${isLate ? 'text-red-500' : 'text-muted-foreground'}`} />
            <span>
              {isLate ? 'OVERDUE: ' : 'Due: '} 
              {format(task.dueDate, "MMM d, yyyy")}
            </span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Clock className="h-4 w-4 text-muted-foreground" />
            <span>{task.duration} day{task.duration !== 1 ? 's' : ''}</span>
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
