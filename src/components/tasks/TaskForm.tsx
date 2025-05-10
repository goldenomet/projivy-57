import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { format } from "date-fns";
import { CalendarIcon, Plus } from "lucide-react";
import { Task, User } from "@/types/project";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { users } from "@/data/mockData";
import { toast } from "@/hooks/use-toast";
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose
} from "@/components/ui/dialog";
import { v4 as uuidv4 } from "uuid";

const taskSchema = z.object({
  name: z.string().min(1, { message: "Task name is required" }),
  description: z.string(),
  assignedTo: z.array(z.string()),
  responsibleParty: z.string(),
  contacts: z.array(z.string()),
  startDate: z.date(),
  dueDate: z.date(),
  duration: z.number().min(1),
  dependencies: z.array(z.string()),
  status: z.enum(["not-started", "in-progress", "completed", "delayed", "on-hold", "cancelled"]),
  remarks: z.string(),
});

type TaskFormValues = z.infer<typeof taskSchema>;

interface TaskFormProps {
  task?: Task;
  projectId: string;
  existingTasks?: Task[];
  onSubmit: (task: TaskFormValues) => void;
  onCancel: () => void;
}

export function TaskForm({ task, projectId, existingTasks = [], onSubmit, onCancel }: TaskFormProps) {
  const [selectedAssignees, setSelectedAssignees] = useState<string[]>(task?.assignedTo || []);
  const [selectedContacts, setSelectedContacts] = useState<string[]>(task?.contacts || []);
  const [selectedDependencies, setSelectedDependencies] = useState<string[]>(task?.dependencies || []);
  
  // State for managing users
  const [availableUsers, setAvailableUsers] = useState<User[]>(users);
  const [newUserDialogOpen, setNewUserDialogOpen] = useState(false);
  const [newUserName, setNewUserName] = useState("");
  const [newUserEmail, setNewUserEmail] = useState("");
  const [newUserRole, setNewUserRole] = useState("team-member");

  const form = useForm<TaskFormValues>({
    resolver: zodResolver(taskSchema),
    defaultValues: {
      name: task?.name || "",
      description: task?.description || "",
      assignedTo: task?.assignedTo || [],
      responsibleParty: task?.responsibleParty || "",
      contacts: task?.contacts || [],
      startDate: task?.startDate || new Date(),
      dueDate: task?.dueDate || new Date(),
      duration: task?.duration || 1,
      dependencies: task?.dependencies || [],
      status: task?.status || "not-started",
      remarks: task?.remarks || "",
    },
  });

  const handleSubmit = (values: TaskFormValues) => {
    // Calculate duration automatically
    const startDate = values.startDate;
    const dueDate = values.dueDate;
    const diffTime = Math.abs(dueDate.getTime() - startDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1; // +1 to include start day
    
    values.duration = diffDays;
    values.assignedTo = selectedAssignees;
    values.contacts = selectedContacts;
    values.dependencies = selectedDependencies;
    
    onSubmit(values);
    
    toast({
      title: task ? "Task Updated" : "Task Created",
      description: `"${values.name}" has been ${task ? "updated" : "added"} successfully.`,
    });
  };

  const handleAssigneeChange = (userId: string) => {
    setSelectedAssignees(prev => 
      prev.includes(userId)
        ? prev.filter(id => id !== userId)
        : [...prev, userId]
    );
  };

  const handleContactChange = (userId: string) => {
    setSelectedContacts(prev => 
      prev.includes(userId)
        ? prev.filter(id => id !== userId)
        : [...prev, userId]
    );
  };

  const handleDependencyChange = (taskId: string) => {
    setSelectedDependencies(prev => 
      prev.includes(taskId)
        ? prev.filter(id => id !== taskId)
        : [...prev, taskId]
    );
  };

  const addNewUser = () => {
    if (!newUserName.trim() || !newUserEmail.trim()) {
      toast({
        title: "Error",
        description: "Please provide both name and email for the new user",
        variant: "destructive",
      });
      return;
    }
    
    const newUser = {
      id: uuidv4(),
      name: newUserName,
      email: newUserEmail,
      role: newUserRole,
      avatarUrl: `https://api.dicebear.com/7.x/avataaars/svg?seed=${uuidv4()}`,
    };
    
    setAvailableUsers([...availableUsers, newUser]);
    setNewUserName("");
    setNewUserEmail("");
    setNewUserRole("team-member");
    setNewUserDialogOpen(false);
    
    toast({
      title: "Success",
      description: `Added new user: ${newUserName}`,
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Task Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter task name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="status"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Status</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="not-started">Not Started</SelectItem>
                    <SelectItem value="in-progress">In Progress</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                    <SelectItem value="delayed">Delayed</SelectItem>
                    <SelectItem value="on-hold">On Hold</SelectItem>
                    <SelectItem value="cancelled">Cancelled</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem className="col-span-1 md:col-span-2">
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Enter task description"
                    className="min-h-[100px]"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="col-span-1 md:col-span-2">
            <FormLabel className="block mb-2">Assigned To</FormLabel>
            <div className="flex items-center gap-2 mb-2">
              <Button 
                type="button" 
                variant="outline" 
                size="sm" 
                onClick={() => setNewUserDialogOpen(true)}
              >
                <Plus className="h-4 w-4 mr-2" /> Add New User
              </Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {availableUsers.map((user) => (
                <div
                  key={user.id}
                  onClick={() => handleAssigneeChange(user.id)}
                  className={cn(
                    "flex items-center gap-2 p-2 border rounded-md cursor-pointer",
                    selectedAssignees.includes(user.id)
                      ? "border-primary bg-primary/10"
                      : "border-border hover:border-primary/50"
                  )}
                >
                  <div className="h-8 w-8 rounded-full overflow-hidden">
                    <img
                      src={user.avatarUrl}
                      alt={user.name}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <span>{user.name}</span>
                </div>
              ))}
            </div>
          </div>

          <FormField
            control={form.control}
            name="responsibleParty"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Responsible Party</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select responsible person" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {availableUsers.map((user) => (
                      <SelectItem key={user.id} value={user.id}>
                        {user.name}
                      </SelectItem>
                    ))}
                    <Button 
                      variant="ghost"
                      className="w-full justify-start px-2 py-1.5 h-auto font-normal text-sm"
                      onClick={() => setNewUserDialogOpen(true)}
                    >
                      <Plus className="h-4 w-4 mr-2" /> Add new user
                    </Button>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="col-span-1 md:col-span-2">
            <FormLabel className="block mb-2">Contacts</FormLabel>
            <div className="flex items-center gap-2 mb-2">
              <Button 
                type="button" 
                variant="outline" 
                size="sm" 
                onClick={() => setNewUserDialogOpen(true)}
              >
                <Plus className="h-4 w-4 mr-2" /> Add New Contact
              </Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {availableUsers.map((user) => (
                <div
                  key={user.id}
                  onClick={() => handleContactChange(user.id)}
                  className={cn(
                    "flex items-center gap-2 p-2 border rounded-md cursor-pointer",
                    selectedContacts.includes(user.id)
                      ? "border-primary bg-primary/10"
                      : "border-border hover:border-primary/50"
                  )}
                >
                  <div className="h-8 w-8 rounded-full overflow-hidden">
                    <img
                      src={user.avatarUrl}
                      alt={user.name}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <span>{user.name}</span>
                </div>
              ))}
            </div>
          </div>

          <FormField
            control={form.control}
            name="startDate"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Start Date</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value ? (
                          format(field.value, "PPP")
                        ) : (
                          <span>Pick a date</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      initialFocus
                      className={cn("p-3 pointer-events-auto")}
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="dueDate"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Due Date</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value ? (
                          format(field.value, "PPP")
                        ) : (
                          <span>Pick a date</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      initialFocus
                      className={cn("p-3 pointer-events-auto")}
                    />
                  </PopoverContent>
                </Popover>
                <FormDescription>
                  Duration will be automatically calculated
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          {existingTasks.length > 0 && (
            <div className="col-span-1 md:col-span-2">
              <FormLabel className="block mb-2">Dependencies</FormLabel>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
                {existingTasks
                  .filter((t) => t.id !== task?.id)
                  .map((t) => (
                    <div
                      key={t.id}
                      onClick={() => handleDependencyChange(t.id)}
                      className={cn(
                        "p-2 border rounded-md cursor-pointer",
                        selectedDependencies.includes(t.id)
                          ? "border-primary bg-primary/10"
                          : "border-border hover:border-primary/50"
                      )}
                    >
                      <span>{t.name}</span>
                    </div>
                  ))}
              </div>
            </div>
          )}

          <FormField
            control={form.control}
            name="remarks"
            render={({ field }) => (
              <FormItem className="col-span-1 md:col-span-2">
                <FormLabel>Remarks</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Add any additional notes or comments"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Dialog open={newUserDialogOpen} onOpenChange={setNewUserDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New User</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div>
                <label htmlFor="newUserName" className="block text-sm font-medium mb-1">Name</label>
                <Input
                  id="newUserName"
                  value={newUserName}
                  onChange={(e) => setNewUserName(e.target.value)}
                  placeholder="Enter user name"
                />
              </div>
              <div>
                <label htmlFor="newUserEmail" className="block text-sm font-medium mb-1">Email</label>
                <Input
                  id="newUserEmail"
                  value={newUserEmail}
                  onChange={(e) => setNewUserEmail(e.target.value)}
                  placeholder="Enter user email"
                />
              </div>
              <div>
                <label htmlFor="newUserRole" className="block text-sm font-medium mb-1">Role</label>
                <Select value={newUserRole} onValueChange={setNewUserRole}>
                  <SelectTrigger id="newUserRole">
                    <SelectValue placeholder="Select a role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="project-manager">Project Manager</SelectItem>
                    <SelectItem value="team-lead">Team Lead</SelectItem>
                    <SelectItem value="team-member">Team Member</SelectItem>
                    <SelectItem value="client">Client</SelectItem>
                    <SelectItem value="stakeholder">Stakeholder</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline" type="button">Cancel</Button>
              </DialogClose>
              <Button type="button" onClick={addNewUser}>Add User</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <div className="flex justify-end space-x-2">
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="submit">{task ? "Update Task" : "Create Task"}</Button>
        </div>
      </form>
    </Form>
  );
}
