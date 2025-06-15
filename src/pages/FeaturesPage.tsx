
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, Users, Calendar, BarChart3, Clock, FileText } from "lucide-react";

export default function FeaturesPage() {
  const features = [
    {
      icon: <Users className="h-8 w-8 text-primary" />,
      title: "Team Collaboration",
      description: "Work together seamlessly with real-time updates and communication tools."
    },
    {
      icon: <Calendar className="h-8 w-8 text-primary" />,
      title: "Project Planning",
      description: "Plan and schedule your projects with intuitive timeline and calendar views."
    },
    {
      icon: <BarChart3 className="h-8 w-8 text-primary" />,
      title: "Analytics & Reports",
      description: "Get insights into your team's performance with detailed analytics and reports."
    },
    {
      icon: <Clock className="h-8 w-8 text-primary" />,
      title: "Time Tracking",
      description: "Track time spent on tasks and projects to improve productivity."
    },
    {
      icon: <FileText className="h-8 w-8 text-primary" />,
      title: "Task Management",
      description: "Organize and prioritize tasks with customizable workflows and statuses."
    },
    {
      icon: <CheckCircle className="h-8 w-8 text-primary" />,
      title: "Goal Setting",
      description: "Set and track goals to keep your team focused and motivated."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-secondary/10">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold mb-6 bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
            Powerful Features
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Discover all the tools you need to manage your projects efficiently and boost your team's productivity.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {features.map((feature, index) => (
            <Card key={index} className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <CardHeader>
                <div className="mb-4">{feature.icon}</div>
                <CardTitle className="text-xl">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Button size="lg" className="bg-gradient-to-r from-primary to-purple-500 hover:from-primary/90 hover:to-purple-500/90">
            Get Started Today
          </Button>
        </div>
      </div>
    </div>
  );
}
