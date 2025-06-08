
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { TimeEntry } from "@/types/timeTracking";
import { Project } from "@/types/project";
import { Trash2, Clock, Calendar } from "lucide-react";
import { format } from "date-fns";

interface TimeEntriesListProps {
  timeEntries: TimeEntry[];
  projects: Project[];
  onDeleteEntry: (entryId: string) => void;
}

export function TimeEntriesList({ timeEntries, projects, onDeleteEntry }: TimeEntriesListProps) {
  const getProjectName = (projectId: string) => {
    return projects.find(p => p.id === projectId)?.name || 'Unknown Project';
  };

  const getTaskName = (projectId: string, taskId?: string) => {
    if (!taskId) return null;
    const project = projects.find(p => p.id === projectId);
    return project?.tasks.find(t => t.id === taskId)?.name || 'Unknown Task';
  };

  const formatDuration = (minutes?: number) => {
    if (!minutes) return 'Running...';
    const hours = Math.floor(minutes / 60);
    const mins = Math.round(minutes % 60);
    return `${hours}h ${mins}m`;
  };

  const formatDate = (dateString: string) => {
    return format(new Date(dateString), 'MMM dd, yyyy');
  };

  const formatTime = (dateString: string) => {
    return format(new Date(dateString), 'HH:mm');
  };

  const completedEntries = timeEntries.filter(entry => !entry.is_running);

  if (completedEntries.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Clock className="h-4 w-4 mr-2" />
            Time Entries
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8 text-muted-foreground">
            No time entries yet. Start tracking time to see your entries here.
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Clock className="h-4 w-4 mr-2" />
          Time Entries ({completedEntries.length})
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {completedEntries.map((entry) => (
            <div key={entry.id} className="flex items-start justify-between p-3 border rounded-lg">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-medium">{getProjectName(entry.project_id)}</span>
                  {entry.task_id && (
                    <>
                      <span className="text-muted-foreground">•</span>
                      <span className="text-sm text-muted-foreground">
                        {getTaskName(entry.project_id, entry.task_id)}
                      </span>
                    </>
                  )}
                </div>
                
                {entry.description && (
                  <p className="text-sm text-muted-foreground mb-2">{entry.description}</p>
                )}
                
                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    {formatDate(entry.start_time)}
                  </div>
                  <div>
                    {formatTime(entry.start_time)} - {entry.end_time ? formatTime(entry.end_time) : 'Running'}
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-2 ml-4">
                <Badge variant="secondary">
                  {formatDuration(entry.duration_minutes)}
                </Badge>
                
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Delete Time Entry</AlertDialogTitle>
                      <AlertDialogDescription>
                        Are you sure you want to delete this time entry? This action cannot be undone.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction onClick={() => onDeleteEntry(entry.id)}>
                        Delete
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
