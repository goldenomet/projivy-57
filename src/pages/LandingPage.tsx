
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle, Layers, Users, Zap, BarChart4, Clock, Shield } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Logo } from "@/components/ui/logo";
import { ProjectVisualization } from "@/components/ui/ProjectVisualization";
import { useEffect, useState } from "react";

export default function LandingPage() {
  const [scrollY, setScrollY] = useState(0);
  const [isVisible, setIsVisible] = useState<{ [key: string]: boolean }>({
    hero: true,
    features: false,
    testimonials: false,
    cta: false,
  });

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
      
      // Update visibility based on scroll position
      setIsVisible({
        hero: true,
        features: window.scrollY > 100,
        testimonials: window.scrollY > 800,
        cta: window.scrollY > 1400,
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-background to-background/90">
      {/* Header */}
      <header className="w-full py-4 px-6 md:px-10 flex items-center justify-between bg-gradient-to-r from-background/80 to-background backdrop-blur-sm border-b border-border/30 sticky top-0 z-10">
        <Logo size="md" />
        <div className="flex items-center gap-4">
          <Link to="/dashboard">
            <Button variant="ghost" className="hidden md:flex">
              Dashboard
            </Button>
          </Link>
          <Link to="/projects">
            <Button variant="ghost" className="hidden md:flex">
              Projects
            </Button>
          </Link>
          <Link to="/team">
            <Button variant="ghost" className="hidden md:flex">
              Team
            </Button>
          </Link>
          <Link to="/dashboard">
            <Button className="bg-gradient-to-r from-primary to-purple-500 hover:opacity-90 transition-all">
              Get Started <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative flex flex-col items-center justify-center px-6 md:px-10 py-20 md:py-32 overflow-hidden animate-fade-in">
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(155,135,245,0.15),transparent_50%)]"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,rgba(155,135,245,0.15),transparent_50%)]"></div>
          <div className="absolute top-1/4 left-1/4 h-64 w-64 rounded-full bg-primary/5 blur-3xl"></div>
          <div className="absolute bottom-1/4 right-1/4 h-64 w-64 rounded-full bg-purple-500/5 blur-3xl"></div>
        </div>
        
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <div className="flex justify-center mb-8">
            <Logo size="lg" />
          </div>
          <h1 
            className={`text-4xl md:text-6xl font-bold tracking-tight text-transparent bg-gradient-to-r from-primary to-purple-500 bg-clip-text transition-all duration-700 ${
              isVisible.hero ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-10"
            }`}
          >
            Evolve Your Project Management
          </h1>
          <p 
            className={`text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto transition-all duration-700 delay-300 ${
              isVisible.hero ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            Streamline your workflow, enhance team collaboration, and deliver projects on time with our intuitive platform.
          </p>
          <div 
            className={`flex flex-col sm:flex-row gap-4 justify-center mt-10 transition-all duration-700 delay-500 ${
              isVisible.hero ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            <Link to="/dashboard">
              <Button size="lg" className="bg-gradient-to-r from-primary to-purple-500 hover:opacity-90 shadow-md hover:shadow-lg transition-all w-full sm:w-auto">
                Get Started <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link to="/dashboard">
              <Button size="lg" variant="outline" className="bg-background/50 backdrop-blur-sm hover:bg-background/80 transition-all w-full sm:w-auto">
                View Dashboard
              </Button>
            </Link>
          </div>
        </div>

        <div className="mt-16 w-full max-w-5xl h-[400px]">
          <div 
            className={`relative w-full h-full rounded-xl overflow-hidden shadow-2xl border border-primary/20 transition-all duration-1000 ${
              isVisible.hero ? "opacity-100 scale-100" : "opacity-0 scale-95"
            }`}
          >
            <ProjectVisualization className="w-full h-full" />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6 md:px-10 bg-gradient-to-b from-background to-card/50">
        <div className="max-w-6xl mx-auto">
          <h2 
            className={`text-3xl md:text-4xl font-bold text-center mb-12 text-transparent bg-gradient-to-r from-primary to-purple-500 bg-clip-text transition-all duration-700 ${
              isVisible.features ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-10"
            }`}
          >
            Powerful Features for Modern Teams
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card 
              className={`bg-gradient-to-br from-card to-card/90 backdrop-blur-sm border border-border/50 shadow-md hover:shadow-lg transition-all duration-500 hover:translate-y-[-5px] ${
                isVisible.features ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
              style={{ transitionDelay: "100ms" }}
            >
              <CardHeader>
                <div className="size-12 rounded-lg bg-gradient-to-br from-blue-400/20 to-blue-600/20 flex items-center justify-center mb-4">
                  <Layers className="h-6 w-6 text-blue-500" />
                </div>
                <CardTitle>Project Management</CardTitle>
                <CardDescription>
                  Organize projects with intuitive tools and visual workflows
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {["Task tracking", "Status updates", "Priority management", "Deadline reminders"].map((item) => (
                    <li key={item} className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card 
              className={`bg-gradient-to-br from-card to-card/90 backdrop-blur-sm border border-border/50 shadow-md hover:shadow-lg transition-all duration-500 hover:translate-y-[-5px] ${
                isVisible.features ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
              style={{ transitionDelay: "300ms" }}
            >
              <CardHeader>
                <div className="size-12 rounded-lg bg-gradient-to-br from-purple-400/20 to-purple-600/20 flex items-center justify-center mb-4">
                  <Users className="h-6 w-6 text-purple-500" />
                </div>
                <CardTitle>Team Collaboration</CardTitle>
                <CardDescription>
                  Work together seamlessly with your entire team
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {["Role assignment", "Team dashboards", "Shared calendars", "Communication tools"].map((item) => (
                    <li key={item} className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card 
              className={`bg-gradient-to-br from-card to-card/90 backdrop-blur-sm border border-border/50 shadow-md hover:shadow-lg transition-all duration-500 hover:translate-y-[-5px] ${
                isVisible.features ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
              style={{ transitionDelay: "500ms" }}
            >
              <CardHeader>
                <div className="size-12 rounded-lg bg-gradient-to-br from-green-400/20 to-green-600/20 flex items-center justify-center mb-4">
                  <Zap className="h-6 w-6 text-green-500" />
                </div>
                <CardTitle>Analytics & Insights</CardTitle>
                <CardDescription>
                  Make data-driven decisions with detailed reports
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {["Progress tracking", "Performance metrics", "Resource allocation", "Timeline visualization"].map((item) => (
                    <li key={item} className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
          
          {/* Additional Features Row */}
          <div 
            className={`grid grid-cols-1 md:grid-cols-3 gap-8 mt-8 transition-all duration-700 ${
              isVisible.features ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
            style={{ transitionDelay: "700ms" }}
          >
            <Card className="bg-gradient-to-br from-card to-card/90 backdrop-blur-sm border border-border/50 shadow-md hover:shadow-lg transition-all duration-300 hover:translate-y-[-5px]">
              <CardHeader>
                <div className="size-12 rounded-lg bg-gradient-to-br from-yellow-400/20 to-yellow-600/20 flex items-center justify-center mb-4">
                  <Clock className="h-6 w-6 text-yellow-500" />
                </div>
                <CardTitle>Time Tracking</CardTitle>
                <CardDescription>
                  Monitor time spent on tasks and projects
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {["Automatic timers", "Weekly reports", "Billable hours", "Time estimation"].map((item) => (
                    <li key={item} className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-card to-card/90 backdrop-blur-sm border border-border/50 shadow-md hover:shadow-lg transition-all duration-300 hover:translate-y-[-5px]">
              <CardHeader>
                <div className="size-12 rounded-lg bg-gradient-to-br from-red-400/20 to-red-600/20 flex items-center justify-center mb-4">
                  <BarChart4 className="h-6 w-6 text-red-500" />
                </div>
                <CardTitle>Advanced Reporting</CardTitle>
                <CardDescription>
                  Create custom reports and dashboards
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {["Custom filters", "Export options", "Visual charts", "Scheduled reports"].map((item) => (
                    <li key={item} className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-card to-card/90 backdrop-blur-sm border border-border/50 shadow-md hover:shadow-lg transition-all duration-300 hover:translate-y-[-5px]">
              <CardHeader>
                <div className="size-12 rounded-lg bg-gradient-to-br from-blue-400/20 to-blue-600/20 flex items-center justify-center mb-4">
                  <Shield className="h-6 w-6 text-blue-500" />
                </div>
                <CardTitle>Security & Compliance</CardTitle>
                <CardDescription>
                  Enterprise-grade security for your data
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {["Role-based access", "Data encryption", "Audit logs", "Compliance tools"].map((item) => (
                    <li key={item} className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section 
        className={`py-20 px-6 md:px-10 transition-all duration-1000 ${
          isVisible.testimonials ? "opacity-100" : "opacity-0"
        }`}
      >
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-transparent bg-gradient-to-r from-primary to-purple-500 bg-clip-text">
            What Our Clients Say
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                name: "Sarah Johnson",
                role: "Product Manager",
                company: "TechSolutions Inc.",
                quote: "Projivy has transformed how our team collaborates. Tasks that used to take days now take hours!",
                delay: "100ms"
              },
              {
                name: "David Chen",
                role: "CTO",
                company: "Innovate Systems",
                quote: "The analytics dashboard gives us insights we never had before. We can make data-driven decisions quickly.",
                delay: "300ms"
              },
              {
                name: "Maria Rodriguez",
                role: "Team Lead",
                company: "Creative Minds",
                quote: "Our design team's productivity has increased by 40% since we started using Projivy's collaboration features.",
                delay: "500ms"
              }
            ].map((testimonial, i) => (
              <div 
                key={i} 
                className="bg-gradient-to-br from-card to-card/90 backdrop-blur-sm border border-border/50 rounded-lg p-6 shadow-md hover:shadow-lg transition-all duration-500 hover:translate-y-[-5px]"
                style={{ 
                  transitionDelay: testimonial.delay,
                  transform: isVisible.testimonials ? "translateY(0)" : "translateY(30px)",
                  opacity: isVisible.testimonials ? 1 : 0
                }}
              >
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary/20 to-purple-500/20 flex items-center justify-center mr-4">
                    <span className="text-lg font-semibold text-primary">{testimonial.name.charAt(0)}</span>
                  </div>
                  <div>
                    <h4 className="font-semibold">{testimonial.name}</h4>
                    <p className="text-sm text-muted-foreground">{testimonial.role}, {testimonial.company}</p>
                  </div>
                </div>
                <p className="italic text-muted-foreground">{testimonial.quote}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section 
        className={`py-20 px-6 md:px-10 transition-all duration-1000 ${
          isVisible.cta ? "opacity-100" : "opacity-0"
        }`}
      >
        <div className="max-w-4xl mx-auto text-center">
          <div 
            className="relative bg-gradient-to-r from-primary/20 to-purple-500/20 rounded-lg p-10 overflow-hidden border border-primary/30 shadow-lg"
            style={{ 
              transform: isVisible.cta ? "translateY(0)" : "translateY(30px)"
            }}
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(155,135,245,0.4),transparent_60%)]"></div>
            <div className="relative z-10">
              <h2 className="text-3xl font-bold mb-4 text-transparent bg-gradient-to-r from-primary to-purple-500 bg-clip-text">Ready to Transform Your Workflow?</h2>
              <p className="text-lg mb-8 text-foreground/80">Join thousands of teams already using Projivy to streamline their project management</p>
              <Link to="/dashboard">
                <Button size="lg" className="bg-gradient-to-r from-primary to-purple-500 hover:opacity-90 shadow-md hover:shadow-lg transition-all animate-pulse">
                  Get Started Today <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-auto py-10 px-6 md:px-10 bg-gradient-to-t from-card/50 to-background border-t border-border/30">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center">
          <Logo size="md" />
          <div className="flex flex-col md:flex-row gap-8">
            <div className="flex gap-6">
              <Link to="/dashboard" className="text-muted-foreground hover:text-foreground transition-colors">
                Dashboard
              </Link>
              <Link to="/projects" className="text-muted-foreground hover:text-foreground transition-colors">
                Projects
              </Link>
              <Link to="/team" className="text-muted-foreground hover:text-foreground transition-colors">
                Team
              </Link>
            </div>
          </div>
          <div className="mt-6 md:mt-0 text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} Projivy. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
