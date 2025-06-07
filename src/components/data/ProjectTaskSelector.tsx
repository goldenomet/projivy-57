
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { Project, Task } from '@/types/project';
import { CheckSquare, Square } from 'lucide-react';

interface ProjectTaskSelectorProps {
  projects: Project[];
  onSelectionChange: (selectedProjects: Project[], selectedTasks: Task[]) => void;
  onExport: (selectedProjects: Project[], format: string, type: 'projects' | 'tasks') => void;
}

export function ProjectTaskSelector({ projects, onSelectionChange, onExport }: ProjectTaskSelectorProps) {
  const [selectedProjectIds, setSelectedProjectIds] = useState<Set<string>>(new Set());
  const [selectedTaskIds, setSelectedTaskIds] = useState<Set<string>>(new Set());
  const [exportType, setExportType] = useState<'projects' | 'tasks'>('projects');

  const handleProjectToggle = (projectId: string, checked: boolean) => {
    const newSelected = new Set(selectedProjectIds);
    if (checked) {
      newSelected.add(projectId);
    } else {
      newSelected.delete(projectId);
      // Also remove all tasks from this project
      const project = projects.find(p => p.id === projectId);
      if (project) {
        const newSelectedTasks = new Set(selectedTaskIds);
        project.tasks?.forEach(task => newSelectedTasks.delete(task.id));
        setSelectedTaskIds(newSelectedTasks);
      }
    }
    setSelectedProjectIds(newSelected);
    updateSelection(newSelected, selectedTaskIds);
  };

  const handleTaskToggle = (taskId: string, projectId: string, checked: boolean) => {
    const newSelectedTasks = new Set(selectedTaskIds);
    const newSelectedProjects = new Set(selectedProjectIds);
    
    if (checked) {
      newSelectedTasks.add(taskId);
      newSelectedProjects.add(projectId); // Auto-select parent project
    } else {
      newSelectedTasks.delete(taskId);
    }
    
    setSelectedTaskIds(newSelectedTasks);
    setSelectedProjectIds(newSelectedProjects);
    updateSelection(newSelectedProjects, newSelectedTasks);
  };

  const updateSelection = (projectIds: Set<string>, taskIds: Set<string>) => {
    const selectedProjects = projects.filter(p => projectIds.has(p.id));
    const selectedTasks: Task[] = [];
    
    selectedProjects.forEach(project => {
      if (project.tasks) {
        project.tasks.forEach(task => {
          if (taskIds.has(task.id)) {
            selectedTasks.push(task);
          }
        });
      }
    });
    
    onSelectionChange(selectedProjects, selectedTasks);
  };

  const handleSelectAll = () => {
    const allProjectIds = new Set(projects.map(p => p.id));
    const allTaskIds = new Set<string>();
    projects.forEach(project => {
      project.tasks?.forEach(task => allTaskIds.add(task.id));
    });
    
    setSelectedProjectIds(allProjectIds);
    setSelectedTaskIds(allTaskIds);
    updateSelection(allProjectIds, allTaskIds);
  };

  const handleDeselectAll = () => {
    setSelectedProjectIds(new Set());
    setSelectedTaskIds(new Set());
    updateSelection(new Set(), new Set());
  };

  const getSelectedProjects = () => {
    return projects.filter(p => selectedProjectIds.has(p.id));
  };

  const hasSelection = selectedProjectIds.size > 0;

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Select Data to Export</CardTitle>
          <CardDescription>
            Choose specific projects and tasks to include in your export
          </CardDescription>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={handleSelectAll}>
              <CheckSquare className="h-4 w-4 mr-1" />
              Select All
            </Button>
            <Button variant="outline" size="sm" onClick={handleDeselectAll}>
              <Square className="h-4 w-4 mr-1" />
              Deselect All
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[300px] pr-4">
            <div className="space-y-4">
              {projects.map(project => (
                <div key={project.id} className="border rounded-lg p-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <Checkbox
                      id={`project-${project.id}`}
                      checked={selectedProjectIds.has(project.id)}
                      onCheckedChange={(checked) => 
                        handleProjectToggle(project.id, checked as boolean)
                      }
                    />
                    <div className="flex-1">
                      <label
                        htmlFor={`project-${project.id}`}
                        className="font-medium cursor-pointer"
                      >
                        {project.name}
                      </label>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge variant="secondary">{project.status}</Badge>
                        <span className="text-sm text-muted-foreground">
                          {project.tasks?.length || 0} tasks
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  {project.tasks && project.tasks.length > 0 && (
                    <div className="ml-6 space-y-2">
                      {project.tasks.map(task => (
                        <div key={task.id} className="flex items-center space-x-2">
                          <Checkbox
                            id={`task-${task.id}`}
                            checked={selectedTaskIds.has(task.id)}
                            onCheckedChange={(checked) => 
                              handleTaskToggle(task.id, project.id, checked as boolean)
                            }
                          />
                          <label
                            htmlFor={`task-${task.id}`}
                            className="text-sm cursor-pointer flex-1"
                          >
                            {task.name}
                          </label>
                          <Badge variant="outline" className="text-xs">
                            {task.status}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>

      {hasSelection && (
        <Card>
          <CardHeader>
            <CardTitle>Export Options</CardTitle>
            <CardDescription>
              Selected: {selectedProjectIds.size} projects, {selectedTaskIds.size} tasks
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex gap-2">
                <Button
                  variant={exportType === 'projects' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setExportType('projects')}
                >
                  Export Projects
                </Button>
                <Button
                  variant={exportType === 'tasks' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setExportType('tasks')}
                >
                  Export Tasks
                </Button>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onExport(getSelectedProjects(), 'json', exportType)}
                >
                  JSON
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onExport(getSelectedProjects(), 'csv', exportType)}
                >
                  CSV
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onExport(getSelectedProjects(), 'excel', exportType)}
                >
                  Excel
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onExport(getSelectedProjects(), 'pdf', exportType)}
                >
                  PDF
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onExport(getSelectedProjects(), 'word', exportType)}
                >
                  Word
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
