
import { TeamInsights, MemberMetrics, ProjectMetrics, ProductivityTrend } from "@/types/teamMetrics";

export class TeamInsightsGenerator {
  // Generate team insights and recommendations
  static generateTeamInsights(
    memberMetrics: MemberMetrics[],
    projectMetrics: ProjectMetrics[],
    trends: ProductivityTrend[]
  ): TeamInsights {
    // Top performers (high productivity and utilization)
    const topPerformers = memberMetrics
      .filter(m => m.productivity > 70 && m.utilization > 60)
      .sort((a, b) => (b.productivity + b.utilization) - (a.productivity + a.utilization))
      .slice(0, 3);

    // Underutilized members (low utilization but not necessarily low productivity)
    const underutilizedMembers = memberMetrics
      .filter(m => m.utilization < 40 && m.hoursWorked > 0)
      .sort((a, b) => a.utilization - b.utilization)
      .slice(0, 3);

    // Bottleneck projects (high hours, low completion, or many bottlenecks)
    const bottleneckProjects = projectMetrics
      .filter(p => p.bottlenecks.length > 0 || (p.totalHours > 40 && p.completionRate < 50))
      .sort((a, b) => b.bottlenecks.length - a.bottlenecks.length)
      .slice(0, 5);

    // Generate recommendations
    const recommendations: string[] = [];
    
    if (underutilizedMembers.length > 0) {
      recommendations.push(`${underutilizedMembers.length} team members are underutilized. Consider redistributing workload.`);
    }
    
    if (bottleneckProjects.length > 0) {
      recommendations.push(`${bottleneckProjects.length} projects showing bottlenecks. Review resource allocation.`);
    }

    const recentTrend = trends.slice(-7);
    const avgRecentHours = recentTrend.reduce((sum, t) => sum + t.hours, 0) / 7;
    if (avgRecentHours < 6) {
      recommendations.push('Team productivity below target. Consider checking for blockers or workload issues.');
    }

    if (topPerformers.length > 0) {
      recommendations.push(`Recognize top performers: ${topPerformers.map(p => p.member.name).join(', ')}`);
    }

    return {
      topPerformers,
      underutilizedMembers,
      bottleneckProjects,
      productivityTrends: trends,
      recommendations
    };
  }
}
