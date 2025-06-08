
import { supabase } from "@/integrations/supabase/client";
import { TeamMember } from "@/types/teamMetrics";

export class TeamMembersService {
  // Get all team members
  static async getTeamMembers(): Promise<TeamMember[]> {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('id, full_name, avatar_url')
        .order('full_name');

      if (error) throw error;
      
      return (data || []).map(profile => ({
        id: profile.id,
        name: profile.full_name || 'Unknown User',
        email: '', // Would need to be added to profiles table if needed
        avatar_url: profile.avatar_url || undefined,
        role: 'Team Member' // Default role
      }));
    } catch (error) {
      console.error('Error fetching team members:', error);
      return [];
    }
  }
}
