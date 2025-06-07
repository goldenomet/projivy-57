import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { Download, Upload, FileJson, FileSpreadsheet, File, FileText } from 'lucide-react';
import { ExportImportService } from '@/services/exportImportService';
import { Project } from '@/types/project';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { ProjectTaskSelector } from './ProjectTaskSelector';

interface ExportImportManagerProps {
  projects: Project[];
  onImportSuccess: (projects: Project[]) => void;
}

export function ExportImportManager({ projects, onImportSuccess }: ExportImportManagerProps) {
  const [isExporting, setIsExporting] = useState(false);
  const [isImporting, setIsImporting] = useState(false);
  const [importFile, setImportFile] = useState<File | null>(null);
  const [exportMode, setExportMode] = useState<'all' | 'selected'>('all');

  const handleExportAll = async (format: string, type: 'projects' | 'tasks') => {
    try {
      setIsExporting(true);
      await performExport(projects, format, type);
    } catch (error) {
      console.error('Export error:', error);
      toast.error('Failed to export data');
    } finally {
      setIsExporting(false);
    }
  };

  const handleExportSelected = async (selectedProjects: Project[], format: string, type: 'projects' | 'tasks') => {
    if (selectedProjects.length === 0) {
      toast.error('Please select at least one project');
      return;
    }

    try {
      setIsExporting(true);
      await performExport(selectedProjects, format, type);
    } catch (error) {
      console.error('Export error:', error);
      toast.error('Failed to export data');
    } finally {
      setIsExporting(false);
    }
  };

  const performExport = async (projectsToExport: Project[], format: string, type: 'projects' | 'tasks') => {
    const timestamp = new Date().toISOString().split('T')[0];
    
    switch (format) {
      case 'json':
        const jsonContent = ExportImportService.exportToJSON(projectsToExport);
        ExportImportService.downloadFile(
          jsonContent, 
          `${type}-export-${timestamp}.json`, 
          'application/json'
        );
        break;
      
      case 'csv':
        const csvContent = ExportImportService.exportToCSV(projectsToExport, type);
        ExportImportService.downloadFile(
          csvContent, 
          `${type}-export-${timestamp}.csv`, 
          'text/csv'
        );
        break;
      
      case 'excel':
        const excelContent = ExportImportService.exportToExcel(projectsToExport);
        ExportImportService.downloadFile(
          excelContent, 
          `${type}-export-${timestamp}.xlsx`, 
          'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
        );
        break;
      
      case 'pdf':
        ExportImportService.exportToPDF(projectsToExport, type);
        break;
      
      case 'word':
        await ExportImportService.exportToWord(projectsToExport, type);
        break;
    }
    
    toast.success(`${type.charAt(0).toUpperCase() + type.slice(1)} exported successfully`);
  };

  const handleImportJSON = async () => {
    if (!importFile) {
      toast.error('Please select a file to import');
      return;
    }

    try {
      setIsImporting(true);
      const importData = await ExportImportService.importFromJSON(importFile);
      
      // Merge with existing projects
      const existingProjects = JSON.parse(localStorage.getItem('projects') || '[]');
      const mergedProjects = [...existingProjects, ...importData.projects];
      
      // Save to localStorage
      localStorage.setItem('projects', JSON.stringify(mergedProjects));
      
      // Notify parent component
      onImportSuccess(mergedProjects);
      
      toast.success(`Imported ${importData.projects.length} projects successfully`);
      setImportFile(null);
    } catch (error) {
      console.error('Import error:', error);
      toast.error(error.message || 'Failed to import projects');
    } finally {
      setIsImporting(false);
    }
  };

  const handleImportExcel = async () => {
    if (!importFile) {
      toast.error('Please select a file to import');
      return;
    }

    try {
      setIsImporting(true);
      const importData = await ExportImportService.importFromExcel(importFile);
      
      // Process imported data and create complete projects
      const newProjects: Project[] = importData.projects.map(project => ({
        id: project.id || crypto.randomUUID(),
        name: project.name || 'Untitled Project',
        description: project.description || '',
        startDate: project.startDate || new Date(),
        endDate: project.endDate || new Date(),
        status: project.status || 'active',
        progress: project.progress || 0,
        tasks: importData.tasks.filter(task => task.projectId === project.id).map(task => ({
          id: task.id || crypto.randomUUID(),
          projectId: task.projectId || project.id || '',
          name: task.name || 'Untitled Task',
          description: task.description || '',
          assignedTo: task.assignedTo || [],
          responsibleParty: task.responsibleParty || '',
          contacts: task.contacts || [],
          startDate: task.startDate || new Date(),
          dueDate: task.dueDate || new Date(),
          duration: task.duration || 1,
          dependencies: task.dependencies || [],
          status: task.status || 'not-started',
          remarks: task.remarks || ''
        }))
      }));
      
      // Merge with existing projects
      const existingProjects = JSON.parse(localStorage.getItem('projects') || '[]');
      const mergedProjects = [...existingProjects, ...newProjects];
      
      // Save to localStorage
      localStorage.setItem('projects', JSON.stringify(mergedProjects));
      
      // Notify parent component
      onImportSuccess(mergedProjects);
      
      toast.success(`Imported ${newProjects.length} projects successfully`);
      setImportFile(null);
    } catch (error) {
      console.error('Import error:', error);
      toast.error(error.message || 'Failed to import Excel file');
    } finally {
      setIsImporting(false);
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileSpreadsheet className="h-5 w-5" />
          Export/Import Data
        </CardTitle>
        <CardDescription>
          Export your projects and tasks to various formats or import data from external sources
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="export" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="export">Export Data</TabsTrigger>
            <TabsTrigger value="import">Import Data</TabsTrigger>
          </TabsList>

          <TabsContent value="export" className="space-y-6">
            <Alert>
              <Download className="h-4 w-4" />
              <AlertDescription>
                Export your projects and tasks to preserve your data or share with others.
              </AlertDescription>
            </Alert>

            <Tabs value={exportMode} onValueChange={(value) => setExportMode(value as 'all' | 'selected')}>
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="all">Export All</TabsTrigger>
                <TabsTrigger value="selected">Select Specific</TabsTrigger>
              </TabsList>

              <TabsContent value="all" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-sm flex items-center gap-2">
                        <FileJson className="h-4 w-4" />
                        JSON
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <Button 
                        onClick={() => handleExportAll('json', 'projects')}
                        disabled={isExporting || projects.length === 0}
                        className="w-full"
                        size="sm"
                      >
                        Projects
                      </Button>
                      <Button 
                        onClick={() => handleExportAll('json', 'tasks')}
                        disabled={isExporting || projects.length === 0}
                        className="w-full"
                        size="sm"
                        variant="outline"
                      >
                        Tasks
                      </Button>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-sm flex items-center gap-2">
                        <File className="h-4 w-4" />
                        CSV
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <Button 
                        onClick={() => handleExportAll('csv', 'projects')}
                        disabled={isExporting || projects.length === 0}
                        className="w-full"
                        size="sm"
                      >
                        Projects
                      </Button>
                      <Button 
                        onClick={() => handleExportAll('csv', 'tasks')}
                        disabled={isExporting || projects.length === 0}
                        className="w-full"
                        size="sm"
                        variant="outline"
                      >
                        Tasks
                      </Button>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-sm flex items-center gap-2">
                        <FileSpreadsheet className="h-4 w-4" />
                        Excel
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <Button 
                        onClick={() => handleExportAll('excel', 'projects')}
                        disabled={isExporting || projects.length === 0}
                        className="w-full"
                        size="sm"
                      >
                        Projects
                      </Button>
                      <Button 
                        onClick={() => handleExportAll('excel', 'tasks')}
                        disabled={isExporting || projects.length === 0}
                        className="w-full"
                        size="sm"
                        variant="outline"
                      >
                        Tasks
                      </Button>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-sm flex items-center gap-2">
                        <FileText className="h-4 w-4" />
                        PDF
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <Button 
                        onClick={() => handleExportAll('pdf', 'projects')}
                        disabled={isExporting || projects.length === 0}
                        className="w-full"
                        size="sm"
                      >
                        Projects
                      </Button>
                      <Button 
                        onClick={() => handleExportAll('pdf', 'tasks')}
                        disabled={isExporting || projects.length === 0}
                        className="w-full"
                        size="sm"
                        variant="outline"
                      >
                        Tasks
                      </Button>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-sm flex items-center gap-2">
                        <FileText className="h-4 w-4" />
                        Word
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <Button 
                        onClick={() => handleExportAll('word', 'projects')}
                        disabled={isExporting || projects.length === 0}
                        className="w-full"
                        size="sm"
                      >
                        Projects
                      </Button>
                      <Button 
                        onClick={() => handleExportAll('word', 'tasks')}
                        disabled={isExporting || projects.length === 0}
                        className="w-full"
                        size="sm"
                        variant="outline"
                      >
                        Tasks
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="selected">
                <ProjectTaskSelector
                  projects={projects}
                  onSelectionChange={() => {}} // Not needed for this use case
                  onExport={handleExportSelected}
                />
              </TabsContent>
            </Tabs>

            {projects.length === 0 && (
              <Alert>
                <AlertDescription>
                  No projects available to export. Create some projects first.
                </AlertDescription>
              </Alert>
            )}
          </TabsContent>

          <TabsContent value="import" className="space-y-6">
            <Alert>
              <Upload className="h-4 w-4" />
              <AlertDescription>
                Import projects and tasks from external files. Supported formats: JSON, Excel (.xlsx)
              </AlertDescription>
            </Alert>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="import-file">Select File</Label>
                <Input
                  id="import-file"
                  type="file"
                  accept=".json,.xlsx"
                  onChange={(e) => setImportFile(e.target.files?.[0] || null)}
                />
              </div>

              {importFile && (
                <div className="flex gap-2">
                  {importFile.type === 'application/json' && (
                    <Button 
                      onClick={handleImportJSON}
                      disabled={isImporting}
                      className="flex items-center gap-2"
                    >
                      <Upload className="h-4 w-4" />
                      Import JSON
                    </Button>
                  )}
                  
                  {importFile.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' && (
                    <Button 
                      onClick={handleImportExcel}
                      disabled={isImporting}
                      className="flex items-center gap-2"
                    >
                      <Upload className="h-4 w-4" />
                      Import Excel
                    </Button>
                  )}

                  <Button 
                    variant="outline"
                    onClick={() => setImportFile(null)}
                  >
                    Cancel
                  </Button>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
