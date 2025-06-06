
import { useState } from "react";
import { Task } from "@/types/project";
import { TaskCard } from "@/components/tasks/TaskCard";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Trash2 } from "lucide-react";

interface TaskListProps {
  tasks: Task[];
  onTaskClick: (task: Task) => void;
  onDeleteTask: (task: Task, event: React.MouseEvent) => void;
}

export function TaskList({ tasks, onTaskClick, onDeleteTask }: TaskListProps) {
  const [taskSubTab, setTaskSubTab] = useState("all");

  const filteredTasks = tasks.filter((task) => {
    if (taskSubTab === "all") return true;
    return task.status === taskSubTab;
  });

  return (
    <>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-transparent bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text">Tasks</h2>
        <Tabs
          defaultValue="all"
          value={taskSubTab}
          onValueChange={setTaskSubTab}
          className="w-auto"
        >
          <TabsList className="bg-gradient-to-r from-muted to-muted/80">
            <TabsTrigger value="all" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary/50 data-[state=active]:to-purple-500/50 data-[state=active]:text-primary-foreground transition-all">All</TabsTrigger>
            <TabsTrigger value="not-started" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary/50 data-[state=active]:to-purple-500/50 data-[state=active]:text-primary-foreground transition-all">Not Started</TabsTrigger>
            <TabsTrigger value="in-progress" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary/50 data-[state=active]:to-purple-500/50 data-[state=active]:text-primary-foreground transition-all">In Progress</TabsTrigger>
            <TabsTrigger value="completed" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary/50 data-[state=active]:to-purple-500/50 data-[state=active]:text-primary-foreground transition-all">Completed</TabsTrigger>
            <TabsTrigger value="delayed" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary/50 data-[state=active]:to-purple-500/50 data-[state=active]:text-primary-foreground transition-all">Delayed</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {filteredTasks.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTasks.map((task, index) => (
            <div key={task.id} className="hover:scale-[1.02] transition-transform animate-fade-in relative" style={{ animationDelay: `${index * 0.1 + 0.3}s` }}>
              <div className="absolute top-2 right-2 z-10">
                <Button 
                  variant="destructive" 
                  size="icon" 
                  className="h-7 w-7 bg-destructive/80 hover:bg-destructive"
                  onClick={(e) => onDeleteTask(task, e)}
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </Button>
              </div>
              <div onClick={() => onTaskClick(task)}>
                <TaskCard task={task} />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="py-16 flex items-center justify-center border rounded-lg bg-gradient-to-br from-muted/40 to-muted/20 animate-pulse">
          <p className="text-muted-foreground">
            {taskSubTab === "all"
              ? "No tasks in this project yet"
              : `No ${taskSubTab.replace("-", " ")} tasks`}
          </p>
        </div>
      )}
    </>
  );
}
