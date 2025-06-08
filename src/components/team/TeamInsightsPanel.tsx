
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { TeamInsights } from "@/types/teamMetrics";
import { Lightbulb, Award, AlertTriangle, TrendingDown, CheckCircle } from "lucide-react";

interface TeamInsightsPanelProps {
  insights: TeamInsights;
}

export function TeamInsightsPanel({ insights }: TeamInsightsPanelProps) {
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map(part => part[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Award className="h-4 w-4 mr-2" />
            Top Performers
          </CardTitle>
        </CardHeader>
        <CardContent>
          {insights.topPerformers.length > 0 ? (
            <div className="space-y-3">
              {insights.topPerformers.map((member, index) => (
                <div key={member.member.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center space-x-3">
                    <Badge variant="secondary">#{index + 1}</Badge>
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={member.member.avatar_url} alt={member.member.name} />
                      <AvatarFallback className="text-xs">
                        {getInitials(member.member.name)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium text-sm">{member.member.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {member.hoursWorked}h • {member.tasksCompleted} tasks
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium">{member.productivity}%</p>
                    <p className="text-xs text-muted-foreground">productivity</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-muted-foreground text-sm">No top performers identified yet.</p>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <TrendingDown className="h-4 w-4 mr-2" />
            Underutilized Members
          </CardTitle>
        </CardHeader>
        <CardContent>
          {insights.underutilizedMembers.length > 0 ? (
            <div className="space-y-3">
              {insights.underutilizedMembers.map((member) => (
                <div key={member.member.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center space-x-3">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={member.member.avatar_url} alt={member.member.name} />
                      <AvatarFallback className="text-xs">
                        {getInitials(member.member.name)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium text-sm">{member.member.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {member.hoursWorked}h • {member.utilization}% utilization
                      </p>
                    </div>
                  </div>
                  <Badge variant="outline" className="text-xs">
                    Available
                  </Badge>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-muted-foreground text-sm">All team members are well utilized.</p>
          )}
        </CardContent>
      </Card>

      <Card className="lg:col-span-2">
        <CardHeader>
          <CardTitle className="flex items-center">
            <AlertTriangle className="h-4 w-4 mr-2" />
            Project Bottlenecks
          </CardTitle>
        </CardHeader>
        <CardContent>
          {insights.bottleneckProjects.length > 0 ? (
            <div className="space-y-3">
              {insights.bottleneckProjects.map((project) => (
                <div key={project.projectId} className="p-3 border rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium">{project.projectName}</h4>
                    <Badge variant="destructive" className="text-xs">
                      {project.bottlenecks.length} issues
                    </Badge>
                  </div>
                  <div className="text-sm text-muted-foreground mb-2">
                    {project.totalHours}h • {project.membersCount} members • {project.completionRate}% complete
                  </div>
                  <div className="space-y-1">
                    {project.bottlenecks.map((bottleneck, index) => (
                      <div key={index} className="flex items-center text-xs">
                        <AlertTriangle className="h-3 w-3 mr-1 text-yellow-500" />
                        {bottleneck}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex items-center justify-center py-8 text-center">
              <div>
                <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-2" />
                <p className="text-muted-foreground">No bottlenecks detected!</p>
                <p className="text-xs text-muted-foreground">All projects are running smoothly.</p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <Card className="lg:col-span-2">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Lightbulb className="h-4 w-4 mr-2" />
            Recommendations
          </CardTitle>
        </CardHeader>
        <CardContent>
          {insights.recommendations.length > 0 ? (
            <div className="space-y-2">
              {insights.recommendations.map((recommendation, index) => (
                <div key={index} className="flex items-start p-3 bg-muted rounded-lg">
                  <Lightbulb className="h-4 w-4 mr-2 mt-0.5 text-yellow-500 flex-shrink-0" />
                  <p className="text-sm">{recommendation}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-muted-foreground text-sm">No specific recommendations at this time.</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
