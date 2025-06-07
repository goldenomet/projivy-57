
import { Project, Task } from '@/types/project';

export interface ExportData {
  projects: Project[];
  tasks: Task[];
  exportDate: string;
  version: string;
}

export class JSONExporter {
  static export(projects: Project[]): string {
    const allTasks: Task[] = [];
    projects.forEach(project => {
      if (project.tasks) {
        allTasks.push(...project.tasks);
      }
    });

    const exportData: ExportData = {
      projects,
      tasks: allTasks,
      exportDate: new Date().toISOString(),
      version: '1.0'
    };

    return JSON.stringify(exportData, null, 2);
  }

  static async import(file: File): Promise<ExportData> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const content = e.target?.result as string;
          const data = JSON.parse(content) as ExportData;
          
          // Validate the structure
          if (!data.projects || !Array.isArray(data.projects)) {
            throw new Error('Invalid JSON format: projects array is required');
          }

          // Convert date strings back to Date objects
          const processedData: ExportData = {
            ...data,
            projects: data.projects.map(project => ({
              ...project,
              startDate: new Date(project.startDate),
              endDate: new Date(project.endDate),
              tasks: project.tasks ? project.tasks.map(task => ({
                ...task,
                startDate: new Date(task.startDate),
                dueDate: new Date(task.dueDate)
              })) : []
            }))
          };

          resolve(processedData);
        } catch (error) {
          reject(new Error(`Failed to parse JSON: ${error.message}`));
        }
      };
      reader.onerror = () => reject(new Error('Failed to read file'));
      reader.readAsText(file);
    });
  }
}
