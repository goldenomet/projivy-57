
import { AppLayout } from "@/components/layout/AppLayout";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { ProjectsSection } from "@/components/dashboard/ProjectsSection";
import { TasksSection } from "@/components/dashboard/TasksSection";
import { useDashboardData } from "@/hooks/use-dashboard-data";
import { AnalyticsSection } from "@/components/dashboard/AnalyticsSection";

export default function Dashboard() {
  const { projects, recentTasks, userProfile, isLoading } = useDashboardData();

  return (
    <AppLayout>
      <div className="space-y-8">
        <DashboardHeader userProfile={userProfile} />
        
        {/* Premium Analytics - Now Unlocked */}
        <AnalyticsSection projects={projects} tasks={recentTasks} isPreview={false} />
        
        <ProjectsSection projects={projects} isLoading={isLoading} />
        <TasksSection tasks={recentTasks} isLoading={isLoading} />
      </div>
    </AppLayout>
  );
}
