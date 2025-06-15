
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, Users, Calendar, BarChart3, Clock, FileText, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

export default function FeaturesPage() {
  const features = [
    {
      icon: <Users className="h-8 w-8 text-primary" />,
      title: "Team Collaboration",
      description: "Work together seamlessly with real-time updates and communication tools.",
      highlights: ["Real-time chat", "File sharing", "Activity feeds"]
    },
    {
      icon: <Calendar className="h-8 w-8 text-primary" />,
      title: "Project Planning",
      description: "Plan and schedule your projects with intuitive timeline and calendar views.",
      highlights: ["Gantt charts", "Milestone tracking", "Deadline alerts"]
    },
    {
      icon: <BarChart3 className="h-8 w-8 text-primary" />,
      title: "Analytics & Reports",
      description: "Get insights into your team's performance with detailed analytics and reports.",
      highlights: ["Custom dashboards", "Export options", "Performance metrics"]
    },
    {
      icon: <Clock className="h-8 w-8 text-primary" />,
      title: "Time Tracking",
      description: "Track time spent on tasks and projects to improve productivity.",
      highlights: ["Automatic tracking", "Billable hours", "Time reports"]
    },
    {
      icon: <FileText className="h-8 w-8 text-primary" />,
      title: "Task Management",
      description: "Organize and prioritize tasks with customizable workflows and statuses.",
      highlights: ["Kanban boards", "Custom workflows", "Priority levels"]
    },
    {
      icon: <CheckCircle className="h-8 w-8 text-primary" />,
      title: "Goal Setting",
      description: "Set and track goals to keep your team focused and motivated.",
      highlights: ["SMART goals", "Progress tracking", "Achievement badges"]
    }
  ];

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
            Powerful Features
          </h1>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Discover all the tools you need to manage your projects efficiently and boost your team's productivity.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-12 sm:mb-16">
          {features.map((feature, index) => (
            <Card 
              key={index} 
              className="group hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 cursor-pointer border-2 hover:border-primary/20 animate-scale-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardHeader className="pb-4">
                <div className="mb-4 group-hover:scale-110 transition-transform duration-300">
                  {feature.icon}
                </div>
                <CardTitle className="text-lg sm:text-xl group-hover:text-primary transition-colors duration-300">
                  {feature.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <CardDescription className="text-sm sm:text-base leading-relaxed">
                  {feature.description}
                </CardDescription>
                <div className="space-y-2">
                  {feature.highlights.map((highlight, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                      <span>{highlight}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center bg-muted/30 rounded-2xl p-8 sm:p-12 animate-slide-in">
          <h3 className="text-2xl sm:text-3xl font-semibold mb-4 sm:mb-6">Ready to boost your productivity?</h3>
          <p className="text-muted-foreground mb-6 sm:mb-8 max-w-2xl mx-auto">
            Join thousands of teams already using Projivy to streamline their workflow and achieve better results.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/auth">
              <Button size="lg" className="w-full sm:w-auto bg-gradient-to-r from-primary to-purple-500 hover:from-primary/90 hover:to-purple-500/90 hover:scale-105 transition-all duration-300">
                Start Free Trial
              </Button>
            </Link>
            <Link to="/pricing">
              <Button variant="outline" size="lg" className="w-full sm:w-auto hover:bg-primary/10 hover:scale-105 transition-all duration-300">
                View Pricing
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
