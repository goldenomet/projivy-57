
import { AppLayout } from "@/components/layout/AppLayout";
import { TeamPerformanceOverview } from "@/components/team/TeamPerformanceOverview";
import { MemberPerformanceList } from "@/components/team/MemberPerformanceList";
import { ProductivityChart } from "@/components/team/ProductivityChart";
import { TeamInsightsPanel } from "@/components/team/TeamInsightsPanel";
import { useTeamMetrics } from "@/hooks/use-team-metrics";
import { useDashboardData } from "@/hooks/use-dashboard-data";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ChevronLeft, BarChart3, RefreshCw, Calendar, Code, AlertTriangle } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";

export default function TeamMetricsPage() {
  const { projects } = useDashboardData();
  const [dateRange, setDateRange] = useState<{ start: Date; end: Date } | undefined>();
  
  const {
    memberMetrics,
    projectMetrics,
    teamPerformance,
    teamInsights,
    isLoading,
    refreshMetrics
  } = useTeamMetrics({ projects, dateRange });

  const handleDateRangeChange = (range: string) => {
    const now = new Date();
    let start: Date;
    
    switch (range) {
      case 'week':
        start = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
        break;
      case 'month':
        start = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
        break;
      case 'quarter':
        start = new Date(now.getTime() - 90 * 24 * 60 * 60 * 1000);
        break;
      default:
        setDateRange(undefined);
        return;
    }
    
    setDateRange({ start, end: now });
  };

  if (isLoading) {
    return (
      <AppLayout>
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="animate-pulse text-muted-foreground">Loading team metrics...</div>
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <div className="space-y-6">
        <div className="flex flex-col space-y-2">
          <Link to="/team">
            <Button variant="ghost" size="sm" className="-ml-2 hover:scale-105 transition-transform">
              <ChevronLeft className="h-4 w-4 mr-1" />
              Back to Team
            </Button>
          </Link>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <BarChart3 className="h-6 w-6" />
              <h1 className="text-2xl font-bold">Team Performance Metrics</h1>
              <Badge variant="secondary" className="ml-2 flex items-center gap-1">
                <Code className="h-3 w-3" />
                In Development
              </Badge>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                <span className="text-sm text-muted-foreground">Period:</span>
              </div>
              <Badge 
                variant="outline" 
                className="cursor-pointer hover:bg-muted"
                onClick={() => handleDateRangeChange('all')}
              >
                All Time
              </Badge>
              <Badge 
                variant="outline" 
                className="cursor-pointer hover:bg-muted"
                onClick={() => handleDateRangeChange('week')}
              >
                Last Week
              </Badge>
              <Badge 
                variant="outline" 
                className="cursor-pointer hover:bg-muted"
                onClick={() => handleDateRangeChange('month')}
              >
                Last Month
              </Badge>
              <Button
                variant="outline"
                size="sm"
                onClick={refreshMetrics}
                className="gap-2"
              >
                <RefreshCw className="h-4 w-4" />
                Refresh
              </Button>
            </div>
          </div>
        </div>

        {/* Development Notice */}
        <Card className="border-orange-200 bg-orange-50 dark:bg-orange-950/20 dark:border-orange-800">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <AlertTriangle className="h-5 w-5 text-orange-600" />
              <div>
                <h3 className="font-medium text-orange-800 dark:text-orange-200">Development Feature</h3>
                <p className="text-sm text-orange-700 dark:text-orange-300">
                  This team metrics feature is currently under active development. Some data may be simulated or incomplete.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Team Performance Overview */}
        <TeamPerformanceOverview metrics={teamPerformance} />

        {/* Productivity Charts */}
        <ProductivityChart trends={teamInsights.productivityTrends} />

        {/* Team Insights */}
        <TeamInsightsPanel insights={teamInsights} />

        {/* Member Performance Details */}
        <MemberPerformanceList memberMetrics={memberMetrics} />

        {/* Additional Stats */}
        <Card>
          <CardHeader>
            <CardTitle>Performance Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
              <div className="p-4 border rounded-lg">
                <p className="text-2xl font-bold text-green-600">
                  {memberMetrics.filter(m => m.productivity > 70).length}
                </p>
                <p className="text-sm text-muted-foreground">High Performers</p>
              </div>
              <div className="p-4 border rounded-lg">
                <p className="text-2xl font-bold text-yellow-600">
                  {projectMetrics.filter(p => p.bottlenecks.length > 0).length}
                </p>
                <p className="text-sm text-muted-foreground">Projects with Issues</p>
              </div>
              <div className="p-4 border rounded-lg">
                <p className="text-2xl font-bold text-blue-600">
                  {Math.round(memberMetrics.reduce((sum, m) => sum + m.utilization, 0) / memberMetrics.length || 0)}%
                </p>
                <p className="text-sm text-muted-foreground">Avg Team Utilization</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}
