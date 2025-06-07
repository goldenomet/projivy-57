
import { Project, Task } from '@/types/project';
import { DateFormatter } from '../utils/dateFormatter';

export class CSVExporter {
  static export(projects: Project[], type: 'projects' | 'tasks'): string {
    if (type === 'projects') {
      return this.exportProjects(projects);
    } else {
      return this.exportTasks(projects);
    }
  }

  private static exportProjects(projects: Project[]): string {
    const headers = ['ID', 'Name', 'Description', 'Start Date', 'End Date', 'Status', 'Progress'];
    const rows = projects.map(project => [
      project.id,
      project.name,
      project.description,
      DateFormatter.formatDate(project.startDate),
      DateFormatter.formatDate(project.endDate),
      project.status,
      project.progress.toString()
    ]);

    return this.formatCSV([headers, ...rows]);
  }

  private static exportTasks(projects: Project[]): string {
    const allTasks: (Task & { projectId: string })[] = [];
    projects.forEach(project => {
      if (project.tasks) {
        allTasks.push(...project.tasks.map(task => ({ ...task, projectId: project.id })));
      }
    });

    const headers = ['ID', 'Project ID', 'Name', 'Description', 'Assigned To', 'Responsible Party', 'Start Date', 'Due Date', 'Status', 'Duration', 'Remarks'];
    const rows = allTasks.map(task => [
      task.id,
      task.projectId,
      task.name,
      task.description,
      task.assignedTo.join('; '),
      task.responsibleParty,
      DateFormatter.formatDate(task.startDate),
      DateFormatter.formatDate(task.dueDate),
      task.status,
      task.duration.toString(),
      task.remarks
    ]);

    return this.formatCSV([headers, ...rows]);
  }

  private static formatCSV(rows: string[][]): string {
    return rows.map(row => 
      row.map(cell => `"${cell.toString().replace(/"/g, '""')}"`).join(',')
    ).join('\n');
  }
}
