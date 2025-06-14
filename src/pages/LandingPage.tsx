import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/hooks/use-auth";
import { Navigate, Link } from "react-router-dom";
import { CheckCircle, Users, Clock, BarChart3 } from "lucide-react";
export default function LandingPage() {
  const {
    user,
    isLoading
  } = useAuth();

  // Redirect to dashboard if authenticated
  if (user && !isLoading) {
    return <Navigate to="/dashboard" replace />;
  }

  // Show loading while checking auth status
  if (isLoading) {
    return <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>;
  }
  const features = [{
    icon: CheckCircle,
    title: "Task Management",
    description: "Organize and track your tasks with powerful project management tools."
  }, {
    icon: Users,
    title: "Team Collaboration",
    description: "Work together seamlessly with your team members and stakeholders."
  }, {
    icon: Clock,
    title: "Time Tracking",
    description: "Monitor time spent on projects and improve productivity insights."
  }, {
    icon: BarChart3,
    title: "Analytics & Reports",
    description: "Get detailed insights into your project progress and team performance."
  }];
  return <div className="min-h-screen bg-gradient-to-br from-background to-secondary/20">
      {/* Header */}
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="font-bold text-3xl">Projivy</h1>
          <div className="space-x-2">
            <Link to="/auth">
              <Button variant="ghost">Sign In</Button>
            </Link>
            <Link to="/auth">
              <Button>Get Started</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left side - Text content */}
          <div className="text-center lg:text-left">
            <h2 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
              Manage Projects with
              <span className="text-primary"> Confidence</span>
            </h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl">
              The ultimate project management platform that helps teams collaborate, 
              track progress, and deliver results efficiently.
            </p>
            <div className="space-x-4">
              <Link to="/auth">
                <Button size="lg" className="text-lg px-8 py-3">
                  Start Free Trial
                </Button>
              </Link>
              <Button variant="outline" size="lg" className="text-lg px-8 py-3">Learn More 🔰</Button>
            </div>
          </div>
          
          {/* Right side - Illustration */}
          <div className="flex justify-center lg:justify-end">
            <img src="/lovable-uploads/2fdc24f0-651a-49b6-9a2c-0fb781bf042c.png" alt="Professional woman working at desk with laptop" className="w-[500px] h-auto drop-shadow-2xl animate-floating" />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-16">
        <h3 className="text-3xl font-bold text-center mb-12">
          Everything you need to succeed
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => <Card key={index} className="border-border/50 hover:shadow-lg transition-shadow">
              <CardHeader>
                <feature.icon className="h-12 w-12 text-primary mb-4" />
                <CardTitle className="text-xl">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-sm">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>)}
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-16 text-center">
        <Card className="max-w-2xl mx-auto border-primary/20 bg-gradient-to-r from-primary/5 to-secondary/10">
          <CardHeader>
            <CardTitle className="text-2xl">Ready to get started?</CardTitle>
            <CardDescription>
              Join thousands of teams already using ProjectHub to deliver amazing results.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Link to="/auth">
              <Button size="lg" className="text-lg px-8 py-3">
                Create Your Account
              </Button>
            </Link>
          </CardContent>
        </Card>
      </section>

      {/* Footer */}
      <footer className="border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 py-8 text-center text-muted-foreground">
          <p>&copy; 2024 ProjectHub. All rights reserved.</p>
        </div>
      </footer>
    </div>;
}