import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ProjectStatus, TaskStatus } from "@/types/project";
import { CalendarIcon, User, Users, Mail, Clock, Link as LinkIcon, FileText, Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { v4 as uuidv4 } from "uuid";
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose
} from "@/components/ui/dialog";

// List of initial users (this would come from a database in a real app)
const initialUsers = [
  { id: "user1", name: "John Doe", email: "john@example.com" },
  { id: "user2", name: "Jane Smith", email: "jane@example.com" },
  { id: "user3", name: "Bob Johnson", email: "bob@example.com" },
];

export default function ProjectForm() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState<Date | undefined>(new Date());
  const [endDate, setEndDate] = useState<Date | undefined>(new Date());
  const [status, setStatus] = useState<ProjectStatus>("active");
  
  // Task related fields
  const [taskName, setTaskName] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [assignedTo, setAssignedTo] = useState("");
  const [responsibleParty, setResponsibleParty] = useState("");
  const [contacts, setContacts] = useState("");
  const [taskStartDate, setTaskStartDate] = useState<Date | undefined>(new Date());
  const [dueDate, setDueDate] = useState<Date | undefined>(new Date());
  const [duration, setDuration] = useState("1");
  const [dependencies, setDependencies] = useState("");
  const [taskStatus, setTaskStatus] = useState<TaskStatus>("not-started");
  const [remarks, setRemarks] = useState("");
  
  // State for user management
  const [users, setUsers] = useState(initialUsers);
  const [newUserName, setNewUserName] = useState("");
  const [newUserEmail, setNewUserEmail] = useState("");

  // Dialog open state
  const [newUserDialogOpen, setNewUserDialogOpen] = useState(false);

  const addNewUser = () => {
    if (!newUserName.trim() || !newUserEmail.trim()) {
      toast.error("Please provide both name and email for the new user");
      return;
    }
    
    const newUser = {
      id: uuidv4(),
      name: newUserName,
      email: newUserEmail,
    };
    
    setUsers([...users, newUser]);
    setNewUserName("");
    setNewUserEmail("");
    setNewUserDialogOpen(false);
    toast.success(`Added new user: ${newUserName}`);
  };

  console.info("Project data:", {
    name, 
    description, 
    startDate, 
    endDate, 
    status,
    taskName,
    taskDescription,
    assignedTo,
    responsibleParty,
    contacts,
    taskStartDate,
    dueDate,
    duration,
    dependencies,
    taskStatus,
    remarks
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name || !description || !startDate || !endDate) {
      toast.error("Please fill in all required project fields");
      return;
    }

    if (!taskName) {
      toast.error("Task name is required");
      return;
    }

    if (endDate && startDate && endDate < startDate) {
      toast.error("End date cannot be before start date");
      return;
    }

    if (dueDate && taskStartDate && dueDate < taskStartDate) {
      toast.error("Due date cannot be before task start date");
      return;
    }

    // Create a new project with the task
    const projectId = uuidv4();
    const newProject = {
      id: projectId,
      name,
      description,
      startDate: startDate || new Date(),
      endDate: endDate || new Date(),
      status,
      progress: 0, // Default progress
      tasks: [
        {
          id: uuidv4(),
          projectId,
          name: taskName,
          description: taskDescription,
          assignedTo: assignedTo.split(',').map(item => item.trim()),
          responsibleParty,
          contacts: contacts.split(',').map(item => item.trim()),
          startDate: taskStartDate || new Date(),
          dueDate: dueDate || new Date(),
          duration: parseInt(duration, 10) || 1,
          dependencies: dependencies.split(',').map(item => item.trim()),
          status: taskStatus,
          remarks
        }
      ]
    };

    // In a real app, we would save the project to the database
    // For now, let's add it to the mock data stored in localStorage
    const existingProjects = JSON.parse(localStorage.getItem('projects') || '[]');
    const updatedProjects = [...existingProjects, newProject];
    localStorage.setItem('projects', JSON.stringify(updatedProjects));
    
    toast.success("Project created successfully!");
    navigate("/projects");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="space-y-6">
        <h2 className="text-xl font-semibold border-b pb-2">Project Information</h2>
        <div className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium mb-1">
              Project Name *
            </label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter project name"
              required
            />
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-medium mb-1">
              Description *
            </label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter project description"
              rows={4}
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">
                Start Date *
              </label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !startDate && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {startDate ? format(startDate, "PPP") : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={startDate}
                    onSelect={setStartDate}
                    initialFocus
                    className="pointer-events-auto"
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                End Date *
              </label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !endDate && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {endDate ? format(endDate, "PPP") : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={endDate}
                    onSelect={setEndDate}
                    fromDate={startDate}
                    initialFocus
                    className="pointer-events-auto"
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>

          <div>
            <label htmlFor="status" className="block text-sm font-medium mb-1">
              Status
            </label>
            <Select value={status} onValueChange={(value) => setStatus(value as ProjectStatus)}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="on-hold">On Hold</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <h2 className="text-xl font-semibold border-b pb-2 mt-8">Initial Task</h2>
        <div className="space-y-4">
          <div>
            <label htmlFor="taskName" className="block text-sm font-medium mb-1">
              <span className="flex items-center gap-1"><FileText className="h-4 w-4" /> Task Name *</span>
            </label>
            <Input
              id="taskName"
              value={taskName}
              onChange={(e) => setTaskName(e.target.value)}
              placeholder="Enter task name"
              required
            />
          </div>

          <div>
            <label htmlFor="taskDescription" className="block text-sm font-medium mb-1">
              <span className="flex items-center gap-1"><FileText className="h-4 w-4" /> Description</span>
            </label>
            <Textarea
              id="taskDescription"
              value={taskDescription}
              onChange={(e) => setTaskDescription(e.target.value)}
              placeholder="Enter task description"
              rows={3}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="assignedTo" className="block text-sm font-medium mb-1">
                <span className="flex items-center gap-1"><Users className="h-4 w-4" /> Assigned To</span>
              </label>
              <div className="flex">
                <Input
                  id="assignedTo"
                  value={assignedTo}
                  onChange={(e) => setAssignedTo(e.target.value)}
                  placeholder="Enter user IDs, separated by commas"
                  className="flex-1"
                />
                <Dialog open={newUserDialogOpen} onOpenChange={setNewUserDialogOpen}>
                  <DialogTrigger asChild>
                    <Button variant="outline" type="button" size="sm" className="ml-2">
                      <Plus className="h-4 w-4" />
                    </Button>
                  </DialogTrigger>
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
                    </div>
                    <DialogFooter>
                      <DialogClose asChild>
                        <Button variant="outline" type="button">Cancel</Button>
                      </DialogClose>
                      <Button type="button" onClick={addNewUser}>Add User</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
              <div className="mt-2 flex flex-wrap gap-2">
                {users.map(user => (
                  <div 
                    key={user.id}
                    className="border rounded-md p-2 text-sm flex items-center cursor-pointer hover:bg-muted"
                    onClick={() => {
                      const ids = assignedTo ? assignedTo.split(',').map(id => id.trim()) : [];
                      if (!ids.includes(user.id)) {
                        const newAssignees = [...ids, user.id].join(', ');
                        setAssignedTo(newAssignees);
                      }
                    }}
                  >
                    {user.name}
                  </div>
                ))}
              </div>
            </div>

            <div>
              <label htmlFor="responsibleParty" className="block text-sm font-medium mb-1">
                <span className="flex items-center gap-1"><User className="h-4 w-4" /> Responsible Party</span>
              </label>
              <Select value={responsibleParty} onValueChange={(value) => setResponsibleParty(value)}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select responsible person" />
                </SelectTrigger>
                <SelectContent>
                  {users.map(user => (
                    <SelectItem key={user.id} value={user.id}>{user.name}</SelectItem>
                  ))}
                  <DialogTrigger asChild>
                    <Button variant="ghost" className="w-full justify-start px-2 py-1.5 h-auto font-normal text-sm" onClick={() => setNewUserDialogOpen(true)}>
                      <Plus className="h-4 w-4 mr-2" /> Add new user
                    </Button>
                  </DialogTrigger>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <label htmlFor="contacts" className="block text-sm font-medium mb-1">
              <span className="flex items-center gap-1"><Mail className="h-4 w-4" /> Contacts</span>
            </label>
            <div className="flex">
              <Input
                id="contacts"
                value={contacts}
                onChange={(e) => setContacts(e.target.value)}
                placeholder="Enter contacts, separated by commas"
                className="flex-1"
              />
              <Button variant="outline" type="button" size="sm" className="ml-2" onClick={() => setNewUserDialogOpen(true)}>
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            <div className="mt-2 flex flex-wrap gap-2">
              {users.map(user => (
                <div 
                  key={user.id}
                  className="border rounded-md p-2 text-sm flex items-center cursor-pointer hover:bg-muted"
                  onClick={() => {
                    const ids = contacts ? contacts.split(',').map(id => id.trim()) : [];
                    if (!ids.includes(user.id)) {
                      const newContacts = [...ids, user.id].join(', ');
                      setContacts(newContacts);
                    }
                  }}
                >
                  {user.name}
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="duration" className="block text-sm font-medium mb-1">
                <span className="flex items-center gap-1"><Clock className="h-4 w-4" /> Duration (days)</span>
              </label>
              <Input
                id="duration"
                type="number"
                min="1"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                placeholder="Enter duration in days"
              />
            </div>

            <div>
              <label htmlFor="dependencies" className="block text-sm font-medium mb-1">
                <span className="flex items-center gap-1"><LinkIcon className="h-4 w-4" /> Dependencies</span>
              </label>
              <Input
                id="dependencies"
                value={dependencies}
                onChange={(e) => setDependencies(e.target.value)}
                placeholder="Enter dependencies, separated by commas"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="taskStatus" className="block text-sm font-medium mb-1">
                Status
              </label>
              <Select value={taskStatus} onValueChange={(value) => setTaskStatus(value as TaskStatus)}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select status" />
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

            <div>
              <label htmlFor="remarks" className="block text-sm font-medium mb-1">
                <span className="flex items-center gap-1"><FileText className="h-4 w-4" /> Remarks</span>
              </label>
              <Input
                id="remarks"
                value={remarks}
                onChange={(e) => setRemarks(e.target.value)}
                placeholder="Enter any remarks"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-end gap-3">
        <Button variant="outline" type="button" onClick={() => navigate("/projects")}>
          Cancel
        </Button>
        <Button type="submit">Create Project</Button>
      </div>
    </form>
  );
}
