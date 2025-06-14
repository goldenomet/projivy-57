
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { CalendarPlus, Edit, Plus } from "lucide-react";
import { Task } from "@/types/project";

interface CalendarDayViewProps {
  selectedDate: Date | undefined;
  dayTasks: Task[];
  onAddEvent: () => void;
  onEditTask: (task: Task) => void;
}

export function CalendarDayView({
  selectedDate,
  dayTasks,
  onAddEvent,
  onEditTask
}: CalendarDayViewProps) {
  const getTaskStatusColor = (status: string) => {
    switch (status) {
      case "not-started":
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200";
      case "in-progress":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200";
      case "completed":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
      case "delayed":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200";
      case "on-hold":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200";
      case "cancelled":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200";
    }
  };

  return (
    <Card className="card-gradient">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>
            {selectedDate ? format(selectedDate, "EEEE, MMMM d, yyyy") : "Select a date"}
          </span>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="animate-pulse-soft">
              {dayTasks.length} {dayTasks.length === 1 ? 'Task' : 'Tasks'}
            </Badge>
            {selectedDate && (
              <Button 
                size="sm" 
                variant="outline"
                onClick={onAddEvent}
                className="interactive-button"
              >
                <Plus className="h-3 w-3 mr-1" />
                Add Event
              </Button>
            )}
          </div>
        </CardTitle>
        <CardDescription>
          {dayTasks.length > 0 ? "Tasks and events scheduled for this day" : "No tasks scheduled for this day"}
        </CardDescription>
      </CardHeader>
      <CardContent>
        {dayTasks.length > 0 ? (
          <div className="space-y-3">
            {dayTasks.map((task, index) => (
              <div 
                key={task.id} 
                className="interactive-card p-4 border rounded-lg hover:bg-muted/30 group animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="font-medium text-sm">{task.name}</h3>
                      <Badge 
                        className={`${getTaskStatusColor(task.status)} text-xs transition-colors`}
                      >
                        {task.status.replace("-", " ")}
                      </Badge>
                    </div>
                    {task.description && (
                      <p className="text-xs text-muted-foreground mb-3 line-clamp-2">
                        {task.description}
                      </p>
                    )}
                    
                    <div className="grid grid-cols-2 gap-3 text-xs">
                      <div className="flex items-center gap-1">
                        <span className="text-muted-foreground">Project:</span>
                        <span className="font-medium">{task.projectId}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <span className="text-muted-foreground">Duration:</span>
                        <span>{task.duration} days</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <span className="text-muted-foreground">Start:</span>
                        <span>{format(task.startDate, "MMM d")}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <span className="text-muted-foreground">Due:</span>
                        <span>{format(task.dueDate, "MMM d")}</span>
                      </div>
                    </div>
                  </div>
                  
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onEditTask(task)}
                    className="opacity-0 group-hover:opacity-100 transition-opacity interactive-button ml-2"
                  >
                    <Edit className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="py-16 flex flex-col items-center justify-center text-center space-y-4">
            <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center animate-bounce-gentle">
              <CalendarPlus className="h-6 w-6 text-muted-foreground" />
            </div>
            <div>
              <p className="text-muted-foreground mb-2">No tasks scheduled for this day</p>
              <Button 
                variant="outline" 
                size="sm"
                onClick={onAddEvent}
                className="interactive-button"
              >
                <Plus className="h-3 w-3 mr-1" />
                Create your first event
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
