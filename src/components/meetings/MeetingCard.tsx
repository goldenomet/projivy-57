
import { Meeting } from "@/types/meeting";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Calendar, Clock, Users, Video, ExternalLink } from "lucide-react";
import { format } from "date-fns";

interface MeetingCardProps {
  meeting: Meeting;
  onJoin?: (meeting: Meeting) => void;
  onEdit?: (meeting: Meeting) => void;
  onCancel?: (meeting: Meeting) => void;
}

export function MeetingCard({ meeting, onJoin, onEdit, onCancel }: MeetingCardProps) {
  const startTime = new Date(meeting.start_time);
  const endTime = new Date(meeting.end_time);
  const now = new Date();
  const isUpcoming = startTime > now;
  const isInProgress = startTime <= now && endTime > now;
  const isPast = endTime <= now;

  const getStatusColor = () => {
    switch (meeting.status) {
      case 'scheduled': return isUpcoming ? 'bg-blue-500' : 'bg-green-500';
      case 'in-progress': return 'bg-green-500';
      case 'completed': return 'bg-gray-500';
      case 'cancelled': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusText = () => {
    if (meeting.status === 'cancelled') return 'Cancelled';
    if (isPast) return 'Completed';
    if (isInProgress) return 'In Progress';
    return 'Scheduled';
  };

  const getMeetingPlatformIcon = () => {
    switch (meeting.meeting_type) {
      case 'zoom': return '🔵';
      case 'google-meet': return '🟢';
      case 'teams': return '🟣';
      default: return '📹';
    }
  };

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h3 className="font-semibold text-lg mb-2">{meeting.title}</h3>
            {meeting.description && (
              <p className="text-sm text-muted-foreground mb-3">{meeting.description}</p>
            )}
          </div>
          <Badge variant="secondary" className={`${getStatusColor()} text-white`}>
            {getStatusText()}
          </Badge>
        </div>
        
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Calendar className="h-4 w-4" />
            {format(startTime, 'MMM dd, yyyy')}
          </div>
          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            {format(startTime, 'h:mm a')} - {format(endTime, 'h:mm a')}
          </div>
          <div className="flex items-center gap-1">
            <span>{getMeetingPlatformIcon()}</span>
            {meeting.meeting_type.charAt(0).toUpperCase() + meeting.meeting_type.slice(1).replace('-', ' ')}
          </div>
        </div>
      </CardHeader>

      <CardContent className="pt-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Users className="h-4 w-4 text-muted-foreground" />
            <div className="flex -space-x-2">
              {meeting.attendees.slice(0, 3).map((attendee, index) => (
                <Avatar key={attendee.id} className="h-6 w-6 border-2 border-background">
                  <AvatarFallback className="text-xs">
                    {attendee.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                  </AvatarFallback>
                </Avatar>
              ))}
              {meeting.attendees.length > 3 && (
                <div className="h-6 w-6 rounded-full bg-muted border-2 border-background flex items-center justify-center">
                  <span className="text-xs text-muted-foreground">+{meeting.attendees.length - 3}</span>
                </div>
              )}
            </div>
            <span className="text-sm text-muted-foreground">
              {meeting.attendees.length} attendee{meeting.attendees.length !== 1 ? 's' : ''}
            </span>
          </div>

          <div className="flex gap-2">
            {(isInProgress || isUpcoming) && meeting.status !== 'cancelled' && onJoin && (
              <Button
                onClick={() => onJoin(meeting)}
                size="sm"
                className="flex items-center gap-1"
              >
                <Video className="h-4 w-4" />
                {isInProgress ? 'Join Now' : 'Join'}
                <ExternalLink className="h-3 w-3" />
              </Button>
            )}
            {isUpcoming && meeting.status !== 'cancelled' && onEdit && (
              <Button onClick={() => onEdit(meeting)} variant="outline" size="sm">
                Edit
              </Button>
            )}
            {isUpcoming && meeting.status !== 'cancelled' && onCancel && (
              <Button onClick={() => onCancel(meeting)} variant="destructive" size="sm">
                Cancel
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
