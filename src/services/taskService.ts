
import { supabase } from "@/integrations/supabase/client";
import { Task } from "@/types/project";
import { SupabaseTask } from "./projectService";

export class TaskService {
  static async createTask(projectId: string, task: Omit<Task, 'id' | 'projectId'>): Promise<Task | null> {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('No authenticated user');

      const { data, error } = await supabase
        .from('tasks')
        .insert({
          user_id: user.id,
          project_id: projectId,
          title: task.name,
          description: task.description,
          status: task.status,
          priority: 'medium',
          assignee: task.responsibleParty,
          start_date: task.startDate.toISOString(),
          due_date: task.dueDate.toISOString()
        })
        .select()
        .single();

      if (error) throw error;

      return {
        id: data.id,
        projectId: data.project_id,
        name: data.title,
        description: data.description || '',
        assignedTo: data.assignee ? [data.assignee] : [],
        responsibleParty: data.assignee || '',
        contacts: [],
        startDate: new Date(data.start_date),
        dueDate: new Date(data.due_date),
        duration: 1,
        dependencies: [],
        status: data.status as any,
        remarks: ''
      };
    } catch (error) {
      console.error('Error creating task:', error);
      return null;
    }
  }

  static async updateTask(taskId: string, updates: Partial<Task>): Promise<boolean> {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('No authenticated user');

      const updateData: any = {};
      if (updates.name) updateData.title = updates.name;
      if (updates.description) updateData.description = updates.description;
      if (updates.status) updateData.status = updates.status;
      if (updates.responsibleParty) updateData.assignee = updates.responsibleParty;
      if (updates.startDate) updateData.start_date = updates.startDate.toISOString();
      if (updates.dueDate) updateData.due_date = updates.dueDate.toISOString();

      const { error } = await supabase
        .from('tasks')
        .update(updateData)
        .eq('id', taskId)
        .eq('user_id', user.id);

      if (error) throw error;
      return true;
    } catch (error) {
      console.error('Error updating task:', error);
      return false;
    }
  }

  static async deleteTask(taskId: string): Promise<boolean> {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('No authenticated user');

      const { error } = await supabase
        .from('tasks')
        .delete()
        .eq('id', taskId)
        .eq('user_id', user.id);

      if (error) throw error;
      return true;
    } catch (error) {
      console.error('Error deleting task:', error);
      return false;
    }
  }

  static async getTasksByProject(projectId: string): Promise<Task[]> {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('No authenticated user');

      const { data, error } = await supabase
        .from('tasks')
        .select('*')
        .eq('project_id', projectId)
        .eq('user_id', user.id);

      if (error) throw error;

      return (data || []).map((task: SupabaseTask) => ({
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
    } catch (error) {
      console.error('Error fetching tasks:', error);
      return [];
    }
  }
}
