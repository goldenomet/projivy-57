
import { Document, Packer, Paragraph, Table, TableCell, TableRow, WidthType } from 'docx';
import { saveAs } from 'file-saver';
import { Project, Task } from '@/types/project';
import { DateFormatter } from '../utils/dateFormatter';

export class WordExporter {
  static async export(projects: Project[], type: 'projects' | 'tasks'): Promise<void> {
    const children: any[] = [
      new Paragraph({
        text: `${type.charAt(0).toUpperCase() + type.slice(1)} Report`,
        heading: 'Heading1',
      }),
      new Paragraph({
        text: `Generated on: ${new Date().toLocaleString()}`,
      }),
      new Paragraph({ text: '' }),
    ];

    if (type === 'projects') {
      children.push(this.createProjectsTable(projects));
    } else {
      children.push(this.createTasksTable(projects));
    }

    const doc = new Document({
      sections: [{
        children,
      }],
    });

    const buffer = await Packer.toBlob(doc);
    const timestamp = new Date().toISOString().split('T')[0];
    saveAs(buffer, `${type}-export-${timestamp}.docx`);
  }

  private static createProjectsTable(projects: Project[]): Table {
    const tableRows = [
      new TableRow({
        children: [
          new TableCell({ children: [new Paragraph('Name')] }),
          new TableCell({ children: [new Paragraph('Description')] }),
          new TableCell({ children: [new Paragraph('Start Date')] }),
          new TableCell({ children: [new Paragraph('End Date')] }),
          new TableCell({ children: [new Paragraph('Status')] }),
          new TableCell({ children: [new Paragraph('Progress')] }),
        ],
      }),
      ...projects.map(project => 
        new TableRow({
          children: [
            new TableCell({ children: [new Paragraph(project.name)] }),
            new TableCell({ children: [new Paragraph(project.description)] }),
            new TableCell({ children: [new Paragraph(DateFormatter.formatDate(project.startDate))] }),
            new TableCell({ children: [new Paragraph(DateFormatter.formatDate(project.endDate))] }),
            new TableCell({ children: [new Paragraph(project.status)] }),
            new TableCell({ children: [new Paragraph(`${project.progress}%`)] }),
          ],
        })
      ),
    ];

    return new Table({
      width: { size: 100, type: WidthType.PERCENTAGE },
      rows: tableRows,
    });
  }

  private static createTasksTable(projects: Project[]): Table {
    const allTasks: (Task & { projectName: string })[] = [];
    projects.forEach(project => {
      if (project.tasks) {
        allTasks.push(...project.tasks.map(task => ({ ...task, projectName: project.name })));
      }
    });

    const tableRows = [
      new TableRow({
        children: [
          new TableCell({ children: [new Paragraph('Project')] }),
          new TableCell({ children: [new Paragraph('Task')] }),
          new TableCell({ children: [new Paragraph('Description')] }),
          new TableCell({ children: [new Paragraph('Responsible')] }),
          new TableCell({ children: [new Paragraph('Due Date')] }),
          new TableCell({ children: [new Paragraph('Status')] }),
        ],
      }),
      ...allTasks.map(task => 
        new TableRow({
          children: [
            new TableCell({ children: [new Paragraph(task.projectName)] }),
            new TableCell({ children: [new Paragraph(task.name)] }),
            new TableCell({ children: [new Paragraph(task.description)] }),
            new TableCell({ children: [new Paragraph(task.responsibleParty)] }),
            new TableCell({ children: [new Paragraph(DateFormatter.formatDate(task.dueDate))] }),
            new TableCell({ children: [new Paragraph(task.status)] }),
          ],
        })
      ),
    ];

    return new Table({
      width: { size: 100, type: WidthType.PERCENTAGE },
      rows: tableRows,
    });
  }
}
