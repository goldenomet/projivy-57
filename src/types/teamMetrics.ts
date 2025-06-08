
export interface TeamMember {
  id: string;
  name: string;
  email: string;
  avatar_url?: string;
  role: string;
}

export interface TeamPerformanceMetrics {
  totalHours: number;
  averageProductivity: number;
  completedTasks: number;
  ongoingTasks: number;
  overdueItems: number;
  efficiency: number;
}

export interface MemberMetrics {
  member: TeamMember;
  hoursWorked: number;
  tasksCompleted: number;
  averageTaskTime: number;
  productivity: number;
  utilization: number;
  projectDistribution: { projectName: string; hours: number; percentage: number }[];
}

export interface ProjectMetrics {
  projectId: string;
  projectName: string;
  totalHours: number;
  membersCount: number;
  completionRate: number;
  averageVelocity: number;
  bottlenecks: string[];
}

export interface ProductivityTrend {
  date: string;
  hours: number;
  tasksCompleted: number;
  efficiency: number;
}

export interface TeamInsights {
  topPerformers: MemberMetrics[];
  underutilizedMembers: MemberMetrics[];
  bottleneckProjects: ProjectMetrics[];
  productivityTrends: ProductivityTrend[];
  recommendations: string[];
}
