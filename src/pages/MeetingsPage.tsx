
import { useState } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { MeetingsList } from "@/components/meetings/MeetingsList";
import { MeetingScheduleForm } from "@/components/meetings/MeetingScheduleForm";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Meeting, CreateMeetingData } from "@/types/meeting";
import { ChevronLeft } from "lucide-react";
import { Link } from "react-router-dom";

// Mock data for demonstration
const mockMeetings: Meeting[] = [
  {
    id: "1",
    title: "Sprint Planning",
    description: "Plan the upcoming sprint and assign tasks",
    start_time: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
    end_time: new Date(Date.now() + 24 * 60 * 60 * 1000 + 60 * 60 * 1000).toISOString(),
    meeting_url: "https://meet.google.com/abc-def-ghi",
    meeting_type: "google-meet",
    project_id: "project-1",
    organizer_id: "user-1",
    organizer_name: "John Doe",
    attendees: [
      {
        id: "att-1",
        user_id: "user-2",
        email: "jane@example.com",
        name: "Jane Smith",
        status: "accepted"
      },
      {
        id: "att-2",
        user_id: "user-3",
        email: "bob@example.com",
        name: "Bob Johnson",
        status: "pending"
      }
    ],
    status: "scheduled",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: "2",
    title: "Daily Standup",
    description: "Quick sync on progress and blockers",
    start_time: new Date(Date.now() + 60 * 60 * 1000).toISOString(),
    end_time: new Date(Date.now() + 60 * 60 * 1000 + 30 * 60 * 1000).toISOString(),
    meeting_url: "https://zoom.us/j/123456789",
    meeting_type: "zoom",
    organizer_id: "user-1",
    organizer_name: "John Doe",
    attendees: [
      {
        id: "att-3",
        user_id: "user-2",
        email: "jane@example.com",
        name: "Jane Smith",
        status: "accepted"
      }
    ],
    status: "scheduled",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  }
];

const mockProjects = [
  { id: "project-1", name: "Website Redesign" },
  { id: "project-2", name: "Mobile App Development" },
  { id: "project-3", name: "Marketing Campaign" }
];

export default function MeetingsPage() {
  const [meetings, setMeetings] = useState<Meeting[]>(mockMeetings);
  const [isScheduleDialogOpen, setIsScheduleDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const generateMeetingUrl = (type: string): string => {
    switch (type) {
      case 'google-meet':
        return `https://meet.google.com/${Math.random().toString(36).substring(2, 15)}`;
      case 'zoom':
        return `https://zoom.us/j/${Math.floor(Math.random() * 1000000000)}`;
      case 'teams':
        return `https://teams.microsoft.com/l/meetup-join/${Math.random().toString(36).substring(2, 15)}`;
      default:
        return '';
    }
  };

  const handleScheduleMeeting = async (data: CreateMeetingData) => {
    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const newMeeting: Meeting = {
        id: `meeting-${Date.now()}`,
        title: data.title,
        description: data.description,
        start_time: data.start_time,
        end_time: data.end_time,
        meeting_url: data.meeting_url || generateMeetingUrl(data.meeting_type),
        meeting_type: data.meeting_type,
        project_id: data.project_id,
        organizer_id: "current-user",
        organizer_name: "Current User",
        attendees: data.attendee_emails.map((email, index) => ({
          id: `att-${Date.now()}-${index}`,
          user_id: `user-${index}`,
          email,
          name: email.split('@')[0],
          status: "pending" as const
        })),
        status: "scheduled",
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };

      setMeetings(prev => [newMeeting, ...prev]);
      setIsScheduleDialogOpen(false);
      
      toast({
        title: "Meeting Scheduled",
        description: `Meeting "${data.title}" has been scheduled successfully.`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to schedule meeting. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleJoinMeeting = (meeting: Meeting) => {
    if (meeting.meeting_url) {
      window.open(meeting.meeting_url, '_blank');
      toast({
        title: "Joining Meeting",
        description: `Opening ${meeting.title} in a new tab.`,
      });
    } else {
      toast({
        title: "No Meeting URL",
        description: "This meeting doesn't have a valid URL.",
        variant: "destructive",
      });
    }
  };

  const handleEditMeeting = (meeting: Meeting) => {
    toast({
      title: "Edit Meeting",
      description: "Meeting editing will be implemented in the full version.",
    });
  };

  const handleCancelMeeting = (meeting: Meeting) => {
    setMeetings(prev => 
      prev.map(m => 
        m.id === meeting.id 
          ? { ...m, status: "cancelled" as const }
          : m
      )
    );
    
    toast({
      title: "Meeting Cancelled",
      description: `"${meeting.title}" has been cancelled.`,
    });
  };

  return (
    <AppLayout>
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Link to="/dashboard">
            <Button variant="ghost" size="sm">
              <ChevronLeft className="h-4 w-4 mr-1" />
              Back to Dashboard
            </Button>
          </Link>
        </div>

        <MeetingsList
          meetings={meetings}
          onJoinMeeting={handleJoinMeeting}
          onEditMeeting={handleEditMeeting}
          onCancelMeeting={handleCancelMeeting}
          onScheduleNew={() => setIsScheduleDialogOpen(true)}
        />

        <Dialog open={isScheduleDialogOpen} onOpenChange={setIsScheduleDialogOpen}>
          <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Schedule New Meeting</DialogTitle>
            </DialogHeader>
            <MeetingScheduleForm
              onSubmit={handleScheduleMeeting}
              onCancel={() => setIsScheduleDialogOpen(false)}
              projects={mockProjects}
              isLoading={isLoading}
            />
          </DialogContent>
        </Dialog>
      </div>
    </AppLayout>
  );
}
