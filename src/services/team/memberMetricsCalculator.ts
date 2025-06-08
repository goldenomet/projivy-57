
import { TeamMember, MemberMetrics } from "@/types/teamMetrics";
import { Project } from "@/types/project";
import { TimeEntry } from "@/types/timeTracking";

export class MemberMetricsCalculator {
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
}
