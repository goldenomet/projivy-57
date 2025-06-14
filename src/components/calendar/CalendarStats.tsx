
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Task } from "@/types/project";

interface CalendarStatsProps {
  monthTasks: Task[];
}

export function CalendarStats({ monthTasks }: CalendarStatsProps) {
  return (
    <Card className="card-gradient">
      <CardHeader className="pb-3">
        <CardTitle className="text-sm font-medium">Quick Stats</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex justify-between items-center">
          <span className="text-sm text-muted-foreground">Total Tasks</span>
          <Badge variant="outline">{monthTasks.length}</Badge>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm text-muted-foreground">Completed</span>
          <Badge className="bg-green-100 text-green-800">
            {monthTasks.filter(t => t.status === 'completed').length}
          </Badge>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm text-muted-foreground">In Progress</span>
          <Badge className="bg-blue-100 text-blue-800">
            {monthTasks.filter(t => t.status === 'in-progress').length}
          </Badge>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm text-muted-foreground">Delayed</span>
          <Badge className="bg-red-100 text-red-800">
            {monthTasks.filter(t => t.status === 'delayed').length}
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
}
