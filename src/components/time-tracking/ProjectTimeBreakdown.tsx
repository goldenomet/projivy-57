
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { TimeTrackingStats } from "@/types/timeTracking";
import { Briefcase } from "lucide-react";

interface ProjectTimeBreakdownProps {
  stats: TimeTrackingStats;
}

export function ProjectTimeBreakdown({ stats }: ProjectTimeBreakdownProps) {
  const maxHours = Math.max(...stats.projectBreakdown.map(p => p.hours), 1);

  if (stats.projectBreakdown.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Briefcase className="h-4 w-4 mr-2" />
            Project Time Breakdown
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8 text-muted-foreground">
            No project time data available yet.
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Briefcase className="h-4 w-4 mr-2" />
          Project Time Breakdown
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {stats.projectBreakdown.map((project) => (
            <div key={project.projectId}>
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm font-medium">{project.projectName}</span>
                <span className="text-sm text-muted-foreground">{project.hours}h</span>
              </div>
              <Progress 
                value={(project.hours / maxHours) * 100} 
                className="h-2"
              />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
