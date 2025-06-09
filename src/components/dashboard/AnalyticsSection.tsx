
import { useState } from "react";
import { Project, Task } from "@/types/project";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line, Area, AreaChart } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface AnalyticsSectionProps {
  projects: Project[];
  tasks: Task[];
  isPreview?: boolean;
}

export function AnalyticsSection({ projects, tasks, isPreview = false }: AnalyticsSectionProps) {
  const [activeTab, setActiveTab] = useState<string>("progress");
  
  // Calculate data for project progress chart
  const projectProgressData = projects.map(project => ({
    name: project.name.length > 12 ? project.name.substring(0, 12) + '...' : project.name,
    progress: project.progress || 0
  }));

  // Calculate task status distribution
  const allTasks = projects.flatMap(p => p.tasks || []).concat(tasks);
  const statusCounts = allTasks.reduce((acc: Record<string, number>, task) => {
    acc[task.status] = (acc[task.status] || 0) + 1;
    return acc;
  }, {});
  
  const taskStatusData = Object.entries(statusCounts).map(([status, count]) => ({
    name: status.charAt(0).toUpperCase() + status.slice(1),
    value: count
  }));

  // Generate timeline data
  const timelineData = projects.map(project => {
    const startDate = new Date(project.startDate);
    const endDate = new Date(project.endDate);
    const today = new Date();
    const totalDays = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
    const daysElapsed = Math.ceil((today.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
    const timeProgress = Math.min(Math.max((daysElapsed / totalDays) * 100, 0), 100);
    
    return {
      name: project.name.length > 10 ? project.name.substring(0, 10) + '...' : project.name,
      progress: project.progress || 0,
      timeProgress: Math.round(timeProgress),
      variance: Math.round((project.progress || 0) - timeProgress)
    };
  });

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];
  
  return (
    <div className={`space-y-6 ${isPreview ? 'filter blur-[1px] pointer-events-none' : ''}`}>
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold tracking-tight">Analytics Dashboard</h2>
        {!isPreview && (
          <div className="text-sm text-muted-foreground">
            Real-time insights into your project performance
          </div>
        )}
      </div>

      <Tabs 
        value={activeTab} 
        onValueChange={setActiveTab}
        className="w-full"
      >
        <TabsList className="grid grid-cols-3 mb-4">
          <TabsTrigger value="progress">Project Progress</TabsTrigger>
          <TabsTrigger value="status">Task Status</TabsTrigger>
          <TabsTrigger value="timeline">Timeline Analysis</TabsTrigger>
        </TabsList>
        
        <TabsContent value="progress" className="space-y-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium">Project Progress Overview</CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={projectProgressData}
                    margin={{ top: 20, right: 30, left: 20, bottom: 60 }}
                  >
                    <XAxis 
                      dataKey="name" 
                      angle={-45}
                      textAnchor="end"
                      height={80}
                      tick={{ fontSize: 12 }}
                    />
                    <YAxis 
                      label={{ value: 'Completion %', angle: -90, position: 'insideLeft', style: { textAnchor: 'middle' } }}
                      domain={[0, 100]}
                    />
                    <Tooltip formatter={(value) => [`${value}%`, 'Progress']} />
                    <Bar 
                      dataKey="progress" 
                      fill="#8884d8" 
                      radius={[4, 4, 0, 0]}
                      background={{ fill: '#eee' }}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="status" className="space-y-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium">Task Status Distribution</CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="h-[300px] w-full flex items-center justify-center">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={taskStatusData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {taskStatusData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => [value, 'Tasks']} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="timeline" className="space-y-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium">Project Timeline Analysis</CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={timelineData} margin={{ top: 20, right: 30, left: 20, bottom: 60 }}>
                    <XAxis 
                      dataKey="name" 
                      angle={-45}
                      textAnchor="end"
                      height={80}
                      tick={{ fontSize: 12 }}
                    />
                    <YAxis 
                      label={{ value: 'Progress %', angle: -90, position: 'insideLeft', style: { textAnchor: 'middle' } }}
                      domain={[0, 100]}
                    />
                    <Tooltip 
                      formatter={(value, name) => {
                        if (name === 'progress') return [`${value}%`, 'Work Progress'];
                        if (name === 'timeProgress') return [`${value}%`, 'Time Progress'];
                        return [`${value}%`, name];
                      }} 
                    />
                    <Line 
                      type="monotone" 
                      dataKey="progress" 
                      stroke="#8884d8" 
                      strokeWidth={2}
                      dot={{ r: 4 }}
                      name="progress"
                    />
                    <Line 
                      type="monotone" 
                      dataKey="timeProgress" 
                      stroke="#82ca9d" 
                      strokeWidth={2}
                      dot={{ r: 4 }}
                      strokeDasharray="5 5"
                      name="timeProgress"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-0.5 bg-[#8884d8]"></div>
                    <span>Work Progress</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-0.5 bg-[#82ca9d] border-dashed border-t"></div>
                    <span>Time Progress</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
      {isPreview && (
        <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none opacity-0 hover:opacity-100 transition-opacity">
          <div className="bg-card/80 p-6 rounded-lg backdrop-blur-sm">
            <p className="text-lg font-bold">Premium Feature</p>
            <p>Upgrade to access detailed analytics</p>
          </div>
        </div>
      )}
    </div>
  );
}
