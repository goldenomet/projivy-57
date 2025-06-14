
import { useEffect, useState } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { mockTasks } from "@/data/mockData";
import { Task } from "@/types/project";
import { format, startOfMonth, endOfMonth } from "date-fns";
import { toast } from "sonner";
import { CalendarPageHeader } from "@/components/calendar/CalendarPageHeader";
import { CalendarStats } from "@/components/calendar/CalendarStats";
import { CalendarMonthView } from "@/components/calendar/CalendarMonthView";
import { CalendarDayView } from "@/components/calendar/CalendarDayView";
import { CalendarEditDialog } from "@/components/calendar/CalendarEditDialog";

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

  const goToToday = () => {
    const today = new Date();
    setCurrentMonth(today);
    setSelectedDate(today);
  };

  const handleAddEvent = () => {
    if (selectedDate) {
      setNewEvent(prev => ({
        ...prev,
        startDate: format(selectedDate, "yyyy-MM-dd"),
        dueDate: format(selectedDate, "yyyy-MM-dd")
      }));
      setIsCreateDialogOpen(true);
    }
  };

  const handleEditTaskClick = (task: Task) => {
    setSelectedTask(task);
    setIsEditDialogOpen(true);
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

  return (
    <AppLayout>
      <div className="space-y-6 animate-fade-in">
        <CalendarPageHeader
          isCreateDialogOpen={isCreateDialogOpen}
          setIsCreateDialogOpen={setIsCreateDialogOpen}
          newEvent={newEvent}
          setNewEvent={setNewEvent}
          onCreateEvent={handleCreateEvent}
        />
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1">
            <CalendarMonthView
              currentMonth={currentMonth}
              selectedDate={selectedDate}
              onSelectDate={setSelectedDate}
              onMonthChange={setCurrentMonth}
              onGoToToday={goToToday}
              tasks={tasks}
            />
            
            <div className="mt-4">
              <CalendarStats monthTasks={monthTasks} />
            </div>
          </div>
          
          <div className="lg:col-span-2">
            <CalendarDayView
              selectedDate={selectedDate}
              dayTasks={dayTasks}
              onAddEvent={handleAddEvent}
              onEditTask={handleEditTaskClick}
            />
          </div>
        </div>

        <CalendarEditDialog
          isOpen={isEditDialogOpen}
          onOpenChange={setIsEditDialogOpen}
          selectedTask={selectedTask}
          setSelectedTask={setSelectedTask}
          onSave={handleEditTask}
        />
      </div>
    </AppLayout>
  );
}
