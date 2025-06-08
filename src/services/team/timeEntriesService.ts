
import { supabase } from "@/integrations/supabase/client";
import { TimeEntry } from "@/types/timeTracking";

export class TimeEntriesService {
  // Get all time entries for team analysis
  static async getTeamTimeEntries(dateRange?: { start: Date; end: Date }): Promise<TimeEntry[]> {
    try {
      let query = supabase
        .from('time_entries')
        .select('*')
        .order('start_time', { ascending: false });

      if (dateRange) {
        query = query
          .gte('start_time', dateRange.start.toISOString())
          .lte('start_time', dateRange.end.toISOString());
      }

      const { data, error } = await query;
      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Error fetching team time entries:', error);
      return [];
    }
  }
}
