
import { useEffect, useState } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { mockTasks } from "@/data/mockData";
import { Task } from "@/types/project";
import { Calendar } from "@/components/ui/calendar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
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
import { format, addMonths, subMonths, startOfMonth, endOfMonth, isSameMonth } from "date-fns";
import { CalendarPlus, ChevronLeft, ChevronRight, Edit, Plus } from "lucide-react";
import { toast } from "sonner";

export default function CalendarPage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [dayTasks, setDayTasks] = useState<Task[]>([]);
  const [currentMonth, setCurrentMonth] = useState<Date>(new Date());
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [newEvent, setNewEvent] = useState({
    name: "",
    description: "",
    startDate: "",
    dueDate: "",
    status: "not-started" as const,
  });

  useEffect(() => {
    // Simulate data loading with smooth animation
    setTimeout(() => {
      setTasks(mockTasks);
    }, 300);
  }, []);

  useEffect(() => {
    // Filter tasks for selected date
    if (selectedDate && tasks.length > 0) {
      const tasksOnDay = tasks.filter((task) => {
        const taskStartDate = new Date(task.startDate);
        const taskDueDate = new Date(task.dueDate);
        const selected = new Date(selectedDate);
        
        // Reset time components for date comparison
        const taskStart = new Date(taskStartDate.getFullYear(), taskStartDate.getMonth(), taskStartDate.getDate());
        const taskEnd = new Date(taskDueDate.getFullYear(), taskDueDate.getMonth(), taskDueDate.getDate());
        const selectedDay = new Date(selected.getFullYear(), selected.getMonth(), selected.getDate());
        
        return taskStart <= selectedDay && taskEnd >= selectedDay;
      });
      setDayTasks(tasksOnDay);
    }
  }, [selectedDate, tasks]);

  const getTaskStatusColor = (status: string) => {
    switch (status) {
      case "not-started":
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200";
      case "in-progress":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200";
      case "completed":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
      case "delayed":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200";
      case "on-hold":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200";
      case "cancelled":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200";
    }
  };

  const handleCreateEvent = () => {
    if (!newEvent.name || !newEvent.startDate || !newEvent.dueDate) {
      toast.error("Please fill in all required fields");
      return;
    }

    const newTask: Task = {
      id: `task-${Date.now()}`,
      projectId: "calendar-events",
      name: newEvent.name,
      description: newEvent.description,
      assignedTo: [],
      responsibleParty: "current-user",
      contacts: [],
      startDate: new Date(newEvent.startDate),
      dueDate: new Date(newEvent.dueDate),
      duration: Math.ceil((new Date(newEvent.dueDate).getTime() - new Date(newEvent.startDate).getTime()) / (1000 * 60 * 60 * 24)),
      dependencies: [],
      status: newEvent.status,
      remarks: "",
    };

    setTasks(prev => [...prev, newTask]);
    setNewEvent({ name: "", description: "", startDate: "", dueDate: "", status: "not-started" });
    setIsCreateDialogOpen(false);
    toast.success("Event created successfully!");
  };

  const handleEditTask = () => {
    if (!selectedTask) return;

    const updatedTasks = tasks.map(task => 
      task.id === selectedTask.id ? selectedTask : task
    );
    setTasks(updatedTasks);
    setIsEditDialogOpen(false);
    setSelectedTask(null);
    toast.success("Task updated successfully!");
  };

  const navigateMonth = (direction: 'prev' | 'next') => {
    setCurrentMonth(prev => 
      direction === 'prev' ? subMonths(prev, 1) : addMonths(prev, 1)
    );
  };

  const goToToday = () => {
    const today = new Date();
    setCurrentMonth(today);
    setSelectedDate(today);
  };

  // Get tasks for the current month to show indicators
  const monthTasks = tasks.filter(task => {
    const taskStart = new Date(task.startDate);
    const taskEnd = new Date(task.dueDate);
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(currentMonth);
    
    return (taskStart >= monthStart && taskStart <= monthEnd) ||
           (taskEnd >= monthStart && taskEnd <= monthEnd) ||
           (taskStart <= monthStart && taskEnd >= monthEnd);
  });

  const getTasksForDate = (date: Date) => {
    return tasks.filter(task => {
      const taskStart = new Date(task.startDate);
      const taskEnd = new Date(task.dueDate);
      const checkDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());
      const taskStartDay = new Date(taskStart.getFullYear(), taskStart.getMonth(), taskStart.getDate());
      const taskEndDay = new Date(taskEnd.getFullYear(), taskEnd.getMonth(), taskEnd.getDate());
      
      return taskStartDay <= checkDate && taskEndDay >= checkDate;
    });
  };

  return (
    <AppLayout>
      <div className="space-y-6 animate-fade-in">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
              Calendar
            </h1>
            <p className="text-muted-foreground">Manage your schedule and track project deadlines</p>
          </div>
          
          <div className="flex items-center gap-2">
            <Button 
              variant="outline" 
              onClick={goToToday}
              className="interactive-button hover-glow"
            >
              Today
            </Button>
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
                    <Button onClick={handleCreateEvent} className="btn-gradient">
                      Create Event
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1">
            <Card className="card-gradient">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">{format(currentMonth, "MMMM yyyy")}</CardTitle>
                  <div className="flex items-center gap-1">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => navigateMonth('prev')}
                      className="h-8 w-8 p-0 hover-scale"
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => navigateMonth('next')}
                      className="h-8 w-8 p-0 hover-scale"
                    >
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-3">
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  month={currentMonth}
                  onMonthChange={setCurrentMonth}
                  className="pointer-events-auto"
                  components={{
                    Day: ({ date, ...buttonProps }) => {
                      const tasksForDay = getTasksForDate(date);
                      const hasImportantTasks = tasksForDay.some(task => task.status === 'delayed' || task.status === 'in-progress');
                      
                      return (
                        <div className="relative">
                          <button {...buttonProps} />
                          {tasksForDay.length > 0 && (
                            <div className={`absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 rounded-full ${
                              hasImportantTasks ? 'bg-red-500' : 'bg-primary'
                            }`} />
                          )}
                        </div>
                      );
                    }
                  }}
                />
              </CardContent>
            </Card>
            
            <Card className="card-gradient mt-4">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium">Quick Stats</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Total Tasks</span>
                  <Badge variant="outline">{monthTasks.length}</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Completed</span>
                  <Badge className="bg-green-100 text-green-800">
                    {monthTasks.filter(t => t.status === 'completed').length}
                  </Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">In Progress</span>
                  <Badge className="bg-blue-100 text-blue-800">
                    {monthTasks.filter(t => t.status === 'in-progress').length}
                  </Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Delayed</span>
                  <Badge className="bg-red-100 text-red-800">
                    {monthTasks.filter(t => t.status === 'delayed').length}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="lg:col-span-2">
            <Card className="card-gradient">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>
                    {selectedDate ? format(selectedDate, "EEEE, MMMM d, yyyy") : "Select a date"}
                  </span>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="animate-pulse-soft">
                      {dayTasks.length} {dayTasks.length === 1 ? 'Task' : 'Tasks'}
                    </Badge>
                    {selectedDate && (
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => {
                          setNewEvent(prev => ({
                            ...prev,
                            startDate: format(selectedDate, "yyyy-MM-dd"),
                            dueDate: format(selectedDate, "yyyy-MM-dd")
                          }));
                          setIsCreateDialogOpen(true);
                        }}
                        className="interactive-button"
                      >
                        <Plus className="h-3 w-3 mr-1" />
                        Add Event
                      </Button>
                    )}
                  </div>
                </CardTitle>
                <CardDescription>
                  {dayTasks.length > 0 ? "Tasks and events scheduled for this day" : "No tasks scheduled for this day"}
                </CardDescription>
              </CardHeader>
              <CardContent>
                {dayTasks.length > 0 ? (
                  <div className="space-y-3">
                    {dayTasks.map((task, index) => (
                      <div 
                        key={task.id} 
                        className="interactive-card p-4 border rounded-lg hover:bg-muted/30 group animate-fade-in"
                        style={{ animationDelay: `${index * 0.1}s` }}
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <h3 className="font-medium text-sm">{task.name}</h3>
                              <Badge 
                                className={`${getTaskStatusColor(task.status)} text-xs transition-colors`}
                              >
                                {task.status.replace("-", " ")}
                              </Badge>
                            </div>
                            {task.description && (
                              <p className="text-xs text-muted-foreground mb-3 line-clamp-2">
                                {task.description}
                              </p>
                            )}
                            
                            <div className="grid grid-cols-2 gap-3 text-xs">
                              <div className="flex items-center gap-1">
                                <span className="text-muted-foreground">Project:</span>
                                <span className="font-medium">{task.projectId}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <span className="text-muted-foreground">Duration:</span>
                                <span>{task.duration} days</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <span className="text-muted-foreground">Start:</span>
                                <span>{format(task.startDate, "MMM d")}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <span className="text-muted-foreground">Due:</span>
                                <span>{format(task.dueDate, "MMM d")}</span>
                              </div>
                            </div>
                          </div>
                          
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => {
                              setSelectedTask(task);
                              setIsEditDialogOpen(true);
                            }}
                            className="opacity-0 group-hover:opacity-100 transition-opacity interactive-button ml-2"
                          >
                            <Edit className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="py-16 flex flex-col items-center justify-center text-center space-y-4">
                    <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center animate-bounce-gentle">
                      <CalendarPlus className="h-6 w-6 text-muted-foreground" />
                    </div>
                    <div>
                      <p className="text-muted-foreground mb-2">No tasks scheduled for this day</p>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => {
                          if (selectedDate) {
                            setNewEvent(prev => ({
                              ...prev,
                              startDate: format(selectedDate, "yyyy-MM-dd"),
                              dueDate: format(selectedDate, "yyyy-MM-dd")
                            }));
                            setIsCreateDialogOpen(true);
                          }
                        }}
                        className="interactive-button"
                      >
                        <Plus className="h-3 w-3 mr-1" />
                        Create your first event
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Edit Task Dialog */}
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
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
                  <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleEditTask} className="btn-gradient">
                    Save Changes
                  </Button>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </AppLayout>
  );
}
