
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, AlertCircle, Clock } from "lucide-react";

export default function StatusPage() {
  const services = [
    {
      name: "API",
      status: "operational",
      uptime: "99.9%"
    },
    {
      name: "Web Application",
      status: "operational",
      uptime: "99.8%"
    },
    {
      name: "Database",
      status: "operational",
      uptime: "99.9%"
    },
    {
      name: "File Storage",
      status: "operational",
      uptime: "99.7%"
    },
    {
      name: "Email Service",
      status: "operational",
      uptime: "99.6%"
    }
  ];

  const incidents = [
    {
      date: "2025-06-14",
      title: "Brief API slowdown resolved",
      status: "resolved",
      description: "Some users experienced slower API response times. Issue has been resolved."
    },
    {
      date: "2025-06-10",
      title: "Scheduled maintenance completed",
      status: "resolved",
      description: "Scheduled database maintenance completed successfully with no downtime."
    },
    {
      date: "2025-06-05",
      title: "Email notifications delayed",
      status: "resolved",
      description: "Email notifications were delayed due to high volume. All emails have been delivered."
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "operational":
        return <Badge className="bg-green-100 text-green-700 hover:bg-green-200"><CheckCircle className="h-3 w-3 mr-1" />Operational</Badge>;
      case "degraded":
        return <Badge className="bg-yellow-100 text-yellow-700 hover:bg-yellow-200"><AlertCircle className="h-3 w-3 mr-1" />Degraded</Badge>;
      case "resolved":
        return <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-200"><CheckCircle className="h-3 w-3 mr-1" />Resolved</Badge>;
      default:
        return <Badge variant="secondary"><Clock className="h-3 w-3 mr-1" />Unknown</Badge>;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-secondary/10">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold mb-6 bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
            System Status
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Current status of all Projivy services and recent incidents.
          </p>
        </div>

        <div className="max-w-4xl mx-auto space-y-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <CheckCircle className="h-6 w-6 text-green-500" />
                All Systems Operational
              </CardTitle>
              <CardDescription>
                All services are running normally with excellent uptime.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Service Status</CardTitle>
              <CardDescription>Current status of all Projivy services</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {services.map((service, index) => (
                  <div key={index} className="flex items-center justify-between p-4 rounded-lg border">
                    <div className="flex items-center gap-4">
                      <div>
                        <h4 className="font-medium">{service.name}</h4>
                        <p className="text-sm text-muted-foreground">Uptime: {service.uptime}</p>
                      </div>
                    </div>
                    {getStatusBadge(service.status)}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Recent Incidents</CardTitle>
              <CardDescription>Past incidents and maintenance updates</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {incidents.map((incident, index) => (
                  <div key={index} className="p-4 rounded-lg border">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h4 className="font-medium">{incident.title}</h4>
                        <p className="text-sm text-muted-foreground">{incident.date}</p>
                      </div>
                      {getStatusBadge(incident.status)}
                    </div>
                    <p className="text-sm text-muted-foreground">{incident.description}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
