
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { TeamPerformanceMetrics } from "@/types/teamMetrics";
import { Users, Clock, CheckCircle, AlertTriangle, TrendingUp, Target } from "lucide-react";

interface TeamPerformanceOverviewProps {
  metrics: TeamPerformanceMetrics;
}

export function TeamPerformanceOverview({ metrics }: TeamPerformanceOverviewProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Hours</CardTitle>
          <Clock className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{metrics.totalHours}h</div>
          <p className="text-xs text-muted-foreground">
            Team effort this period
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Avg Productivity</CardTitle>
          <TrendingUp className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{metrics.averageProductivity}%</div>
          <Progress value={metrics.averageProductivity} className="mt-2" />
          <p className="text-xs text-muted-foreground mt-1">
            Team productivity score
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Tasks Completed</CardTitle>
          <CheckCircle className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{metrics.completedTasks}</div>
          <p className="text-xs text-muted-foreground">
            Total tasks finished
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Active Projects</CardTitle>
          <Users className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{metrics.ongoingTasks}</div>
          <p className="text-xs text-muted-foreground">
            Projects in progress
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Issues</CardTitle>
          <AlertTriangle className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{metrics.overdueItems}</div>
          <p className="text-xs text-muted-foreground">
            Bottlenecks identified
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Team Efficiency</CardTitle>
          <Target className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{metrics.efficiency}%</div>
          <Progress value={metrics.efficiency} className="mt-2" />
          <p className="text-xs text-muted-foreground mt-1">
            Resource utilization
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
