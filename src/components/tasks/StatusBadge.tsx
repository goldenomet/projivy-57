
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
    "not-started": "status-not-started border border-gray-200 bg-gradient-to-r from-gray-100 to-gray-50",
    "in-progress": "status-in-progress border border-blue-200 bg-gradient-to-r from-blue-100 to-blue-50",
    "completed": "status-completed border border-green-200 bg-gradient-to-r from-green-100 to-green-50",
    "delayed": "status-delayed border border-yellow-200 bg-gradient-to-r from-yellow-100 to-yellow-50",
    "on-hold": "status-on-hold border border-purple-200 bg-gradient-to-r from-purple-100 to-purple-50",
    "cancelled": "status-cancelled border border-red-200 bg-gradient-to-r from-red-100 to-red-50"
  };

  const statusIcons: Record<TaskStatus, string> = {
    "not-started": "⭘",
    "in-progress": "▶",
    "completed": "✓",
    "delayed": "⚠",
    "on-hold": "⏸",
    "cancelled": "✕"
  };

  return (
    <span className={cn("status-badge shadow-sm", statusClasses[status], className)}>
      <span className="mr-1">{statusIcons[status]}</span> {statusLabels[status]}
    </span>
  );
}
