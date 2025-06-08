
import { TeamMember, MemberMetrics, ProjectMetrics, TeamPerformanceMetrics, ProductivityTrend, TeamInsights } from "@/types/teamMetrics";
import { Project } from "@/types/project";
import { TimeEntry } from "@/types/timeTracking";
import { TeamMembersService } from "./team/teamMembersService";
import { TimeEntriesService } from "./team/timeEntriesService";
import { MemberMetricsCalculator } from "./team/memberMetricsCalculator";
import { ProjectMetricsCalculator } from "./team/projectMetricsCalculator";
import { ProductivityTrendsCalculator } from "./team/productivityTrendsCalculator";
import { TeamInsightsGenerator } from "./team/teamInsightsGenerator";
import { TeamPerformanceCalculator } from "./team/teamPerformanceCalculator";

export class TeamMetricsService {
  // Get all team members
  static async getTeamMembers(): Promise<TeamMember[]> {
    return TeamMembersService.getTeamMembers();
  }

  // Get all time entries for team analysis
  static async getTeamTimeEntries(dateRange?: { start: Date; end: Date }): Promise<TimeEntry[]> {
    return TimeEntriesService.getTeamTimeEntries(dateRange);
  }

  // Calculate metrics for individual team members
  static calculateMemberMetrics(
    member: TeamMember, 
    timeEntries: TimeEntry[], 
    projects: Project[]
  ): MemberMetrics {
    return MemberMetricsCalculator.calculateMemberMetrics(member, timeEntries, projects);
  }

  // Calculate project-level metrics
  static calculateProjectMetrics(
    project: Project,
    timeEntries: TimeEntry[],
    teamMembers: TeamMember[]
  ): ProjectMetrics {
    return ProjectMetricsCalculator.calculateProjectMetrics(project, timeEntries, teamMembers);
  }

  // Generate productivity trends
  static calculateProductivityTrends(timeEntries: TimeEntry[], days: number = 30): ProductivityTrend[] {
    return ProductivityTrendsCalculator.calculateProductivityTrends(timeEntries, days);
  }

  // Generate team insights and recommendations
  static generateTeamInsights(
    memberMetrics: MemberMetrics[],
    projectMetrics: ProjectMetrics[],
    trends: ProductivityTrend[]
  ): TeamInsights {
    return TeamInsightsGenerator.generateTeamInsights(memberMetrics, projectMetrics, trends);
  }

  // Calculate overall team performance metrics
  static calculateTeamPerformanceMetrics(
    memberMetrics: MemberMetrics[],
    projectMetrics: ProjectMetrics[]
  ): TeamPerformanceMetrics {
    return TeamPerformanceCalculator.calculateTeamPerformanceMetrics(memberMetrics, projectMetrics);
  }
}
