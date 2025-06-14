
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/hooks/use-auth";
import { Navigate, Link } from "react-router-dom";
import { CheckCircle, Users, Clock, BarChart3, Star, ArrowRight, Play, Shield, Zap, Globe, Award, TrendingUp } from "lucide-react";

export default function LandingPage() {
  const { user, isLoading } = useAuth();

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

  const features = [
    {
      icon: CheckCircle,
      title: "Task Management",
      description: "Organize and track your tasks with powerful project management tools.",
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      icon: Users,
      title: "Team Collaboration",
      description: "Work together seamlessly with your team members and stakeholders.",
      gradient: "from-purple-500 to-pink-500"
    },
    {
      icon: Clock,
      title: "Time Tracking",
      description: "Monitor time spent on projects and improve productivity insights.",
      gradient: "from-green-500 to-emerald-500"
    },
    {
      icon: BarChart3,
      title: "Analytics & Reports",
      description: "Get detailed insights into your project progress and team performance.",
      gradient: "from-orange-500 to-red-500"
    }
  ];

  const stats = [
    { number: "10K+", label: "Active Users", icon: Users },
    { number: "50K+", label: "Projects Completed", icon: CheckCircle },
    { number: "99.9%", label: "Uptime", icon: Shield },
    { number: "24/7", label: "Support", icon: Clock }
  ];

  const testimonials = [
    {
      name: "Sarah Chen",
      role: "Product Manager",
      company: "TechCorp",
      content: "Projivy transformed how our team collaborates. The intuitive interface and powerful features made project management effortless.",
      rating: 5,
      avatar: "SC"
    },
    {
      name: "Marcus Rodriguez",
      role: "Startup Founder", 
      company: "InnovateLab",
      content: "From idea to execution, Projivy keeps everything organized. It's the perfect tool for growing teams.",
      rating: 5,
      avatar: "MR"
    },
    {
      name: "Emily Watson",
      role: "Team Lead",
      company: "DesignStudio",
      content: "The time tracking and analytics features gave us insights we never had before. Game changer for productivity.",
      rating: 5,
      avatar: "EW"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-secondary/10">
      {/* Header */}
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="font-bold text-3xl bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
            Projivy
          </h1>
          <div className="space-x-2">
            <Link to="/auth">
              <Button variant="ghost" className="hover:bg-primary/10">Sign In</Button>
            </Link>
            <Link to="/auth">
              <Button className="bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90 shadow-lg hover:shadow-xl transition-all duration-300">
                Get Started
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left side - Text content */}
          <div className="text-center lg:text-left space-y-8 animate-fade-in">
            <div className="inline-flex items-center gap-2 bg-primary/10 rounded-full px-4 py-2 text-sm font-medium text-primary animate-bounce-gentle">
              <Star className="h-4 w-4" />
              Trusted by 10,000+ teams worldwide
            </div>
            
            <h2 className="text-5xl md:text-7xl font-bold tracking-tight leading-tight">
              Manage Projects with
              <span className="text-transparent bg-gradient-to-r from-primary via-purple-600 to-pink-600 bg-clip-text animate-pulse-soft"> Confidence</span>
            </h2>
            
            <p className="text-xl text-muted-foreground leading-relaxed max-w-2xl">
              The ultimate project management platform that helps teams collaborate, 
              track progress, and deliver results efficiently. Transform your workflow today.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link to="/auth">
                <Button size="lg" className="text-lg px-8 py-4 bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 group">
                  Start Free Trial
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Button variant="outline" size="lg" className="text-lg px-8 py-4 border-2 hover:bg-primary/5 hover:border-primary/50 transition-all duration-300 group">
                <Play className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />
                Watch Demo
              </Button>
            </div>
            
            <div className="flex items-center gap-6 justify-center lg:justify-start text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <CheckCircle className="h-4 w-4 text-green-500" />
                Free 14-day trial
              </div>
              <div className="flex items-center gap-1">
                <CheckCircle className="h-4 w-4 text-green-500" />
                No credit card required
              </div>
              <div className="flex items-center gap-1">
                <CheckCircle className="h-4 w-4 text-green-500" />
                Cancel anytime
              </div>
            </div>
          </div>
          
          {/* Right side - Illustration */}
          <div className="flex justify-center lg:justify-end animate-scale-in">
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 to-purple-600/20 rounded-3xl blur-2xl animate-pulse-soft"></div>
              <img 
                src="/lovable-uploads/2fdc24f0-651a-49b6-9a2c-0fb781bf042c.png" 
                alt="Professional woman working at desk with laptop" 
                className="relative w-[500px] h-auto drop-shadow-2xl animate-floating hover:scale-105 transition-transform duration-500" 
              />
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="container mx-auto px-4 py-16 animate-fade-in">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <Card key={index} className="text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-2 cursor-pointer group">
              <CardContent className="pt-6">
                <stat.icon className="h-8 w-8 mx-auto mb-4 text-primary group-hover:scale-110 transition-transform" />
                <div className="text-3xl font-bold text-primary mb-2">{stat.number}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-20 animate-slide-in">
        <div className="text-center mb-16">
          <h3 className="text-4xl font-bold mb-4">
            Everything you need to 
            <span className="text-transparent bg-gradient-to-r from-primary to-purple-600 bg-clip-text"> succeed</span>
          </h3>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Powerful features designed to streamline your workflow and boost team productivity
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <Card 
              key={index} 
              className="border-border/50 hover:shadow-xl transition-all duration-500 hover:-translate-y-2 cursor-pointer group overflow-hidden relative"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}></div>
              <CardHeader className="relative">
                <div className={`h-16 w-16 rounded-2xl bg-gradient-to-br ${feature.gradient} p-4 mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <feature.icon className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-xl group-hover:text-primary transition-colors">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent className="relative">
                <CardDescription className="text-sm leading-relaxed">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="container mx-auto px-4 py-20 animate-fade-in">
        <div className="text-center mb-16">
          <h3 className="text-4xl font-bold mb-4">
            Loved by teams
            <span className="text-transparent bg-gradient-to-r from-primary to-purple-600 bg-clip-text"> worldwide</span>
          </h3>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            See what our customers have to say about transforming their project management
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="hover:shadow-xl transition-all duration-300 hover:-translate-y-2 group">
              <CardContent className="pt-6">
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-muted-foreground mb-6 italic leading-relaxed">
                  "{testimonial.content}"
                </p>
                <div className="flex items-center gap-3">
                  <div className="h-12 w-12 rounded-full bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center text-white font-semibold">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <div className="font-semibold">{testimonial.name}</div>
                    <div className="text-sm text-muted-foreground">{testimonial.role} at {testimonial.company}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Additional Features Grid */}
      <section className="container mx-auto px-4 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-6 animate-slide-in">
            <h3 className="text-3xl font-bold">
              Built for the
              <span className="text-transparent bg-gradient-to-r from-primary to-purple-600 bg-clip-text"> modern workplace</span>
            </h3>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Projivy adapts to your team's unique workflow with flexible features and integrations.
            </p>
            <div className="space-y-4">
              {[
                { icon: Shield, title: "Enterprise Security", desc: "Bank-level encryption and security" },
                { icon: Globe, title: "Global Access", desc: "Work from anywhere, anytime" },
                { icon: Zap, title: "Lightning Fast", desc: "Optimized for speed and performance" },
                { icon: Award, title: "Award Winning", desc: "Recognized by industry leaders" }
              ].map((item, index) => (
                <div key={index} className="flex items-start gap-3 group hover:bg-primary/5 p-3 rounded-lg transition-colors">
                  <item.icon className="h-6 w-6 text-primary mt-1 group-hover:scale-110 transition-transform" />
                  <div>
                    <h4 className="font-semibold">{item.title}</h4>
                    <p className="text-sm text-muted-foreground">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4 animate-scale-in">
            {[
              { icon: TrendingUp, title: "98%", subtitle: "Client Satisfaction", color: "from-green-500 to-emerald-500" },
              { icon: Users, title: "500+", subtitle: "Team Members", color: "from-blue-500 to-cyan-500" },
              { icon: Globe, title: "50+", subtitle: "Countries", color: "from-purple-500 to-pink-500" },
              { icon: Award, title: "#1", subtitle: "PM Tool 2024", color: "from-orange-500 to-red-500" }
            ].map((metric, index) => (
              <Card key={index} className="text-center p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-2 group">
                <div className={`h-12 w-12 rounded-full bg-gradient-to-br ${metric.color} mx-auto mb-4 flex items-center justify-center group-hover:scale-110 transition-transform`}>
                  <metric.icon className="h-6 w-6 text-white" />
                </div>
                <div className="text-2xl font-bold text-primary mb-1">{metric.title}</div>
                <div className="text-sm text-muted-foreground">{metric.subtitle}</div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-20 text-center animate-fade-in">
        <Card className="max-w-4xl mx-auto border-primary/20 bg-gradient-to-r from-primary/5 via-background to-purple-600/5 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-purple-600/10 animate-pulse-soft"></div>
          <CardHeader className="relative">
            <CardTitle className="text-3xl mb-4">Ready to transform your workflow?</CardTitle>
            <CardDescription className="text-lg max-w-2xl mx-auto leading-relaxed">
              Join thousands of teams already using Projivy to deliver amazing results. 
              Start your free trial today and experience the difference.
            </CardDescription>
          </CardHeader>
          <CardContent className="relative space-y-6">
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/auth">
                <Button size="lg" className="text-lg px-8 py-4 bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 group">
                  Start Free Trial
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Button variant="outline" size="lg" className="text-lg px-8 py-4 border-2 hover:bg-primary/5 hover:border-primary/50 transition-all duration-300">
                Schedule Demo
              </Button>
            </div>
            <p className="text-sm text-muted-foreground">
              No setup fees • Cancel anytime • 24/7 support included
            </p>
          </CardContent>
        </Card>
      </section>

      {/* Footer */}
      <footer className="border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div className="space-y-4">
              <h4 className="font-bold text-xl bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
                Projivy
              </h4>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Empowering teams to achieve more through better project management.
              </p>
            </div>
            <div className="space-y-4">
              <h5 className="font-semibold">Product</h5>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-primary transition-colors">Features</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Pricing</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Integrations</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">API</a></li>
              </ul>
            </div>
            <div className="space-y-4">
              <h5 className="font-semibold">Company</h5>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-primary transition-colors">About</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Contact</a></li>
              </ul>
            </div>
            <div className="space-y-4">
              <h5 className="font-semibold">Support</h5>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-primary transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Documentation</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Status</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Privacy</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t pt-8 text-center text-muted-foreground text-sm">
            <p>&copy; 2024 Projivy. All rights reserved. Made with ❤️ for productive teams.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
