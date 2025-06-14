
import { Task } from "@/types/project";
import { TaskCard } from "@/components/tasks/TaskCard";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Calendar, Clock } from "lucide-react";

interface TasksSectionProps {
  tasks: Task[];
  isLoading: boolean;
}

export function TasksSection({ tasks, isLoading }: TasksSectionProps) {
  return (
    <div className="animate-slide-in" style={{ animationDelay: "0.3s" }}>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-transparent bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text">
          Upcoming Tasks
        </h2>
        <Link to="/projects">
          <Button variant="outline" size="sm">
            View All Tasks
          </Button>
        </Link>
      </div>
      
      {!isLoading ? (
        tasks.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {tasks.map((task, index) => (
              <div key={task.id} className="animate-fade-in hover:scale-[1.02] transition-transform" style={{ animationDelay: `${(index * 0.1) + 0.4}s` }}>
                <Link to={`/projects/${task.projectId}`}>
                  <TaskCard task={task} />
                </Link>
              </div>
            ))}
          </div>
        ) : (
          <div className="py-16 flex flex-col items-center justify-center border-2 border-dashed border-muted rounded-lg bg-gradient-to-br from-muted/20 to-muted/10">
            <div className="text-center space-y-4">
              <div className="mx-auto w-16 h-16 bg-muted/30 rounded-full flex items-center justify-center">
                <Calendar className="h-8 w-8 text-muted-foreground" />
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">No Upcoming Tasks</h3>
                <p className="text-muted-foreground max-w-sm">
                  All caught up! Create new projects or tasks to see them here.
                </p>
              </div>
            </div>
          </div>
        )
      ) : (
        <div className="py-16 flex items-center justify-center border rounded-lg bg-gradient-to-br from-muted/50 to-muted/30">
          <div className="flex items-center gap-3">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
            <p className="text-muted-foreground">Loading tasks...</p>
          </div>
        </div>
      )}
    </div>
  );
}
