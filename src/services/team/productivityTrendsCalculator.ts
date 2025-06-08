
import { ProductivityTrend } from "@/types/teamMetrics";
import { TimeEntry } from "@/types/timeTracking";

export class ProductivityTrendsCalculator {
  // Generate productivity trends
  static calculateProductivityTrends(timeEntries: TimeEntry[], days: number = 30): ProductivityTrend[] {
    const endDate = new Date();
    const startDate = new Date(endDate.getTime() - (days * 24 * 60 * 60 * 1000));

    const trends: ProductivityTrend[] = [];
    
    for (let i = 0; i < days; i++) {
      const date = new Date(startDate.getTime() + (i * 24 * 60 * 60 * 1000));
      const dateString = date.toISOString().split('T')[0];
      
      const dayEntries = timeEntries.filter(entry => {
        const entryDate = new Date(entry.start_time).toISOString().split('T')[0];
        return entryDate === dateString && entry.duration_minutes;
      });

      const totalMinutes = dayEntries.reduce((sum, entry) => sum + (entry.duration_minutes || 0), 0);
      const hours = Math.round((totalMinutes / 60) * 100) / 100;
      const tasksCompleted = dayEntries.length;
      const efficiency = tasksCompleted > 0 ? Math.round((hours / tasksCompleted) * 100) / 100 : 0;

      trends.push({
        date: dateString,
        hours,
        tasksCompleted,
        efficiency
      });
    }

    return trends;
  }
}
