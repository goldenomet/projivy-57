
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CheckCircle, AlertCircle, Clock, ArrowLeft, RefreshCw, Bell } from "lucide-react";
import { Link } from "react-router-dom";

export default function StatusPage() {
  const services = [
    {
      name: "API",
      status: "operational",
      uptime: "99.9%",
      responseTime: "120ms"
    },
    {
      name: "Web Application",
      status: "operational",
      uptime: "99.8%",
      responseTime: "200ms"
    },
    {
      name: "Database",
      status: "operational",
      uptime: "99.9%",
      responseTime: "50ms"
    },
    {
      name: "File Storage",
      status: "operational",
      uptime: "99.7%",
      responseTime: "300ms"
    },
    {
      name: "Email Service",
      status: "operational",
      uptime: "99.6%",
      responseTime: "500ms"
    }
  ];

  const incidents = [
    {
      date: "2025-06-14",
      time: "14:30 UTC",
      title: "Brief API slowdown resolved",
      status: "resolved",
      severity: "minor",
      description: "Some users experienced slower API response times between 14:15-14:30 UTC. Issue has been resolved and performance is back to normal.",
      duration: "15 minutes"
    },
    {
      date: "2025-06-10",
      time: "02:00 UTC",
      title: "Scheduled maintenance completed",
      status: "resolved",
      severity: "maintenance",
      description: "Scheduled database maintenance completed successfully with no user-facing downtime. Performance improvements applied.",
      duration: "2 hours"
    },
    {
      date: "2025-06-05",
      time: "16:45 UTC",
      title: "Email notifications delayed",
      status: "resolved",
      severity: "minor",
      description: "Email notifications were delayed due to high volume during peak hours. All emails have been delivered successfully.",
      duration: "45 minutes"
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "operational":
        return <Badge className="bg-green-100 text-green-700 hover:bg-green-200 transition-colors"><CheckCircle className="h-3 w-3 mr-1" />Operational</Badge>;
      case "degraded":
        return <Badge className="bg-yellow-100 text-yellow-700 hover:bg-yellow-200 transition-colors"><AlertCircle className="h-3 w-3 mr-1" />Degraded</Badge>;
      case "resolved":
        return <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-200 transition-colors"><CheckCircle className="h-3 w-3 mr-1" />Resolved</Badge>;
      default:
        return <Badge variant="secondary"><Clock className="h-3 w-3 mr-1" />Unknown</Badge>;
    }
  };

  const getSeverityBadge = (severity: string) => {
    switch (severity) {
      case "minor":
        return <Badge variant="outline" className="text-yellow-600 border-yellow-200">Minor</Badge>;
      case "major":
        return <Badge variant="outline" className="text-red-600 border-red-200">Major</Badge>;
      case "maintenance":
        return <Badge variant="outline" className="text-blue-600 border-blue-200">Maintenance</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-secondary/10">
      <div className="container mx-auto px-4 py-8 sm:py-16">
        {/* Back Button */}
        <div className="mb-8">
          <Link to="/landing">
            <Button variant="ghost" className="hover:bg-primary/10 transition-all duration-300 hover:scale-105">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Home
            </Button>
          </Link>
        </div>

        {/* Header */}
        <div className="text-center mb-12 sm:mb-16 animate-fade-in">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
            System Status
          </h1>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Real-time status of all Projivy services and recent incidents.
          </p>
          
          {/* Status Actions */}
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="outline" className="hover:bg-primary/10 hover:scale-105 transition-all duration-300">
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh Status
            </Button>
            <Button variant="outline" className="hover:bg-primary/10 hover:scale-105 transition-all duration-300">
              <Bell className="h-4 w-4 mr-2" />
              Subscribe to Updates
            </Button>
          </div>
        </div>

        <div className="max-w-6xl mx-auto space-y-8">
          {/* Overall Status */}
          <Card className="animate-scale-in border-2 border-green-200 bg-green-50/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-green-800">
                <CheckCircle className="h-6 w-6 text-green-500" />
                All Systems Operational
              </CardTitle>
              <CardDescription className="text-green-700">
                All services are running normally with excellent uptime. Last updated: {new Date().toLocaleTimeString()}
              </CardDescription>
            </CardHeader>
          </Card>

          {/* Service Status */}
          <Card className="animate-slide-in">
            <CardHeader>
              <CardTitle className="text-xl sm:text-2xl">Service Status</CardTitle>
              <CardDescription>Current status and performance metrics for all Projivy services</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {services.map((service, index) => (
                  <div 
                    key={index} 
                    className="flex flex-col sm:flex-row sm:items-center justify-between p-4 sm:p-6 rounded-lg border border-border hover:border-primary/30 transition-all duration-300 hover:shadow-md bg-card/50"
                  >
                    <div className="flex-1 mb-3 sm:mb-0">
                      <h4 className="font-semibold text-lg">{service.name}</h4>
                      <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mt-2 text-sm text-muted-foreground">
                        <span>Uptime: <span className="font-medium text-green-600">{service.uptime}</span></span>
                        <span className="hidden sm:inline">•</span>
                        <span>Response: <span className="font-medium">{service.responseTime}</span></span>
                      </div>
                    </div>
                    <div className="flex justify-end">
                      {getStatusBadge(service.status)}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Recent Incidents */}
          <Card className="animate-slide-in" style={{ animationDelay: "0.2s" }}>
            <CardHeader>
              <CardTitle className="text-xl sm:text-2xl">Recent Incidents</CardTitle>
              <CardDescription>Past incidents, maintenance updates, and system changes</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {incidents.map((incident, index) => (
                  <div 
                    key={index} 
                    className="p-4 sm:p-6 rounded-lg border border-border hover:border-primary/30 transition-all duration-300 hover:shadow-md bg-card/50"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between mb-4">
                      <div className="flex-1 mb-3 sm:mb-0">
                        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 mb-2">
                          <h4 className="font-semibold text-lg">{incident.title}</h4>
                          {getSeverityBadge(incident.severity)}
                        </div>
                        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-sm text-muted-foreground">
                          <span>{incident.date} at {incident.time}</span>
                          <span className="hidden sm:inline">•</span>
                          <span>Duration: {incident.duration}</span>
                        </div>
                      </div>
                      <div className="flex justify-end">
                        {getStatusBadge(incident.status)}
                      </div>
                    </div>
                    <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                      {incident.description}
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Status History */}
          <Card className="animate-slide-in" style={{ animationDelay: "0.4s" }}>
            <CardHeader>
              <CardTitle className="text-xl sm:text-2xl">90-Day Uptime History</CardTitle>
              <CardDescription>System reliability over the past 90 days</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
                <div className="p-4 rounded-lg bg-green-50 border border-green-200">
                  <div className="text-2xl sm:text-3xl font-bold text-green-600">99.8%</div>
                  <div className="text-sm text-green-700 mt-1">Average Uptime</div>
                </div>
                <div className="p-4 rounded-lg bg-blue-50 border border-blue-200">
                  <div className="text-2xl sm:text-3xl font-bold text-blue-600">2</div>
                  <div className="text-sm text-blue-700 mt-1">Incidents</div>
                </div>
                <div className="p-4 rounded-lg bg-purple-50 border border-purple-200">
                  <div className="text-2xl sm:text-3xl font-bold text-purple-600">180ms</div>
                  <div className="text-sm text-purple-700 mt-1">Avg Response</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
