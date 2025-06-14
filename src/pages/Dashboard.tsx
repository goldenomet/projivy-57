
import { AppLayout } from "@/components/layout/AppLayout";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { ProjectsSection } from "@/components/dashboard/ProjectsSection";
import { TasksSection } from "@/components/dashboard/TasksSection";
import { useDashboardData } from "@/hooks/use-dashboard-data";
import { AnalyticsSection } from "@/components/dashboard/AnalyticsSection";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle, TrendingUp, CheckCircle, Clock } from "lucide-react";

export default function Dashboard() {
  const { projects, recentTasks, userProfile, isLoading, error } = useDashboardData();

  // Calculate quick stats
  const totalProjects = projects?.length || 0;
  const completedTasks = recentTasks?.filter(task => task.status === 'completed').length || 0;
  const inProgressTasks = recentTasks?.filter(task => task.status === 'in-progress').length || 0;
  const notStartedTasks = recentTasks?.filter(task => task.status === 'not-started').length || 0;

  if (error) {
    return (
      <AppLayout>
        <div className="flex items-center justify-center h-96">
          <Card className="w-full max-w-md">
            <CardContent className="flex flex-col items-center justify-center p-6">
              <AlertCircle className="h-12 w-12 text-destructive mb-4" />
              <h3 className="text-lg font-semibold mb-2">Error Loading Dashboard</h3>
              <p className="text-sm text-muted-foreground text-center">
                {error}. Please try refreshing the page.
              </p>
            </CardContent>
          </Card>
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <div className="space-y-8">
        <DashboardHeader userProfile={userProfile} />
        
        {/* Quick Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Projects</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalProjects}</div>
              <p className="text-xs text-muted-foreground">
                Active projects in your workspace
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Completed Tasks</CardTitle>
              <CheckCircle className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{completedTasks}</div>
              <p className="text-xs text-muted-foreground">
                Tasks completed recently
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">In Progress</CardTitle>
              <Clock className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{inProgressTasks}</div>
              <p className="text-xs text-muted-foreground">
                Tasks currently being worked on
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Not Started</CardTitle>
              <AlertCircle className="h-4 w-4 text-orange-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{notStartedTasks}</div>
              <p className="text-xs text-muted-foreground">
                Tasks waiting to be started
              </p>
            </CardContent>
          </Card>
        </div>
        
        {/* Premium Analytics - Now Unlocked */}
        <AnalyticsSection projects={projects} tasks={recentTasks} isPreview={false} />
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <ProjectsSection projects={projects} isLoading={isLoading} />
          <TasksSection tasks={recentTasks} isLoading={isLoading} />
        </div>
      </div>
    </AppLayout>
  );
}
