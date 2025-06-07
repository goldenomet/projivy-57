
import * as XLSX from 'xlsx';
import { Project, Task } from '@/types/project';
import { DateFormatter } from '../utils/dateFormatter';

export class ExcelExporter {
  static export(projects: Project[]): ArrayBuffer {
    const workbook = XLSX.utils.book_new();

    // Projects sheet
    const projectsData = projects.map(project => ({
      ID: project.id,
      Name: project.name,
      Description: project.description,
      'Start Date': DateFormatter.formatDate(project.startDate),
      'End Date': DateFormatter.formatDate(project.endDate),
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
            'Start Date': DateFormatter.formatDate(task.startDate),
            'Due Date': DateFormatter.formatDate(task.dueDate),
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

  static async import(file: File): Promise<{ projects: Partial<Project>[], tasks: Partial<Task>[] }> {
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
