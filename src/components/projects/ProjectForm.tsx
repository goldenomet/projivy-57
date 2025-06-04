
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ProjectTemplate } from "@/types/templates";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
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
  DialogFooter,
  DialogClose
} from "@/components/ui/dialog";

interface ProjectFormProps {
  onFormSubmitting?: (isSubmitting: boolean) => void;
  selectedTemplate?: ProjectTemplate | null;
}

export default function ProjectForm({ onFormSubmitting, selectedTemplate }: ProjectFormProps) {
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
  
  // State for user management - start with empty array
  const [users, setUsers] = useState<Array<{id: string; name: string; email: string}>>([]);
  const [newUserName, setNewUserName] = useState("");
  const [newUserEmail, setNewUserEmail] = useState("");
  const [newUserDialogOpen, setNewUserDialogOpen] = useState(false);

  // Effect to populate form with template data
  useEffect(() => {
    if (selectedTemplate) {
      setName(selectedTemplate.name);
      setDescription(selectedTemplate.description);
      setStatus(selectedTemplate.defaultStatus);
      
      // Set end date based on estimated duration
      const calculatedEndDate = new Date();
      calculatedEndDate.setDate(calculatedEndDate.getDate() + selectedTemplate.estimatedDuration);
      setEndDate(calculatedEndDate);
      
      // Set first task if template has tasks
      if (selectedTemplate.tasks.length > 0) {
        const firstTask = selectedTemplate.tasks[0];
        setTaskName(firstTask.name);
        setTaskDescription(firstTask.description);
        setDuration(firstTask.duration.toString());
        setDependencies(firstTask.dependencies.join(', '));
        setTaskStatus(firstTask.status);
        setRemarks(firstTask.remarks);
        
        // Set task due date based on duration
        const taskDueDate = new Date();
        taskDueDate.setDate(taskDueDate.getDate() + firstTask.duration);
        setDueDate(taskDueDate);
      }
    }
  }, [selectedTemplate]);

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

  const handleSubmit = async (e: React.FormEvent) => {
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

    try {
      if (onFormSubmitting) {
        onFormSubmitting(true);
      }
      
      // Create a new project with the task(s)
      const projectId = uuidv4();
      
      // If using a template, create all template tasks
      let projectTasks = [];
      if (selectedTemplate && selectedTemplate.tasks.length > 0) {
        projectTasks = selectedTemplate.tasks.map((taskTemplate, index) => {
          const taskStartDate = new Date();
          taskStartDate.setDate(taskStartDate.getDate() + (index * 2)); // Stagger start dates
          
          const taskDueDate = new Date(taskStartDate);
          taskDueDate.setDate(taskDueDate.getDate() + taskTemplate.duration);
          
          return {
            id: uuidv4(),
            projectId,
            name: taskTemplate.name,
            description: taskTemplate.description,
            assignedTo: [],
            responsibleParty: "",
            contacts: [],
            startDate: taskStartDate,
            dueDate: taskDueDate,
            duration: taskTemplate.duration,
            dependencies: taskTemplate.dependencies,
            status: taskTemplate.status,
            remarks: taskTemplate.remarks
          };
        });
      } else {
        // Create single task from form
        projectTasks = [{
          id: uuidv4(),
          projectId,
          name: taskName,
          description: taskDescription,
          assignedTo: assignedTo.split(',').map(item => item.trim()).filter(Boolean),
          responsibleParty,
          contacts: contacts.split(',').map(item => item.trim()).filter(Boolean),
          startDate: taskStartDate || new Date(),
          dueDate: dueDate || new Date(),
          duration: parseInt(duration, 10) || 1,
          dependencies: dependencies.split(',').map(item => item.trim()).filter(Boolean),
          status: taskStatus,
          remarks
        }];
      }

      const newProject = {
        id: projectId,
        name,
        description,
        startDate: startDate || new Date(),
        endDate: endDate || new Date(),
        status,
        progress: 0,
        tasks: projectTasks
      };

      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Save to localStorage
      const existingProjects = JSON.parse(localStorage.getItem('projects') || '[]');
      const updatedProjects = [...existingProjects, newProject];
      localStorage.setItem('projects', JSON.stringify(updatedProjects));
      
      toast.success(selectedTemplate ? `${selectedTemplate.name} created successfully!` : "Project created successfully!");
      
      // Simulate a bit more delay before navigation
      await new Promise(resolve => setTimeout(resolve, 500));
      
      if (onFormSubmitting) {
        onFormSubmitting(false);
      }
      
      navigate("/projects");
    } catch (error) {
      console.error("Error creating project:", error);
      toast.error("Failed to create project");
      if (onFormSubmitting) {
        onFormSubmitting(false);
      }
    }
  };

  // Create a separate Dialog for adding new users
  const addUserDialog = (
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
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline" type="button">Cancel</Button>
          </DialogClose>
          <Button type="button" onClick={addNewUser}>Add User</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {addUserDialog}
      
      {selectedTemplate && (
        <div className="bg-gradient-to-r from-primary/10 to-purple-500/10 border border-primary/20 rounded-lg p-4 mb-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="text-primary font-medium">Template: {selectedTemplate.name}</div>
            <Badge variant="secondary">{selectedTemplate.category}</Badge>
          </div>
          <p className="text-sm text-muted-foreground mb-2">{selectedTemplate.description}</p>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <span className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              {selectedTemplate.estimatedDuration} days
            </span>
            <span className="flex items-center gap-1">
              <FileText className="h-3 w-3" />
              {selectedTemplate.tasks.length} tasks
            </span>
          </div>
        </div>
      )}

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
              className="bg-gradient-to-br from-card to-background focus:ring-2 focus:ring-primary/30 transition-all"
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
              className="bg-gradient-to-br from-card to-background focus:ring-2 focus:ring-primary/30 transition-all"
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
                      "w-full justify-start text-left font-normal bg-gradient-to-br from-card to-background hover:bg-gradient-to-br hover:from-background hover:to-card/80 transition-all",
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
                      "w-full justify-start text-left font-normal bg-gradient-to-br from-card to-background hover:bg-gradient-to-br hover:from-background hover:to-card/80 transition-all",
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
              <SelectTrigger className="w-full bg-gradient-to-br from-card to-background focus:ring-2 focus:ring-primary/30 transition-all">
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent className="bg-gradient-to-br from-popover to-popover/95 backdrop-blur-sm">
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
              className="bg-gradient-to-br from-card to-background focus:ring-2 focus:ring-primary/30 transition-all"
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
              className="bg-gradient-to-br from-card to-background focus:ring-2 focus:ring-primary/30 transition-all"
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
                  className="flex-1 bg-gradient-to-br from-card to-background focus:ring-2 focus:ring-primary/30 transition-all"
                />
                <Button 
                  variant="outline" 
                  type="button" 
                  size="sm" 
                  className="ml-2 hover:bg-gradient-to-r hover:from-accent/50 hover:to-accent/30 transition-all"
                  onClick={() => setNewUserDialogOpen(true)}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              {users.length > 0 && (
                <div className="mt-2 flex flex-wrap gap-2">
                  {users.map(user => (
                    <div 
                      key={user.id}
                      className="border rounded-md p-2 text-sm flex items-center cursor-pointer hover:bg-muted transition-colors"
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
              )}
            </div>

            <div>
              <label htmlFor="responsibleParty" className="block text-sm font-medium mb-1">
                <span className="flex items-center gap-1"><User className="h-4 w-4" /> Responsible Party</span>
              </label>
              <Select value={responsibleParty} onValueChange={(value) => setResponsibleParty(value)}>
                <SelectTrigger className="w-full bg-gradient-to-br from-card to-background focus:ring-2 focus:ring-primary/30 transition-all">
                  <SelectValue placeholder="Select responsible person" />
                </SelectTrigger>
                <SelectContent className="bg-gradient-to-br from-popover to-popover/95 backdrop-blur-sm">
                  {users.map(user => (
                    <SelectItem key={user.id} value={user.id}>{user.name}</SelectItem>
                  ))}
                  <Button 
                    variant="ghost" 
                    className="w-full justify-start px-2 py-1.5 h-auto font-normal text-sm hover:bg-accent/50 transition-colors"
                    onClick={() => setNewUserDialogOpen(true)}
                    type="button"
                  >
                    <Plus className="h-4 w-4 mr-2" /> Add new user
                  </Button>
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
                className="flex-1 bg-gradient-to-br from-card to-background focus:ring-2 focus:ring-primary/30 transition-all"
              />
              <Button 
                variant="outline" 
                type="button" 
                size="sm" 
                className="ml-2 hover:bg-gradient-to-r hover:from-accent/50 hover:to-accent/30 transition-all"
                onClick={() => setNewUserDialogOpen(true)}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            {users.length > 0 && (
              <div className="mt-2 flex flex-wrap gap-2">
                {users.map(user => (
                  <div 
                    key={user.id}
                    className="border rounded-md p-2 text-sm flex items-center cursor-pointer hover:bg-muted transition-colors"
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
            )}
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
                className="bg-gradient-to-br from-card to-background focus:ring-2 focus:ring-primary/30 transition-all"
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
                className="bg-gradient-to-br from-card to-background focus:ring-2 focus:ring-primary/30 transition-all"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="taskStatus" className="block text-sm font-medium mb-1">
                Status
              </label>
              <Select value={taskStatus} onValueChange={(value) => setTaskStatus(value as TaskStatus)}>
                <SelectTrigger className="w-full bg-gradient-to-br from-card to-background focus:ring-2 focus:ring-primary/30 transition-all">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent className="bg-gradient-to-br from-popover to-popover/95 backdrop-blur-sm">
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
                className="bg-gradient-to-br from-card to-background focus:ring-2 focus:ring-primary/30 transition-all"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-end gap-3">
        <Button 
          variant="outline" 
          type="button" 
          onClick={() => navigate("/projects")}
          className="hover:bg-gradient-to-r hover:from-accent/50 hover:to-accent/30 transition-all"
        >
          Cancel
        </Button>
        <Button 
          type="submit"
          className="bg-gradient-to-r from-primary to-purple-500 hover:opacity-90 shadow-md hover:shadow-lg transition-all"
        >
          {selectedTemplate ? `Create ${selectedTemplate.name}` : "Create Project"}
        </Button>
      </div>
    </form>
  );
}
