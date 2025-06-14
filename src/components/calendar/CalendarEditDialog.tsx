
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
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
import { Button } from "@/components/ui/button";
import { Task } from "@/types/project";

interface CalendarEditDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  selectedTask: Task | null;
  setSelectedTask: React.Dispatch<React.SetStateAction<Task | null>>;
  onSave: () => void;
}

export function CalendarEditDialog({
  isOpen,
  onOpenChange,
  selectedTask,
  setSelectedTask,
  onSave
}: CalendarEditDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="card-gradient">
        <DialogHeader>
          <DialogTitle>Edit Task</DialogTitle>
          <DialogDescription>
            Update task details and status
          </DialogDescription>
        </DialogHeader>
        {selectedTask && (
          <div className="space-y-4">
            <div>
              <Label htmlFor="edit-name">Task Name</Label>
              <Input
                id="edit-name"
                value={selectedTask.name}
                onChange={(e) => setSelectedTask(prev => prev ? { ...prev, name: e.target.value } : null)}
                className="focus-ring"
              />
            </div>
            <div>
              <Label htmlFor="edit-description">Description</Label>
              <Textarea
                id="edit-description"
                value={selectedTask.description}
                onChange={(e) => setSelectedTask(prev => prev ? { ...prev, description: e.target.value } : null)}
                className="focus-ring"
              />
            </div>
            <div>
              <Label htmlFor="edit-status">Status</Label>
              <Select 
                value={selectedTask.status} 
                onValueChange={(value: any) => setSelectedTask(prev => prev ? { ...prev, status: value } : null)}
              >
                <SelectTrigger className="focus-ring">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="not-started">Not Started</SelectItem>
                  <SelectItem value="in-progress">In Progress</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="delayed">Delayed</SelectItem>
                  <SelectItem value="on-hold">On Hold</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => onOpenChange(false)}>
                Cancel
              </Button>
              <Button onClick={onSave} className="btn-gradient">
                Save Changes
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
