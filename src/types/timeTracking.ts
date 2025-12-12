
export interface TimeEntry {
  id: string;
  user_id: string;
  project_id: string;
  task_id?: string;
  description?: string | null;
  start_time: string;
  end_time?: string | null;
  duration_minutes?: number;
  is_running: boolean;
  created_at: string;
  updated_at?: string;
}

export interface TimeTrackingStats {
  totalHours: number;
  todayHours: number;
  weekHours: number;
  monthHours: number;
  projectBreakdown: { projectId: string; projectName: string; hours: number }[];
}
