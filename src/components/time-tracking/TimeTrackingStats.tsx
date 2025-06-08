
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { TimeTrackingStats } from "@/types/timeTracking";
import { Clock, Calendar, TrendingUp, Target } from "lucide-react";

interface TimeTrackingStatsProps {
  stats: TimeTrackingStats;
}

export function TimeTrackingStats({ stats }: TimeTrackingStatsProps) {
  const weeklyTarget = 40; // 40 hours per week target
  const dailyTarget = 8; // 8 hours per day target
  
  const weekProgress = Math.min((stats.weekHours / weeklyTarget) * 100, 100);
  const dailyProgress = Math.min((stats.todayHours / dailyTarget) * 100, 100);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Today</CardTitle>
          <Clock className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.todayHours}h</div>
          <Progress value={dailyProgress} className="mt-2" />
          <p className="text-xs text-muted-foreground mt-1">
            {dailyTarget - stats.todayHours > 0 
              ? `${(dailyTarget - stats.todayHours).toFixed(1)}h remaining` 
              : 'Target reached!'}
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">This Week</CardTitle>
          <Calendar className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.weekHours}h</div>
          <Progress value={weekProgress} className="mt-2" />
          <p className="text-xs text-muted-foreground mt-1">
            {weeklyTarget - stats.weekHours > 0 
              ? `${(weeklyTarget - stats.weekHours).toFixed(1)}h remaining` 
              : 'Target reached!'}
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">This Month</CardTitle>
          <TrendingUp className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.monthHours}h</div>
          <p className="text-xs text-muted-foreground">
            Monthly total
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Time</CardTitle>
          <Target className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.totalHours}h</div>
          <p className="text-xs text-muted-foreground">
            All time total
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
