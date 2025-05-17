
import { AppLayout } from "@/components/layout/AppLayout";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { ProjectsSection } from "@/components/dashboard/ProjectsSection";
import { TasksSection } from "@/components/dashboard/TasksSection";
import { useDashboardData } from "@/hooks/use-dashboard-data";
import { AnalyticsSection } from "@/components/dashboard/AnalyticsSection";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Lock } from "lucide-react";
import { useState } from "react";

export default function Dashboard() {
  const { projects, recentTasks, userProfile, isLoading } = useDashboardData();
  const [showPremiumPreview, setShowPremiumPreview] = useState(false);

  return (
    <AppLayout>
      <div className="space-y-8">
        <DashboardHeader userProfile={userProfile} />
        
        {/* Premium Analytics Preview */}
        <Card className="border border-dashed border-amber-400 bg-gradient-to-br from-amber-50/30 to-amber-100/20 dark:from-amber-950/20 dark:to-amber-900/10 overflow-hidden">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center text-amber-600 dark:text-amber-400">
                  <span className="mr-2">✨</span> Premium Analytics
                  <Lock className="h-4 w-4 ml-2" />
                </CardTitle>
                <CardDescription>
                  Gain valuable insights with advanced analytics and visualizations
                </CardDescription>
              </div>
              <Button
                onClick={() => setShowPremiumPreview(!showPremiumPreview)}
                variant="outline"
                className="border-amber-400 text-amber-600 hover:bg-amber-50 dark:hover:bg-amber-900/20"
              >
                {showPremiumPreview ? "Hide Preview" : "Show Preview"}
              </Button>
            </div>
          </CardHeader>
          <CardContent className={`pt-0 transition-all duration-300 ${showPremiumPreview ? 'max-h-[800px]' : 'max-h-0 overflow-hidden'}`}>
            {showPremiumPreview && (
              <>
                <div className="opacity-75 my-6">
                  <AnalyticsSection projects={projects} tasks={recentTasks} isPreview={true} />
                </div>
                <div className="flex justify-center mt-4">
                  <Button className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700">
                    Upgrade to Premium
                  </Button>
                </div>
              </>
            )}
          </CardContent>
        </Card>
        
        <ProjectsSection projects={projects} isLoading={isLoading} />
        <TasksSection tasks={recentTasks} isLoading={isLoading} />
      </div>
    </AppLayout>
  );
}
