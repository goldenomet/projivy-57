
export type ProjectStatus = "active" | "completed" | "on-hold" | "cancelled";

export interface Project {
  id: string;
  name: string;
  description: string;
  startDate: Date;
  endDate: Date;
  status: ProjectStatus;
  progress: number;
  tasks: Task[];
}

export type TaskStatus = "not-started" | "in-progress" | "completed" | "delayed" | "on-hold" | "cancelled";

export interface Task {
  id: string;
  projectId: string;
  name: string;
  description: string;
  assignedTo: string[];
  responsibleParty: string;
  contacts: string[];
  startDate: Date;
  dueDate: Date;
  duration: number;
  dependencies: string[];
  status: TaskStatus;
  remarks: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
  role: string;
}

// Supabase Profile interface that matches our database structure
export interface Profile {
  id: string;
  full_name: string | null;
  avatar_url: string | null;
  updated_at: string | null;
}

// Project File interface for file management
export interface ProjectFile {
  id: string;
  project_id: string;
  file_name: string;
  file_size: number;
  file_type: string;
  storage_path: string;
  uploaded_by: string | null;
  created_at: string;
  updated_at: string;
}
