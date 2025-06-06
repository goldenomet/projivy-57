
import { Task } from "@/types/project";

// Calculate project progress based on task completion
export const calculateProjectProgress = (tasks: Task[]): number => {
  if (!tasks || tasks.length === 0) return 0;
  
  const completedTasks = tasks.filter(task => task.status === 'completed').length;
  return Math.round((completedTasks / tasks.length) * 100);
};

// Get status icon based on status string
export const getStatusIcon = (status: string) => {
  switch (status) {
    case "active":
      return "PlayCircle";
    case "completed":
      return "CheckCircle";
    case "on-hold":
      return "PauseCircle";
    case "cancelled":
      return "XCircle";
    default:
      return "CircleDot";
  }
};

// Format status label from kebab-case to Title Case
export const getStatusLabel = (status: string) => {
  return status.charAt(0).toUpperCase() + status.slice(1).replace("-", " ");
};
