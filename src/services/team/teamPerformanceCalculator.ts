
import { TeamPerformanceMetrics, MemberMetrics, ProjectMetrics } from "@/types/teamMetrics";

export class TeamPerformanceCalculator {
  // Calculate overall team performance metrics
  static calculateTeamPerformanceMetrics(
    memberMetrics: MemberMetrics[],
    projectMetrics: ProjectMetrics[]
  ): TeamPerformanceMetrics {
    const totalHours = memberMetrics.reduce((sum, m) => sum + m.hoursWorked, 0);
    const averageProductivity = memberMetrics.length > 0 
      ? memberMetrics.reduce((sum, m) => sum + m.productivity, 0) / memberMetrics.length 
      : 0;
    
    const completedTasks = memberMetrics.reduce((sum, m) => sum + m.tasksCompleted, 0);
    const ongoingTasks = projectMetrics.reduce((sum, p) => sum + (p.completionRate < 100 ? 1 : 0), 0);
    const overdueItems = projectMetrics.reduce((sum, p) => sum + p.bottlenecks.length, 0);
    
    const efficiency = memberMetrics.length > 0
      ? memberMetrics.reduce((sum, m) => sum + m.utilization, 0) / memberMetrics.length
      : 0;

    return {
      totalHours: Math.round(totalHours * 100) / 100,
      averageProductivity: Math.round(averageProductivity),
      completedTasks,
      ongoingTasks,
      overdueItems,
      efficiency: Math.round(efficiency)
    };
  }
}
