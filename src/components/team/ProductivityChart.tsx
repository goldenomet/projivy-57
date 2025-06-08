
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, AreaChart, Area } from "recharts";
import { ProductivityTrend } from "@/types/teamMetrics";
import { TrendingUp } from "lucide-react";

interface ProductivityChartProps {
  trends: ProductivityTrend[];
}

const chartConfig = {
  hours: {
    label: "Hours",
    color: "hsl(var(--primary))",
  },
  tasks: {
    label: "Tasks",
    color: "hsl(var(--secondary))",
  },
  efficiency: {
    label: "Efficiency",
    color: "hsl(var(--accent))",
  },
};

export function ProductivityChart({ trends }: ProductivityChartProps) {
  const formattedData = trends.map(trend => ({
    date: new Date(trend.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
    hours: trend.hours,
    tasks: trend.tasksCompleted,
    efficiency: trend.efficiency
  }));

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <TrendingUp className="h-4 w-4 mr-2" />
            Daily Hours & Tasks
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="h-[300px]">
            <ResponsiveContainer>
              <LineChart data={formattedData}>
                <XAxis 
                  dataKey="date" 
                  tick={{ fontSize: 12 }}
                  tickMargin={5}
                />
                <YAxis tick={{ fontSize: 12 }} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Line 
                  type="monotone" 
                  dataKey="hours" 
                  stroke="var(--color-hours)" 
                  strokeWidth={2}
                  dot={{ r: 4 }}
                />
                <Line 
                  type="monotone" 
                  dataKey="tasks" 
                  stroke="var(--color-tasks)" 
                  strokeWidth={2}
                  dot={{ r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <TrendingUp className="h-4 w-4 mr-2" />
            Efficiency Trend
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="h-[300px]">
            <ResponsiveContainer>
              <AreaChart data={formattedData}>
                <XAxis 
                  dataKey="date" 
                  tick={{ fontSize: 12 }}
                  tickMargin={5}
                />
                <YAxis tick={{ fontSize: 12 }} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Area
                  type="monotone"
                  dataKey="efficiency"
                  stroke="var(--color-efficiency)"
                  fill="var(--color-efficiency)"
                  fillOpacity={0.3}
                />
              </AreaChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  );
}
