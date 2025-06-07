
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { Project, Task } from '@/types/project';
import { DateFormatter } from '../utils/dateFormatter';

export class PDFExporter {
  static export(projects: Project[], type: 'projects' | 'tasks'): void {
    const doc = new jsPDF();
    
    doc.setFontSize(16);
    doc.text(`${type.charAt(0).toUpperCase() + type.slice(1)} Report`, 20, 20);
    
    doc.setFontSize(10);
    doc.text(`Generated on: ${new Date().toLocaleString()}`, 20, 30);

    if (type === 'projects') {
      this.exportProjects(doc, projects);
    } else {
      this.exportTasks(doc, projects);
    }

    const timestamp = new Date().toISOString().split('T')[0];
    doc.save(`${type}-export-${timestamp}.pdf`);
  }

  private static exportProjects(doc: jsPDF, projects: Project[]): void {
    const projectData = projects.map(project => [
      project.name,
      project.description.substring(0, 50) + (project.description.length > 50 ? '...' : ''),
      DateFormatter.formatDate(project.startDate),
      DateFormatter.formatDate(project.endDate),
      project.status,
      `${project.progress}%`
    ]);

    autoTable(doc, {
      head: [['Name', 'Description', 'Start Date', 'End Date', 'Status', 'Progress']],
      body: projectData,
      startY: 40,
    });
  }

  private static exportTasks(doc: jsPDF, projects: Project[]): void {
    const allTasks: any[] = [];
    projects.forEach(project => {
      if (project.tasks) {
        project.tasks.forEach(task => {
          allTasks.push([
            project.name,
            task.name,
            task.description.substring(0, 30) + (task.description.length > 30 ? '...' : ''),
            task.responsibleParty,
            DateFormatter.formatDate(task.dueDate),
            task.status
          ]);
        });
      }
    });

    autoTable(doc, {
      head: [['Project', 'Task', 'Description', 'Responsible', 'Due Date', 'Status']],
      body: allTasks,
      startY: 40,
    });
  }
}
