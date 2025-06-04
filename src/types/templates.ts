
import { ProjectStatus, TaskStatus } from './project';

export interface TaskTemplate {
  name: string;
  description: string;
  duration: number;
  dependencies: string[];
  status: TaskStatus;
  remarks: string;
}

export interface ProjectTemplate {
  id: string;
  name: string;
  description: string;
  category: string;
  icon: string;
  estimatedDuration: number; // in days
  defaultStatus: ProjectStatus;
  tasks: TaskTemplate[];
  tags: string[];
}
