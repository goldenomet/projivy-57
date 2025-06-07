
import { Project, Task } from '@/types/project';
import { JSONExporter, ExportData } from './export/jsonExporter';
import { CSVExporter } from './export/csvExporter';
import { ExcelExporter } from './export/excelExporter';
import { PDFExporter } from './export/pdfExporter';
import { WordExporter } from './export/wordExporter';
import { FileDownloader } from './utils/fileDownloader';

export { ExportData };

export class ExportImportService {
  // Export methods
  static exportToJSON(projects: Project[]): string {
    return JSONExporter.export(projects);
  }

  static exportToCSV(projects: Project[], type: 'projects' | 'tasks'): string {
    return CSVExporter.export(projects, type);
  }

  static exportToExcel(projects: Project[]): ArrayBuffer {
    return ExcelExporter.export(projects);
  }

  static exportToPDF(projects: Project[], type: 'projects' | 'tasks'): void {
    PDFExporter.export(projects, type);
  }

  static async exportToWord(projects: Project[], type: 'projects' | 'tasks'): Promise<void> {
    await WordExporter.export(projects, type);
  }

  // Import methods
  static async importFromJSON(file: File): Promise<ExportData> {
    return JSONExporter.import(file);
  }

  static async importFromExcel(file: File): Promise<{ projects: Partial<Project>[], tasks: Partial<Task>[] }> {
    return ExcelExporter.import(file);
  }

  // Utility methods
  static downloadFile(content: string | ArrayBuffer, filename: string, mimeType: string): void {
    FileDownloader.download(content, filename, mimeType);
  }
}
