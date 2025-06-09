
import { useState } from "react";
import { Meeting } from "@/types/meeting";
import { MeetingCard } from "./MeetingCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, Filter, Plus } from "lucide-react";

interface MeetingsListProps {
  meetings: Meeting[];
  onJoinMeeting?: (meeting: Meeting) => void;
  onEditMeeting?: (meeting: Meeting) => void;
  onCancelMeeting?: (meeting: Meeting) => void;
  onScheduleNew?: () => void;
  isLoading?: boolean;
}

export function MeetingsList({
  meetings,
  onJoinMeeting,
  onEditMeeting,
  onCancelMeeting,
  onScheduleNew,
  isLoading = false
}: MeetingsListProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState<string>("all");

  const now = new Date();
  
  const filterMeetings = (meetings: Meeting[], status: string) => {
    let filtered = meetings;

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(meeting =>
        meeting.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        meeting.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        meeting.organizer_name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Filter by type
    if (filterType !== "all") {
      filtered = filtered.filter(meeting => meeting.meeting_type === filterType);
    }

    // Filter by status
    switch (status) {
      case 'upcoming':
        return filtered.filter(meeting => 
          new Date(meeting.start_time) > now && meeting.status !== 'cancelled'
        );
      case 'in-progress':
        return filtered.filter(meeting => 
          new Date(meeting.start_time) <= now && 
          new Date(meeting.end_time) > now && 
          meeting.status !== 'cancelled'
        );
      case 'past':
        return filtered.filter(meeting => 
          new Date(meeting.end_time) <= now || meeting.status === 'completed'
        );
      case 'cancelled':
        return filtered.filter(meeting => meeting.status === 'cancelled');
      default:
        return filtered;
    }
  };

  const upcomingMeetings = filterMeetings(meetings, 'upcoming');
  const inProgressMeetings = filterMeetings(meetings, 'in-progress');
  const pastMeetings = filterMeetings(meetings, 'past');
  const cancelledMeetings = filterMeetings(meetings, 'cancelled');

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold tracking-tight">Meetings</h2>
        {onScheduleNew && (
          <Button onClick={onScheduleNew} className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Schedule Meeting
          </Button>
        )}
      </div>

      {/* Filters */}
      <div className="flex gap-4 flex-wrap">
        <div className="flex-1 min-w-[200px]">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search meetings..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
        <Select value={filterType} onValueChange={setFilterType}>
          <SelectTrigger className="w-[180px]">
            <Filter className="h-4 w-4 mr-2" />
            <SelectValue placeholder="Filter by type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Platforms</SelectItem>
            <SelectItem value="google-meet">Google Meet</SelectItem>
            <SelectItem value="zoom">Zoom</SelectItem>
            <SelectItem value="teams">Microsoft Teams</SelectItem>
            <SelectItem value="custom">Custom</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Meetings Tabs */}
      <Tabs defaultValue="upcoming" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="upcoming">
            Upcoming ({upcomingMeetings.length})
          </TabsTrigger>
          <TabsTrigger value="in-progress">
            In Progress ({inProgressMeetings.length})
          </TabsTrigger>
          <TabsTrigger value="past">
            Past ({pastMeetings.length})
          </TabsTrigger>
          <TabsTrigger value="cancelled">
            Cancelled ({cancelledMeetings.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="upcoming" className="space-y-4">
          {upcomingMeetings.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              No upcoming meetings found
            </div>
          ) : (
            upcomingMeetings.map((meeting) => (
              <MeetingCard
                key={meeting.id}
                meeting={meeting}
                onJoin={onJoinMeeting}
                onEdit={onEditMeeting}
                onCancel={onCancelMeeting}
              />
            ))
          )}
        </TabsContent>

        <TabsContent value="in-progress" className="space-y-4">
          {inProgressMeetings.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              No meetings in progress
            </div>
          ) : (
            inProgressMeetings.map((meeting) => (
              <MeetingCard
                key={meeting.id}
                meeting={meeting}
                onJoin={onJoinMeeting}
              />
            ))
          )}
        </TabsContent>

        <TabsContent value="past" className="space-y-4">
          {pastMeetings.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              No past meetings found
            </div>
          ) : (
            pastMeetings.map((meeting) => (
              <MeetingCard
                key={meeting.id}
                meeting={meeting}
              />
            ))
          )}
        </TabsContent>

        <TabsContent value="cancelled" className="space-y-4">
          {cancelledMeetings.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              No cancelled meetings
            </div>
          ) : (
            cancelledMeetings.map((meeting) => (
              <MeetingCard
                key={meeting.id}
                meeting={meeting}
              />
            ))
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
