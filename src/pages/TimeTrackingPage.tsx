
import { AppLayout } from "@/components/layout/AppLayout";
import { TimerWidget } from "@/components/time-tracking/TimerWidget";
import { TimeTrackingStats } from "@/components/time-tracking/TimeTrackingStats";
import { TimeEntriesList } from "@/components/time-tracking/TimeEntriesList";
import { ProjectTimeBreakdown } from "@/components/time-tracking/ProjectTimeBreakdown";
import { useTimeTracking } from "@/hooks/use-time-tracking";
import { useDashboardData } from "@/hooks/use-dashboard-data";
import { Clock } from "lucide-react";

export default function TimeTrackingPage() {
  const { projects } = useDashboardData();
  const {
    runningTimer,
    timeEntries,
    stats,
    isLoading,
    startTimer,
    stopTimer,
    deleteTimeEntry
  } = useTimeTracking(projects);

  if (isLoading) {
    return (
      <AppLayout>
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="animate-pulse text-muted-foreground">Loading time tracking data...</div>
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <div className="space-y-6">
        <div className="flex items-center gap-2">
          <Clock className="h-6 w-6" />
          <h1 className="text-2xl font-bold">Time Tracking</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1">
            <TimerWidget
              runningTimer={runningTimer}
              projects={projects}
              onStartTimer={startTimer}
              onStopTimer={stopTimer}
            />
          </div>
          
          <div className="lg:col-span-2">
            <ProjectTimeBreakdown stats={stats} />
          </div>
        </div>

        <TimeTrackingStats stats={stats} />

        <TimeEntriesList
          timeEntries={timeEntries}
          projects={projects}
          onDeleteEntry={deleteTimeEntry}
        />
      </div>
    </AppLayout>
  );
}
