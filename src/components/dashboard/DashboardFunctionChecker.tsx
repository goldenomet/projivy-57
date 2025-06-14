
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, XCircle, AlertCircle, Play } from "lucide-react";
import { useDashboardData } from "@/hooks/use-dashboard-data";
import { useAuth } from "@/hooks/use-auth";

interface FunctionCheck {
  name: string;
  status: 'pending' | 'success' | 'error' | 'warning';
  message: string;
}

export function DashboardFunctionChecker() {
  const [checks, setChecks] = useState<FunctionCheck[]>([]);
  const [isRunning, setIsRunning] = useState(false);
  const { projects, recentTasks, userProfile, isLoading, error } = useDashboardData();
  const { user } = useAuth();

  const runFunctionChecks = async () => {
    setIsRunning(true);
    const newChecks: FunctionCheck[] = [];

    // Check authentication
    if (user) {
      newChecks.push({
        name: "User Authentication",
        status: "success",
        message: `User logged in as ${user.email}`
      });
    } else {
      newChecks.push({
        name: "User Authentication",
        status: "error",
        message: "No user authenticated"
      });
    }

    // Check user profile
    if (userProfile) {
      newChecks.push({
        name: "User Profile Loading",
        status: "success",
        message: `Profile loaded for ${userProfile.full_name || 'User'}`
      });
    } else {
      newChecks.push({
        name: "User Profile Loading",
        status: "warning",
        message: "User profile not loaded or incomplete"
      });
    }

    // Check projects loading
    if (error) {
      newChecks.push({
        name: "Projects Data Loading",
        status: "error",
        message: "Error loading dashboard data"
      });
    } else if (isLoading) {
      newChecks.push({
        name: "Projects Data Loading",
        status: "warning",
        message: "Data is still loading"
      });
    } else if (projects && projects.length > 0) {
      newChecks.push({
        name: "Projects Data Loading",
        status: "success",
        message: `${projects.length} projects loaded successfully`
      });
    } else {
      newChecks.push({
        name: "Projects Data Loading",
        status: "warning",
        message: "No projects found"
      });
    }

    // Check tasks loading
    if (recentTasks && recentTasks.length > 0) {
      newChecks.push({
        name: "Tasks Data Loading",
        status: "success",
        message: `${recentTasks.length} recent tasks loaded`
      });
    } else if (!isLoading) {
      newChecks.push({
        name: "Tasks Data Loading",
        status: "warning",
        message: "No recent tasks found"
      });
    }

    // Check analytics functionality
    try {
      if (projects && recentTasks) {
        const completedTasks = recentTasks.filter(task => task.status === 'completed').length;
        const totalTasks = recentTasks.length;
        newChecks.push({
          name: "Analytics Calculations",
          status: "success",
          message: `Analytics working: ${completedTasks}/${totalTasks} tasks completed`
        });
      }
    } catch (err) {
      newChecks.push({
        name: "Analytics Calculations",
        status: "error",
        message: "Error in analytics calculations"
      });
    }

    // Check navigation and routing
    if (window.location.pathname === '/dashboard') {
      newChecks.push({
        name: "Dashboard Routing",
        status: "success",
        message: "Successfully navigated to dashboard"
      });
    } else {
      newChecks.push({
        name: "Dashboard Routing",
        status: "warning",
        message: `Current route: ${window.location.pathname}`
      });
    }

    setChecks(newChecks);
    setIsRunning(false);
  };

  const getStatusIcon = (status: FunctionCheck['status']) => {
    switch (status) {
      case 'success':
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'error':
        return <XCircle className="h-4 w-4 text-red-600" />;
      case 'warning':
        return <AlertCircle className="h-4 w-4 text-yellow-600" />;
      default:
        return <AlertCircle className="h-4 w-4 text-gray-400" />;
    }
  };

  const getStatusBadge = (status: FunctionCheck['status']) => {
    const variants = {
      success: 'default',
      error: 'destructive',
      warning: 'secondary',
      pending: 'outline'
    } as const;

    return (
      <Badge variant={variants[status]}>
        {status.toUpperCase()}
      </Badge>
    );
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          Dashboard Function Checker
          <Button 
            onClick={runFunctionChecks} 
            disabled={isRunning}
            size="sm"
          >
            <Play className="h-4 w-4 mr-2" />
            {isRunning ? "Running..." : "Run Checks"}
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {checks.length === 0 ? (
          <p className="text-muted-foreground text-center py-4">
            Click "Run Checks" to verify all dashboard functions are working properly
          </p>
        ) : (
          <div className="space-y-3">
            {checks.map((check, index) => (
              <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center space-x-3">
                  {getStatusIcon(check.status)}
                  <div>
                    <h4 className="font-medium">{check.name}</h4>
                    <p className="text-sm text-muted-foreground">{check.message}</p>
                  </div>
                </div>
                {getStatusBadge(check.status)}
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
