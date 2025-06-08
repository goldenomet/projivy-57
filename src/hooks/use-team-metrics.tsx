
import { useState, useEffect } from "react";
import { TeamMetricsService } from "@/services/teamMetricsService";
import { TeamMember, MemberMetrics, ProjectMetrics, TeamPerformanceMetrics, TeamInsights } from "@/types/teamMetrics";
import { Project } from "@/types/project";
import { TimeEntry } from "@/types/timeTracking";
import { toast } from "sonner";

interface UseTeamMetricsProps {
  projects: Project[];
  dateRange?: { start: Date; end: Date };
}

export function useTeamMetrics({ projects, dateRange }: UseTeamMetricsProps) {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [timeEntries, setTimeEntries] = useState<TimeEntry[]>([]);
  const [memberMetrics, setMemberMetrics] = useState<MemberMetrics[]>([]);
  const [projectMetrics, setProjectMetrics] = useState<ProjectMetrics[]>([]);
  const [teamPerformance, setTeamPerformance] = useState<TeamPerformanceMetrics>({
    totalHours: 0,
    averageProductivity: 0,
    completedTasks: 0,
    ongoingTasks: 0,
    overdueItems: 0,
    efficiency: 0
  });
  const [teamInsights, setTeamInsights] = useState<TeamInsights>({
    topPerformers: [],
    underutilizedMembers: [],
    bottleneckProjects: [],
    productivityTrends: [],
    recommendations: []
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadTeamMetrics();
  }, [projects, dateRange]);

  const loadTeamMetrics = async () => {
    setIsLoading(true);
    try {
      // Load team data
      const [members, entries] = await Promise.all([
        TeamMetricsService.getTeamMembers(),
        TeamMetricsService.getTeamTimeEntries(dateRange)
      ]);

      setTeamMembers(members);
      setTimeEntries(entries);

      // Calculate member metrics
      const memberMetricsData = members.map(member =>
        TeamMetricsService.calculateMemberMetrics(member, entries, projects)
      );
      setMemberMetrics(memberMetricsData);

      // Calculate project metrics
      const projectMetricsData = projects.map(project =>
        TeamMetricsService.calculateProjectMetrics(project, entries, members)
      );
      setProjectMetrics(projectMetricsData);

      // Calculate team performance
      const teamPerformanceData = TeamMetricsService.calculateTeamPerformanceMetrics(
        memberMetricsData,
        projectMetricsData
      );
      setTeamPerformance(teamPerformanceData);

      // Generate insights
      const trends = TeamMetricsService.calculateProductivityTrends(entries);
      const insights = TeamMetricsService.generateTeamInsights(
        memberMetricsData,
        projectMetricsData,
        trends
      );
      setTeamInsights(insights);

    } catch (error) {
      console.error('Error loading team metrics:', error);
      toast.error('Failed to load team metrics');
    } finally {
      setIsLoading(false);
    }
  };

  return {
    teamMembers,
    memberMetrics,
    projectMetrics,
    teamPerformance,
    teamInsights,
    isLoading,
    refreshMetrics: loadTeamMetrics
  };
}
