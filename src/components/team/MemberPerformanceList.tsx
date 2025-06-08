
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { MemberMetrics } from "@/types/teamMetrics";
import { Clock, CheckCircle, TrendingUp, User } from "lucide-react";

interface MemberPerformanceListProps {
  memberMetrics: MemberMetrics[];
}

export function MemberPerformanceList({ memberMetrics }: MemberPerformanceListProps) {
  const getProductivityColor = (productivity: number) => {
    if (productivity >= 80) return "bg-green-500";
    if (productivity >= 60) return "bg-yellow-500";
    return "bg-red-500";
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map(part => part[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <User className="h-4 w-4 mr-2" />
          Team Member Performance
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {memberMetrics.map((member) => (
            <div key={member.member.id} className="border rounded-lg p-4">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <Avatar>
                    <AvatarImage 
                      src={member.member.avatar_url} 
                      alt={member.member.name}
                    />
                    <AvatarFallback>
                      {getInitials(member.member.name)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h4 className="font-medium">{member.member.name}</h4>
                    <p className="text-sm text-muted-foreground">{member.member.role}</p>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Badge variant="outline" className="flex items-center">
                    <Clock className="h-3 w-3 mr-1" />
                    {member.hoursWorked}h
                  </Badge>
                  <Badge variant="outline" className="flex items-center">
                    <CheckCircle className="h-3 w-3 mr-1" />
                    {member.tasksCompleted}
                  </Badge>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Productivity</span>
                    <span>{member.productivity}%</span>
                  </div>
                  <Progress value={member.productivity} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Utilization</span>
                    <span>{member.utilization}%</span>
                  </div>
                  <Progress value={member.utilization} className="h-2" />
                </div>
              </div>

              {member.projectDistribution.length > 0 && (
                <div>
                  <h5 className="text-sm font-medium mb-2">Project Distribution</h5>
                  <div className="space-y-2">
                    {member.projectDistribution.slice(0, 3).map((project, index) => (
                      <div key={index} className="flex items-center justify-between text-sm">
                        <span className="truncate">{project.projectName}</span>
                        <div className="flex items-center space-x-2">
                          <span>{project.hours}h</span>
                          <Badge variant="secondary" className="text-xs">
                            {project.percentage}%
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
