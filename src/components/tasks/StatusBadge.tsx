
import { TaskStatus } from "@/types/project";
import { cn } from "@/lib/utils";

interface StatusBadgeProps {
  status: TaskStatus;
  className?: string;
}

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const statusLabels: Record<TaskStatus, string> = {
    "not-started": "Not Started",
    "in-progress": "In Progress",
    "completed": "Completed",
    "delayed": "Delayed",
    "on-hold": "On Hold",
    "cancelled": "Cancelled"
  };

  const statusClasses: Record<TaskStatus, string> = {
    "not-started": "status-not-started",
    "in-progress": "status-in-progress",
    "completed": "status-completed",
    "delayed": "status-delayed",
    "on-hold": "status-on-hold",
    "cancelled": "status-cancelled"
  };

  return (
    <span className={cn("status-badge", statusClasses[status], className)}>
      {statusLabels[status]}
    </span>
  );
}
