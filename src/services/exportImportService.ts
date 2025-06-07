
import * as XLSX from 'xlsx';
import { Project, Task } from '@/types/project';

export interface ExportData {
  projects: Project[];
  tasks: Task[];
  exportDate: string;
  version: string;
}

export class ExportImportService {
  private static formatDate(date: Date): string {
    return date.toISOString().split('T')[0];
  }

  private static formatDateTime(date: Date): string {
    return date.toISOString();
  }

  static exportToJSON(projects: Project[]): string {
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

  static exportToCSV(projects: Project[], type: 'projects' | 'tasks'): string {
    if (type === 'projects') {
      const headers = ['ID', 'Name', 'Description', 'Start Date', 'End Date', 'Status', 'Progress'];
      const rows = projects.map(project => [
        project.id,
        project.name,
        project.description,
        this.formatDate(project.startDate),
        this.formatDate(project.endDate),
        project.status,
        project.progress.toString()
      ]);

      return [headers, ...rows].map(row => 
        row.map(cell => `"${cell.toString().replace(/"/g, '""')}"`).join(',')
      ).join('\n');
    } else {
      const allTasks: Task[] = [];
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
        this.formatDate(task.startDate),
        this.formatDate(task.dueDate),
        task.status,
        task.duration.toString(),
        task.remarks
      ]);

      return [headers, ...rows].map(row => 
        row.map(cell => `"${cell.toString().replace(/"/g, '""')}"`).join(',')
      ).join('\n');
    }
  }

  static exportToExcel(projects: Project[]): ArrayBuffer {
    const workbook = XLSX.utils.book_new();

    // Projects sheet
    const projectsData = projects.map(project => ({
      ID: project.id,
      Name: project.name,
      Description: project.description,
      'Start Date': this.formatDate(project.startDate),
      'End Date': this.formatDate(project.endDate),
      Status: project.status,
      Progress: project.progress
    }));

    const projectsSheet = XLSX.utils.json_to_sheet(projectsData);
    XLSX.utils.book_append_sheet(workbook, projectsSheet, 'Projects');

    // Tasks sheet
    const allTasks: any[] = [];
    projects.forEach(project => {
      if (project.tasks) {
        project.tasks.forEach(task => {
          allTasks.push({
            ID: task.id,
            'Project ID': project.id,
            'Project Name': project.name,
            Name: task.name,
            Description: task.description,
            'Assigned To': task.assignedTo.join('; '),
            'Responsible Party': task.responsibleParty,
            'Start Date': this.formatDate(task.startDate),
            'Due Date': this.formatDate(task.dueDate),
            Status: task.status,
            Duration: task.duration,
            Remarks: task.remarks
          });
        });
      }
    });

    const tasksSheet = XLSX.utils.json_to_sheet(allTasks);
    XLSX.utils.book_append_sheet(workbook, tasksSheet, 'Tasks');

    return XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
  }

  static downloadFile(content: string | ArrayBuffer, filename: string, mimeType: string): void {
    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }

  static async importFromJSON(file: File): Promise<ExportData> {
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

  static async importFromExcel(file: File): Promise<{ projects: Partial<Project>[], tasks: Partial<Task>[] }> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const data = new Uint8Array(e.target?.result as ArrayBuffer);
          const workbook = XLSX.read(data, { type: 'array' });

          const projects: Partial<Project>[] = [];
          const tasks: Partial<Task>[] = [];

          // Read projects sheet
          if (workbook.SheetNames.includes('Projects')) {
            const projectsSheet = workbook.Sheets['Projects'];
            const projectsData = XLSX.utils.sheet_to_json(projectsSheet);
            
            projectsData.forEach((row: any) => {
              projects.push({
                id: row.ID || crypto.randomUUID(),
                name: row.Name,
                description: row.Description,
                startDate: row['Start Date'] ? new Date(row['Start Date']) : new Date(),
                endDate: row['End Date'] ? new Date(row['End Date']) : new Date(),
                status: row.Status || 'active',
                progress: parseFloat(row.Progress) || 0,
                tasks: []
              });
            });
          }

          // Read tasks sheet
          if (workbook.SheetNames.includes('Tasks')) {
            const tasksSheet = workbook.Sheets['Tasks'];
            const tasksData = XLSX.utils.sheet_to_json(tasksSheet);
            
            tasksData.forEach((row: any) => {
              tasks.push({
                id: row.ID || crypto.randomUUID(),
                projectId: row['Project ID'],
                name: row.Name,
                description: row.Description,
                assignedTo: row['Assigned To'] ? row['Assigned To'].split('; ') : [],
                responsibleParty: row['Responsible Party'] || '',
                startDate: row['Start Date'] ? new Date(row['Start Date']) : new Date(),
                dueDate: row['Due Date'] ? new Date(row['Due Date']) : new Date(),
                status: row.Status || 'not-started',
                duration: parseInt(row.Duration) || 1,
                dependencies: [],
                contacts: [],
                remarks: row.Remarks || ''
              });
            });
          }

          resolve({ projects, tasks });
        } catch (error) {
          reject(new Error(`Failed to parse Excel file: ${error.message}`));
        }
      };
      reader.onerror = () => reject(new Error('Failed to read file'));
      reader.readAsArrayBuffer(file);
    });
  }
}
