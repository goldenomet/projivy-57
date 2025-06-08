
import { supabase } from "@/integrations/supabase/client";
import { TimeEntry } from "@/types/timeTracking";
import { Project } from "@/types/project";
import { TeamMember, MemberMetrics, ProjectMetrics, TeamPerformanceMetrics, ProductivityTrend, TeamInsights } from "@/types/teamMetrics";

export class TeamMetricsService {
  // Get all team members
  static async getTeamMembers(): Promise<TeamMember[]> {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('id, full_name, avatar_url')
        .order('full_name');

      if (error) throw error;
      
      return (data || []).map(profile => ({
        id: profile.id,
        name: profile.full_name || 'Unknown User',
        email: '', // Would need to be added to profiles table if needed
        avatar_url: profile.avatar_url || undefined,
        role: 'Team Member' // Default role
      }));
    } catch (error) {
      console.error('Error fetching team members:', error);
      return [];
    }
  }

  // Get all time entries for team analysis
  static async getTeamTimeEntries(dateRange?: { start: Date; end: Date }): Promise<TimeEntry[]> {
    try {
      let query = supabase
        .from('time_entries')
        .select('*')
        .order('start_time', { ascending: false });

      if (dateRange) {
        query = query
          .gte('start_time', dateRange.start.toISOString())
          .lte('start_time', dateRange.end.toISOString());
      }

      const { data, error } = await query;
      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Error fetching team time entries:', error);
      return [];
    }
  }

  // Calculate metrics for individual team members
  static calculateMemberMetrics(
    member: TeamMember, 
    timeEntries: TimeEntry[], 
    projects: Project[]
  ): MemberMetrics {
    const memberEntries = timeEntries.filter(entry => entry.user_id === member.id);
    const completedEntries = memberEntries.filter(entry => entry.duration_minutes);

    const totalMinutes = completedEntries.reduce((sum, entry) => sum + (entry.duration_minutes || 0), 0);
    const hoursWorked = Math.round((totalMinutes / 60) * 100) / 100;

    // Calculate project distribution
    const projectMinutes: { [key: string]: number } = {};
    completedEntries.forEach(entry => {
      projectMinutes[entry.project_id] = (projectMinutes[entry.project_id] || 0) + (entry.duration_minutes || 0);
    });

    const projectDistribution = Object.entries(projectMinutes).map(([projectId, minutes]) => {
      const project = projects.find(p => p.id === projectId);
      const hours = Math.round((minutes / 60) * 100) / 100;
      const percentage = totalMinutes > 0 ? Math.round((minutes / totalMinutes) * 100) : 0;
      return {
        projectName: project?.name || 'Unknown Project',
        hours,
        percentage
      };
    }).sort((a, b) => b.hours - a.hours);

    // Calculate productivity metrics
    const uniqueDays = new Set(
      completedEntries.map(entry => new Date(entry.start_time).toDateString())
    ).size;

    const averageHoursPerDay = uniqueDays > 0 ? hoursWorked / uniqueDays : 0;
    const productivity = Math.min(averageHoursPerDay / 8 * 100, 100); // Based on 8-hour workday
    const utilization = Math.min(hoursWorked / (uniqueDays * 8) * 100, 100);

    return {
      member,
      hoursWorked,
      tasksCompleted: completedEntries.length,
      averageTaskTime: completedEntries.length > 0 ? totalMinutes / completedEntries.length : 0,
      productivity: Math.round(productivity),
      utilization: Math.round(utilization),
      projectDistribution
    };
  }

  // Calculate project-level metrics
  static calculateProjectMetrics(
    project: Project,
    timeEntries: TimeEntry[],
    teamMembers: TeamMember[]
  ): ProjectMetrics {
    const projectEntries = timeEntries.filter(entry => entry.project_id === project.id);
    const completedEntries = projectEntries.filter(entry => entry.duration_minutes);

    const totalMinutes = completedEntries.reduce((sum, entry) => sum + (entry.duration_minutes || 0), 0);
    const totalHours = Math.round((totalMinutes / 60) * 100) / 100;

    const uniqueMembers = new Set(projectEntries.map(entry => entry.user_id));
    const membersCount = uniqueMembers.size;

    // Calculate completion rate based on project progress
    const completionRate = project.progress || 0;

    // Calculate average velocity (tasks per day)
    const uniqueDays = new Set(
      completedEntries.map(entry => new Date(entry.start_time).toDateString())
    ).size;
    const averageVelocity = uniqueDays > 0 ? completedEntries.length / uniqueDays : 0;

    // Identify potential bottlenecks
    const bottlenecks: string[] = [];
    if (averageVelocity < 1) bottlenecks.push('Low task completion velocity');
    if (membersCount < 2 && totalHours > 40) bottlenecks.push('Single point of failure');
    if (completionRate < 50 && totalHours > 80) bottlenecks.push('High effort, low completion');

    return {
      projectId: project.id,
      projectName: project.name,
      totalHours,
      membersCount,
      completionRate,
      averageVelocity: Math.round(averageVelocity * 100) / 100,
      bottlenecks
    };
  }

  // Generate productivity trends
  static calculateProductivityTrends(timeEntries: TimeEntry[], days: number = 30): ProductivityTrend[] {
    const endDate = new Date();
    const startDate = new Date(endDate.getTime() - (days * 24 * 60 * 60 * 1000));

    const trends: ProductivityTrend[] = [];
    
    for (let i = 0; i < days; i++) {
      const date = new Date(startDate.getTime() + (i * 24 * 60 * 60 * 1000));
      const dateString = date.toISOString().split('T')[0];
      
      const dayEntries = timeEntries.filter(entry => {
        const entryDate = new Date(entry.start_time).toISOString().split('T')[0];
        return entryDate === dateString && entry.duration_minutes;
      });

      const totalMinutes = dayEntries.reduce((sum, entry) => sum + (entry.duration_minutes || 0), 0);
      const hours = Math.round((totalMinutes / 60) * 100) / 100;
      const tasksCompleted = dayEntries.length;
      const efficiency = tasksCompleted > 0 ? Math.round((hours / tasksCompleted) * 100) / 100 : 0;

      trends.push({
        date: dateString,
        hours,
        tasksCompleted,
        efficiency
      });
    }

    return trends;
  }

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
