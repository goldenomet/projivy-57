
import { useState, useEffect } from "react";
import { TimeEntry, TimeTrackingStats } from "@/types/timeTracking";
import { TimeTrackingService } from "@/services/timeTrackingService";
import { Project } from "@/types/project";
import { toast } from "sonner";

export function useTimeTracking(projects: Project[] = []) {
  const [runningTimer, setRunningTimer] = useState<TimeEntry | null>(null);
  const [timeEntries, setTimeEntries] = useState<TimeEntry[]>([]);
  const [stats, setStats] = useState<TimeTrackingStats>({
    totalHours: 0,
    todayHours: 0,
    weekHours: 0,
    monthHours: 0,
    projectBreakdown: []
  });
  const [isLoading, setIsLoading] = useState(true);

  // Load initial data
  useEffect(() => {
    loadTimeTrackingData();
  }, []);

  // Update stats when timeEntries or projects change
  useEffect(() => {
    if (timeEntries.length > 0 || projects.length > 0) {
      const newStats = TimeTrackingService.calculateStats(timeEntries, projects);
      setStats(newStats);
    }
  }, [timeEntries, projects]);

  const loadTimeTrackingData = async () => {
    setIsLoading(true);
    try {
      const [runningTimerData, allTimeEntries] = await Promise.all([
        TimeTrackingService.getRunningTimer(),
        TimeTrackingService.getAllTimeEntries()
      ]);

      setRunningTimer(runningTimerData);
      setTimeEntries(allTimeEntries);
    } catch (error) {
      console.error('Error loading time tracking data:', error);
      toast.error('Failed to load time tracking data');
    } finally {
      setIsLoading(false);
    }
  };

  const startTimer = async (projectId: string, taskId?: string, description?: string) => {
    try {
      const newTimer = await TimeTrackingService.startTimer(projectId, taskId, description);
      if (newTimer) {
        setRunningTimer(newTimer);
        setTimeEntries(prev => [newTimer, ...prev]);
        toast.success('Timer started');
      }
    } catch (error) {
      console.error('Error starting timer:', error);
      toast.error('Failed to start timer');
    }
  };

  const stopTimer = async () => {
    if (!runningTimer) return;

    try {
      const stoppedTimer = await TimeTrackingService.stopTimer(runningTimer.id);
      if (stoppedTimer) {
        setRunningTimer(null);
        setTimeEntries(prev => prev.map(entry => 
          entry.id === stoppedTimer.id ? stoppedTimer : entry
        ));
        toast.success(`Timer stopped. Duration: ${Math.round((stoppedTimer.duration_minutes || 0) / 60 * 100) / 100} hours`);
      }
    } catch (error) {
      console.error('Error stopping timer:', error);
      toast.error('Failed to stop timer');
    }
  };

  const deleteTimeEntry = async (timeEntryId: string) => {
    try {
      const success = await TimeTrackingService.deleteTimeEntry(timeEntryId);
      if (success) {
        setTimeEntries(prev => prev.filter(entry => entry.id !== timeEntryId));
        toast.success('Time entry deleted');
      }
    } catch (error) {
      console.error('Error deleting time entry:', error);
      toast.error('Failed to delete time entry');
    }
  };

  return {
    runningTimer,
    timeEntries,
    stats,
    isLoading,
    startTimer,
    stopTimer,
    deleteTimeEntry,
    refreshData: loadTimeTrackingData
  };
}
