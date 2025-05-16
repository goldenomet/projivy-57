
import { Task } from "@/types/project";
import { TaskCard } from "@/components/tasks/TaskCard";
import { Link } from "react-router-dom";

interface TasksSectionProps {
  tasks: Task[];
  isLoading: boolean;
}

export function TasksSection({ tasks, isLoading }: TasksSectionProps) {
  return (
    <div className="animate-slide-in" style={{ animationDelay: "0.3s" }}>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-transparent bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text">Upcoming Tasks</h2>
        <Link to="/projects" className="text-primary hover:text-primary/80 hover:underline text-sm transition-colors">
          View all tasks
        </Link>
      </div>
      {!isLoading ? (
        tasks.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {tasks.map((task, index) => (
              <div key={task.id} className="animate-fade-in hover:scale-[1.02] transition-transform" style={{ animationDelay: `${(index * 0.1) + 0.4}s` }}>
                <Link to={`/projects/${task.projectId}`}>
                  <TaskCard task={task} />
                </Link>
              </div>
            ))}
          </div>
        ) : (
          <div className="py-12 flex items-center justify-center border rounded-lg bg-gradient-to-br from-muted/50 to-muted/30">
            <p className="text-muted-foreground">No upcoming tasks found</p>
          </div>
        )
      ) : (
        <div className="py-12 flex items-center justify-center border rounded-lg bg-gradient-to-br from-muted/50 to-muted/30 animate-pulse">
          <p className="text-muted-foreground">Loading tasks...</p>
        </div>
      )}
    </div>
  );
}
