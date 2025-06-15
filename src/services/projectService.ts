
import { supabase } from "@/integrations/supabase/client";
import { Project, Task } from "@/types/project";

export interface SupabaseProject {
  id: string;
  user_id: string;
  name: string;
  description: string | null;
  status: string;
  priority: string;
  progress: number;
  start_date: string;
  end_date: string;
  created_at: string;
  updated_at: string;
}

export interface SupabaseTask {
  id: string;
  user_id: string;
  project_id: string;
  title: string;
  description: string | null;
  status: string;
  priority: string;
  assignee: string | null;
  start_date: string;
  due_date: string;
  created_at: string;
  updated_at: string;
}

export class ProjectService {
  static async getProjects(): Promise<Project[]> {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('No authenticated user');

      const { data: projectsData, error: projectsError } = await supabase
        .from('projects')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (projectsError) throw projectsError;

      const { data: tasksData, error: tasksError } = await supabase
        .from('tasks')
        .select('*')
        .eq('user_id', user.id);

      if (tasksError) throw tasksError;

      // Convert Supabase data to Project format
      const projects: Project[] = (projectsData || []).map((project: SupabaseProject) => {
        const projectTasks = (tasksData || [])
          .filter((task: SupabaseTask) => task.project_id === project.id)
          .map((task: SupabaseTask) => ({
            id: task.id,
            projectId: task.project_id,
            name: task.title,
            description: task.description || '',
            assignedTo: task.assignee ? [task.assignee] : [],
            responsibleParty: task.assignee || '',
            contacts: [],
            startDate: new Date(task.start_date),
            dueDate: new Date(task.due_date),
            duration: 1,
            dependencies: [],
            status: task.status as any,
            remarks: ''
          }));

        return {
          id: project.id,
          name: project.name,
          description: project.description || '',
          startDate: new Date(project.start_date),
          endDate: new Date(project.end_date),
          status: project.status as any,
          progress: project.progress,
          tasks: projectTasks
        };
      });

      return projects;
    } catch (error) {
      console.error('Error fetching projects:', error);
      return [];
    }
  }

  static async createProject(project: Omit<Project, 'id'>): Promise<Project | null> {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('No authenticated user');

      const { data, error } = await supabase
        .from('projects')
        .insert({
          user_id: user.id,
          name: project.name,
          description: project.description,
          status: project.status,
          priority: 'medium',
          progress: project.progress,
          start_date: project.startDate.toISOString(),
          end_date: project.endDate.toISOString()
        })
        .select()
        .single();

      if (error) throw error;

      // Create tasks if they exist
      if (project.tasks && project.tasks.length > 0) {
        const tasksToInsert = project.tasks.map(task => ({
          user_id: user.id,
          project_id: data.id,
          title: task.name,
          description: task.description,
          status: task.status,
          priority: 'medium',
          assignee: task.responsibleParty,
          start_date: task.startDate.toISOString(),
          due_date: task.dueDate.toISOString()
        }));

        const { error: tasksError } = await supabase
          .from('tasks')
          .insert(tasksToInsert);

        if (tasksError) throw tasksError;
      }

      return {
        id: data.id,
        name: data.name,
        description: data.description || '',
        startDate: new Date(data.start_date),
        endDate: new Date(data.end_date),
        status: data.status as any,
        progress: data.progress,
        tasks: project.tasks || []
      };
    } catch (error) {
      console.error('Error creating project:', error);
      return null;
    }
  }

  static async updateProject(projectId: string, updates: Partial<Project>): Promise<boolean> {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('No authenticated user');

      const updateData: any = {};
      if (updates.name) updateData.name = updates.name;
      if (updates.description) updateData.description = updates.description;
      if (updates.status) updateData.status = updates.status;
      if (updates.progress !== undefined) updateData.progress = updates.progress;
      if (updates.startDate) updateData.start_date = updates.startDate.toISOString();
      if (updates.endDate) updateData.end_date = updates.endDate.toISOString();

      const { error } = await supabase
        .from('projects')
        .update(updateData)
        .eq('id', projectId)
        .eq('user_id', user.id);

      if (error) throw error;
      return true;
    } catch (error) {
      console.error('Error updating project:', error);
      return false;
    }
  }

  static async deleteProject(projectId: string): Promise<boolean> {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('No authenticated user');

      const { error } = await supabase
        .from('projects')
        .delete()
        .eq('id', projectId)
        .eq('user_id', user.id);

      if (error) throw error;
      return true;
    } catch (error) {
      console.error('Error deleting project:', error);
      return false;
    }
  }
}
