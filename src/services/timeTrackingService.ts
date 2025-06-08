
import { supabase } from "@/integrations/supabase/client";
import { TimeEntry, TimeTrackingStats } from "@/types/timeTracking";
import { Project } from "@/types/project";

export class TimeTrackingService {
  // Start a new time entry
  static async startTimer(projectId: string, taskId?: string, description?: string): Promise<TimeEntry | null> {
    try {
      // First, stop any running timers
      await this.stopRunningTimers();
      
      // Get current user
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('No authenticated user');

      const { data, error } = await supabase
        .from('time_entries')
        .insert({
          user_id: user.id,
          project_id: projectId,
          task_id: taskId,
          description,
          start_time: new Date().toISOString(),
          is_running: true
        })
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error starting timer:', error);
      return null;
    }
  }

  // Stop the currently running timer
  static async stopTimer(timeEntryId: string): Promise<TimeEntry | null> {
    try {
      const { data, error } = await supabase
        .from('time_entries')
        .update({
          end_time: new Date().toISOString(),
          is_running: false
        })
        .eq('id', timeEntryId)
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error stopping timer:', error);
      return null;
    }
  }

  // Stop all running timers for the current user
  static async stopRunningTimers(): Promise<void> {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      await supabase
        .from('time_entries')
        .update({
          end_time: new Date().toISOString(),
          is_running: false
        })
        .eq('user_id', user.id)
        .eq('is_running', true);
    } catch (error) {
      console.error('Error stopping running timers:', error);
    }
  }

  // Get currently running timer
  static async getRunningTimer(): Promise<TimeEntry | null> {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return null;

      const { data, error } = await supabase
        .from('time_entries')
        .select('*')
        .eq('user_id', user.id)
        .eq('is_running', true)
        .single();

      if (error && error.code !== 'PGRST116') throw error;
      return data || null;
    } catch (error) {
      console.error('Error getting running timer:', error);
      return null;
    }
  }

  // Get time entries for a specific project
  static async getProjectTimeEntries(projectId: string): Promise<TimeEntry[]> {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return [];

      const { data, error } = await supabase
        .from('time_entries')
        .select('*')
        .eq('user_id', user.id)
        .eq('project_id', projectId)
        .order('start_time', { ascending: false });

      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Error getting project time entries:', error);
      return [];
    }
  }

  // Get all time entries for the current user
  static async getAllTimeEntries(): Promise<TimeEntry[]> {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return [];

      const { data, error } = await supabase
        .from('time_entries')
        .select('*')
        .eq('user_id', user.id)
        .order('start_time', { ascending: false });

      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Error getting time entries:', error);
      return [];
    }
  }

  // Calculate time tracking statistics
  static calculateStats(timeEntries: TimeEntry[], projects: Project[]): TimeTrackingStats {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const weekStart = new Date(today.getTime() - (today.getDay() * 24 * 60 * 60 * 1000));
    const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);

    const completedEntries = timeEntries.filter(entry => entry.duration_minutes);

    const totalMinutes = completedEntries.reduce((sum, entry) => sum + (entry.duration_minutes || 0), 0);
    
    const todayMinutes = completedEntries
      .filter(entry => new Date(entry.start_time) >= today)
      .reduce((sum, entry) => sum + (entry.duration_minutes || 0), 0);

    const weekMinutes = completedEntries
      .filter(entry => new Date(entry.start_time) >= weekStart)
      .reduce((sum, entry) => sum + (entry.duration_minutes || 0), 0);

    const monthMinutes = completedEntries
      .filter(entry => new Date(entry.start_time) >= monthStart)
      .reduce((sum, entry) => sum + (entry.duration_minutes || 0), 0);

    // Project breakdown
    const projectMinutes: { [key: string]: number } = {};
    completedEntries.forEach(entry => {
      projectMinutes[entry.project_id] = (projectMinutes[entry.project_id] || 0) + (entry.duration_minutes || 0);
    });

    const projectBreakdown = Object.entries(projectMinutes).map(([projectId, minutes]) => {
      const project = projects.find(p => p.id === projectId);
      return {
        projectId,
        projectName: project?.name || 'Unknown Project',
        hours: Math.round((minutes / 60) * 100) / 100
      };
    }).sort((a, b) => b.hours - a.hours);

    return {
      totalHours: Math.round((totalMinutes / 60) * 100) / 100,
      todayHours: Math.round((todayMinutes / 60) * 100) / 100,
      weekHours: Math.round((weekMinutes / 60) * 100) / 100,
      monthHours: Math.round((monthMinutes / 60) * 100) / 100,
      projectBreakdown
    };
  }

  // Delete a time entry
  static async deleteTimeEntry(timeEntryId: string): Promise<boolean> {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return false;

      const { error } = await supabase
        .from('time_entries')
        .delete()
        .eq('id', timeEntryId)
        .eq('user_id', user.id);

      if (error) throw error;
      return true;
    } catch (error) {
      console.error('Error deleting time entry:', error);
      return false;
    }
  }

  // Update a time entry
  static async updateTimeEntry(timeEntryId: string, updates: Partial<TimeEntry>): Promise<TimeEntry | null> {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return null;

      const { data, error } = await supabase
        .from('time_entries')
        .update(updates)
        .eq('id', timeEntryId)
        .eq('user_id', user.id)
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error updating time entry:', error);
      return null;
    }
  }
}
