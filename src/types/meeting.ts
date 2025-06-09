
export interface Meeting {
  id: string;
  title: string;
  description?: string;
  start_time: string;
  end_time: string;
  meeting_url?: string;
  meeting_type: 'zoom' | 'google-meet' | 'teams' | 'custom';
  project_id?: string;
  organizer_id: string;
  organizer_name: string;
  attendees: MeetingAttendee[];
  status: 'scheduled' | 'in-progress' | 'completed' | 'cancelled';
  created_at: string;
  updated_at: string;
}

export interface MeetingAttendee {
  id: string;
  user_id: string;
  email: string;
  name: string;
  status: 'pending' | 'accepted' | 'declined';
  joined_at?: string;
}

export interface CreateMeetingData {
  title: string;
  description?: string;
  start_time: string;
  end_time: string;
  meeting_type: 'zoom' | 'google-meet' | 'teams' | 'custom';
  project_id?: string;
  attendee_emails: string[];
  meeting_url?: string;
}
