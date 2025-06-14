
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { format, addMonths, subMonths } from "date-fns";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Task } from "@/types/project";

interface CalendarMonthViewProps {
  currentMonth: Date;
  selectedDate: Date | undefined;
  onSelectDate: (date: Date | undefined) => void;
  onMonthChange: (date: Date) => void;
  onGoToToday: () => void;
  tasks: Task[];
}

export function CalendarMonthView({
  currentMonth,
  selectedDate,
  onSelectDate,
  onMonthChange,
  onGoToToday,
  tasks
}: CalendarMonthViewProps) {
  const navigateMonth = (direction: 'prev' | 'next') => {
    const newMonth = direction === 'prev' ? subMonths(currentMonth, 1) : addMonths(currentMonth, 1);
    onMonthChange(newMonth);
  };

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
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Button 
          variant="outline" 
          onClick={onGoToToday}
          className="interactive-button hover-glow"
        >
          Today
        </Button>
      </div>
      
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
            onSelect={onSelectDate}
            month={currentMonth}
            onMonthChange={onMonthChange}
            className="pointer-events-auto"
            components={{
              Day: ({ date, ...dayProps }) => {
                const tasksForDay = getTasksForDate(date);
                const hasImportantTasks = tasksForDay.some(task => task.status === 'delayed' || task.status === 'in-progress');
                
                // Extract only button-compatible props and remove DayPicker-specific props
                const { displayMonth, modifiers, ...buttonProps } = dayProps as any;
                
                return (
                  <div className="relative">
                    <button {...buttonProps}>
                      {date.getDate()}
                    </button>
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
    </div>
  );
}
