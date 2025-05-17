
import { useState } from "react";
import { Project, Task } from "@/types/project";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
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

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];
  
  return (
    <div className={`space-y-6 ${isPreview ? 'filter blur-[1px]' : ''}`}>
      <Tabs 
        value={activeTab} 
        onValueChange={setActiveTab}
        className="w-full"
      >
        <TabsList className="grid grid-cols-3 mb-4">
          <TabsTrigger value="progress">Project Progress</TabsTrigger>
          <TabsTrigger value="status">Task Status</TabsTrigger>
          <TabsTrigger value="timeline">Timeline</TabsTrigger>
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
              <CardTitle className="text-lg font-medium">Project Timeline</CardTitle>
            </CardHeader>
            <CardContent className="pt-0 h-[300px] flex items-center justify-center">
              <div className="text-center text-muted-foreground">
                <p>Timeline visualization available in the full premium version</p>
                {isPreview && (
                  <p className="text-sm mt-2 font-semibold">Upgrade to access advanced timeline analytics</p>
                )}
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
