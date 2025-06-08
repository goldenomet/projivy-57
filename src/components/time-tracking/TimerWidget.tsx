
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Play, Pause, Clock } from "lucide-react";
import { TimeEntry } from "@/types/timeTracking";
import { Project, Task } from "@/types/project";

interface TimerWidgetProps {
  runningTimer: TimeEntry | null;
  projects: Project[];
  onStartTimer: (projectId: string, taskId?: string, description?: string) => void;
  onStopTimer: () => void;
}

export function TimerWidget({ runningTimer, projects, onStartTimer, onStopTimer }: TimerWidgetProps) {
  const [selectedProjectId, setSelectedProjectId] = useState<string>("");
  const [selectedTaskId, setSelectedTaskId] = useState<string>("");
  const [description, setDescription] = useState("");
  const [currentTime, setCurrentTime] = useState("");

  // Update timer display every second
  useEffect(() => {
    if (!runningTimer) return;

    const updateTimer = () => {
      const startTime = new Date(runningTimer.start_time);
      const now = new Date();
      const diffMs = now.getTime() - startTime.getTime();
      const hours = Math.floor(diffMs / (1000 * 60 * 60));
      const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diffMs % (1000 * 60)) / 1000);
      
      setCurrentTime(`${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`);
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);

    return () => clearInterval(interval);
  }, [runningTimer]);

  const selectedProject = projects.find(p => p.id === selectedProjectId);
  const availableTasks = selectedProject?.tasks || [];

  const handleStart = () => {
    if (!selectedProjectId) return;
    onStartTimer(selectedProjectId, selectedTaskId || undefined, description || undefined);
    setDescription("");
  };

  const getProjectName = (projectId: string) => {
    return projects.find(p => p.id === projectId)?.name || 'Unknown Project';
  };

  const getTaskName = (taskId?: string) => {
    if (!taskId || !selectedProject) return null;
    return selectedProject.tasks.find(t => t.id === taskId)?.name || 'Unknown Task';
  };

  if (runningTimer) {
    return (
      <Card className="border-green-200 bg-green-50 dark:bg-green-950/20 dark:border-green-800">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center text-green-700 dark:text-green-400">
            <Clock className="h-4 w-4 mr-2 animate-pulse" />
            Timer Running
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="text-2xl font-mono text-green-600 dark:text-green-400">
              {currentTime}
            </div>
            <div className="text-sm text-muted-foreground">
              <div>Project: {getProjectName(runningTimer.project_id)}</div>
              {runningTimer.task_id && (
                <div>Task: {getTaskName(runningTimer.task_id)}</div>
              )}
              {runningTimer.description && (
                <div>Description: {runningTimer.description}</div>
              )}
            </div>
            <Button 
              onClick={onStopTimer}
              variant="destructive"
              className="w-full"
            >
              <Pause className="h-4 w-4 mr-2" />
              Stop Timer
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center">
          <Clock className="h-4 w-4 mr-2" />
          Start Timer
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <Select value={selectedProjectId} onValueChange={setSelectedProjectId}>
            <SelectTrigger>
              <SelectValue placeholder="Select project" />
            </SelectTrigger>
            <SelectContent>
              {projects.map((project) => (
                <SelectItem key={project.id} value={project.id}>
                  {project.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {availableTasks.length > 0 && (
            <Select value={selectedTaskId} onValueChange={setSelectedTaskId}>
              <SelectTrigger>
                <SelectValue placeholder="Select task (optional)" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">No specific task</SelectItem>
                {availableTasks.map((task) => (
                  <SelectItem key={task.id} value={task.id}>
                    {task.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}

          <Input
            placeholder="Description (optional)"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <Button 
            onClick={handleStart}
            disabled={!selectedProjectId}
            className="w-full"
          >
            <Play className="h-4 w-4 mr-2" />
            Start Timer
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
