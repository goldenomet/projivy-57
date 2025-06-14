
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CalendarPlus } from "lucide-react";
import { toast } from "sonner";
import { Task } from "@/types/project";

interface NewEventState {
  name: string;
  description: string;
  startDate: string;
  dueDate: string;
  status: "not-started" | "in-progress" | "completed" | "on-hold";
}

interface CalendarPageHeaderProps {
  isCreateDialogOpen: boolean;
  setIsCreateDialogOpen: (open: boolean) => void;
  newEvent: NewEventState;
  setNewEvent: (event: NewEventState | ((prev: NewEventState) => NewEventState)) => void;
  onCreateEvent: () => void;
}

export function CalendarPageHeader({
  isCreateDialogOpen,
  setIsCreateDialogOpen,
  newEvent,
  setNewEvent,
  onCreateEvent
}: CalendarPageHeaderProps) {
  return (
    <div className="flex items-center justify-between">
      <div className="space-y-1">
        <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
          Calendar
        </h1>
        <p className="text-muted-foreground">Manage your schedule and track project deadlines</p>
      </div>
      
      <div className="flex items-center gap-2">
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button className="btn-gradient interactive-button">
              <CalendarPlus className="h-4 w-4 mr-2" />
              Create Event
            </Button>
          </DialogTrigger>
          <DialogContent className="card-gradient">
            <DialogHeader>
              <DialogTitle>Create New Event</DialogTitle>
              <DialogDescription>
                Add a new event or deadline to your calendar
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="name">Event Name</Label>
                <Input
                  id="name"
                  value={newEvent.name}
                  onChange={(e) => setNewEvent(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="Enter event name"
                  className="focus-ring"
                />
              </div>
              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={newEvent.description}
                  onChange={(e) => setNewEvent(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Optional description"
                  className="focus-ring"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="startDate">Start Date</Label>
                  <Input
                    id="startDate"
                    type="date"
                    value={newEvent.startDate}
                    onChange={(e) => setNewEvent(prev => ({ ...prev, startDate: e.target.value }))}
                    className="focus-ring"
                  />
                </div>
                <div>
                  <Label htmlFor="dueDate">End Date</Label>
                  <Input
                    id="dueDate"
                    type="date"
                    value={newEvent.dueDate}
                    onChange={(e) => setNewEvent(prev => ({ ...prev, dueDate: e.target.value }))}
                    className="focus-ring"
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="status">Status</Label>
                <Select value={newEvent.status} onValueChange={(value: any) => setNewEvent(prev => ({ ...prev, status: value }))}>
                  <SelectTrigger className="focus-ring">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="not-started">Not Started</SelectItem>
                    <SelectItem value="in-progress">In Progress</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                    <SelectItem value="on-hold">On Hold</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={onCreateEvent} className="btn-gradient">
                  Create Event
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
