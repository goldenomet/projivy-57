
import { AppLayout } from "@/components/layout/AppLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { TrendingUp, Clock, Target, Zap, Calendar, BarChart3 } from "lucide-react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

interface ProductivityMetrics {
  tasksCompleted: number;
  hoursWorked: number;
  focusScore: number;
  efficiency: number;
  goalProgress: number;
}

export default function ProductivityPage() {
  const [metrics, setMetrics] = useState<ProductivityMetrics>({
    tasksCompleted: 0,
    hoursWorked: 0,
    focusScore: 0,
    efficiency: 0,
    goalProgress: 0
  });

  useEffect(() => {
    // Simulate loading productivity metrics
    setTimeout(() => {
      setMetrics({
        tasksCompleted: 18,
        hoursWorked: 32.5,
        focusScore: 85,
        efficiency: 92,
        goalProgress: 68
      });
    }, 500);
  }, []);

  const productivityTips = [
    "Take regular breaks to maintain focus",
    "Set specific time blocks for deep work",
    "Use the Pomodoro technique for better time management",
    "Review and adjust your goals weekly"
  ];

  return (
    <AppLayout>
      <div className="space-y-6">
        <div className="flex items-center gap-2">
          <TrendingUp className="h-6 w-6" />
          <h1 className="text-2xl font-bold">Productivity Tracking</h1>
        </div>

        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Tasks Completed</CardTitle>
              <Target className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{metrics.tasksCompleted}</div>
              <p className="text-xs text-muted-foreground">This week</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Hours Worked</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{metrics.hoursWorked}h</div>
              <p className="text-xs text-muted-foreground">This week</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Focus Score</CardTitle>
              <Zap className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{metrics.focusScore}%</div>
              <p className="text-xs text-muted-foreground">Above average</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Efficiency</CardTitle>
              <BarChart3 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{metrics.efficiency}%</div>
              <p className="text-xs text-muted-foreground">Excellent</p>
            </CardContent>
          </Card>
        </div>

        {/* Goal Progress */}
        <Card>
          <CardHeader>
            <CardTitle>Weekly Goals Progress</CardTitle>
            <CardDescription>Track your progress towards weekly objectives</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Complete 20 tasks</span>
                <span>{metrics.tasksCompleted}/20</span>
              </div>
              <Progress value={(metrics.tasksCompleted / 20) * 100} />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Work 40 hours</span>
                <span>{metrics.hoursWorked}/40</span>
              </div>
              <Progress value={(metrics.hoursWorked / 40) * 100} />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Maintain 80%+ focus score</span>
                <span>{metrics.focusScore}%</span>
              </div>
              <Progress value={metrics.focusScore} />
            </div>
          </CardContent>
        </Card>

        {/* Productivity Tips */}
        <Card>
          <CardHeader>
            <CardTitle>Productivity Tips</CardTitle>
            <CardDescription>Suggestions to boost your productivity</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {productivityTips.map((tip, index) => (
                <div key={index} className="flex items-start gap-3 p-3 rounded-lg bg-muted/50">
                  <Badge variant="outline" className="mt-1">{index + 1}</Badge>
                  <p className="text-sm">{tip}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="flex gap-4">
          <Link to="/time-tracking">
            <Button className="gap-2">
              <Clock className="h-4 w-4" />
              Time Tracking
            </Button>
          </Link>
          <Link to="/team/metrics">
            <Button variant="outline" className="gap-2">
              <BarChart3 className="h-4 w-4" />
              Team Metrics
            </Button>
          </Link>
          <Link to="/calendar">
            <Button variant="outline" className="gap-2">
              <Calendar className="h-4 w-4" />
              Calendar
            </Button>
          </Link>
        </div>
      </div>
    </AppLayout>
  );
}
