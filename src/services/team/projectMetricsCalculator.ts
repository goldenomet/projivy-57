
import { ProjectMetrics, TeamMember } from "@/types/teamMetrics";
import { Project } from "@/types/project";
import { TimeEntry } from "@/types/timeTracking";

export class ProjectMetricsCalculator {
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
}
