
import { useEffect, useState } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { mockTasks } from "@/data/mockData";
import { Task } from "@/types/project";
import { Calendar } from "@/components/ui/calendar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";

export default function CalendarPage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [dayTasks, setDayTasks] = useState<Task[]>([]);

  useEffect(() => {
    // Simulate data loading
    setTimeout(() => {
      setTasks(mockTasks);
    }, 300);
  }, []);

  useEffect(() => {
    // Filter tasks for selected date
    if (selectedDate && tasks.length > 0) {
      const tasksOnDay = tasks.filter((task) => {
        const taskStartDate = new Date(task.startDate);
        const taskDueDate = new Date(task.dueDate);
        const selected = new Date(selectedDate);
        
        // Reset time components for date comparison
        const taskStart = new Date(taskStartDate.getFullYear(), taskStartDate.getMonth(), taskStartDate.getDate());
        const taskEnd = new Date(taskDueDate.getFullYear(), taskDueDate.getMonth(), taskDueDate.getDate());
        const selectedDay = new Date(selected.getFullYear(), selected.getMonth(), selected.getDate());
        
        return taskStart <= selectedDay && taskEnd >= selectedDay;
      });
      setDayTasks(tasksOnDay);
    }
  }, [selectedDate, tasks]);

  const getTaskStatusColor = (status: string) => {
    switch (status) {
      case "not-started":
        return "bg-gray-100 text-gray-800";
      case "in-progress":
        return "bg-blue-100 text-blue-800";
      case "completed":
        return "bg-green-100 text-green-800";
      case "delayed":
        return "bg-yellow-100 text-yellow-800";
      case "on-hold":
        return "bg-purple-100 text-purple-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <AppLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold tracking-tight">Calendar</h1>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-1 bg-card rounded-lg p-4 border shadow-sm flex justify-center">
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
              className="pointer-events-auto"
            />
          </div>
          
          <div className="md:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  {selectedDate ? format(selectedDate, "MMMM d, yyyy") : "Select a date"}
                  <Badge variant="outline">{dayTasks.length} Tasks</Badge>
                </CardTitle>
                <CardDescription>
                  {dayTasks.length > 0 ? "Tasks scheduled for this day" : "No tasks scheduled for this day"}
                </CardDescription>
              </CardHeader>
              <CardContent>
                {dayTasks.length > 0 ? (
                  <div className="space-y-4">
                    {dayTasks.map((task) => (
                      <div key={task.id} className="p-4 border rounded-md hover:bg-muted/50 transition-colors">
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="font-medium">{task.name}</h3>
                            <p className="text-sm text-muted-foreground mt-1">{task.description}</p>
                          </div>
                          <Badge className={getTaskStatusColor(task.status)}>
                            {task.status.replace("-", " ")}
                          </Badge>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-2 mt-3 text-sm">
                          <div>
                            <span className="text-muted-foreground">Project: </span>
                            <span>{task.projectId}</span>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Due: </span>
                            <span>{format(task.dueDate, "MMM d, yyyy")}</span>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Assignee: </span>
                            <span>{task.assignedTo.length > 0 ? `${task.assignedTo.length} people` : "Unassigned"}</span>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Duration: </span>
                            <span>{task.duration} days</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="py-12 flex items-center justify-center border rounded-lg bg-muted/30 text-muted-foreground">
                    No tasks scheduled for this day
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
