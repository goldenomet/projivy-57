
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle, Layers, Users } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-background to-background/90">
      {/* Header */}
      <header className="w-full py-4 px-6 md:px-10 flex items-center justify-between bg-gradient-to-r from-background/80 to-background backdrop-blur-sm border-b border-border/30 sticky top-0 z-10">
        <div className="flex items-center gap-2">
          <div className="size-8 rounded-md bg-gradient-to-br from-primary to-purple-500 flex items-center justify-center text-white font-bold">
            E
          </div>
          <h1 className="font-bold text-xl bg-gradient-to-r from-primary to-purple-500 bg-clip-text text-transparent">
            Evolve IQ
          </h1>
        </div>
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
          <Link to="/">
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
        </div>
        
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-transparent bg-gradient-to-r from-primary to-purple-500 bg-clip-text animate-slide-in">
            Evolve Your Project Management
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto">
            Streamline your workflow, enhance team collaboration, and deliver projects on time with our intuitive platform.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-10">
            <Link to="/">
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

        <div className="mt-16 w-full max-w-5xl">
          <div className="relative w-full aspect-video rounded-lg overflow-hidden shadow-2xl border border-primary/20">
            <div className="absolute inset-0 bg-gradient-to-br from-background/95 to-background/80 flex items-center justify-center">
              <div className="w-16 h-16 rounded-full border-4 border-primary border-t-transparent animate-spin"></div>
            </div>
            <img 
              src="https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" 
              alt="Project Dashboard Preview" 
              className="w-full h-full object-cover opacity-90"
              onLoad={(e) => e.currentTarget.previousSibling?.remove()}
            />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6 md:px-10 bg-gradient-to-b from-background to-card/50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-transparent bg-gradient-to-r from-primary to-purple-500 bg-clip-text">
            Powerful Features for Modern Teams
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="bg-gradient-to-br from-card to-card/90 backdrop-blur-sm border border-border/50 shadow-md hover:shadow-lg transition-all hover:translate-y-[-5px] duration-300">
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

            <Card className="bg-gradient-to-br from-card to-card/90 backdrop-blur-sm border border-border/50 shadow-md hover:shadow-lg transition-all hover:translate-y-[-5px] duration-300">
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

            <Card className="bg-gradient-to-br from-card to-card/90 backdrop-blur-sm border border-border/50 shadow-md hover:shadow-lg transition-all hover:translate-y-[-5px] duration-300">
              <CardHeader>
                <div className="size-12 rounded-lg bg-gradient-to-br from-green-400/20 to-green-600/20 flex items-center justify-center mb-4">
                  <Layers className="h-6 w-6 text-green-500" />
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
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 md:px-10">
        <div className="max-w-4xl mx-auto text-center">
          <div className="relative bg-gradient-to-r from-primary/20 to-purple-500/20 rounded-lg p-10 overflow-hidden border border-primary/30 shadow-lg">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(155,135,245,0.4),transparent_60%)]"></div>
            <div className="relative z-10">
              <h2 className="text-3xl font-bold mb-4 text-transparent bg-gradient-to-r from-primary to-purple-500 bg-clip-text">Ready to Transform Your Workflow?</h2>
              <p className="text-lg mb-8 text-foreground/80">Join thousands of teams already using Evolve IQ to streamline their project management</p>
              <Link to="/">
                <Button size="lg" className="bg-gradient-to-r from-primary to-purple-500 hover:opacity-90 shadow-md hover:shadow-lg transition-all">
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
          <div className="flex items-center gap-2 mb-6 md:mb-0">
            <div className="size-8 rounded-md bg-gradient-to-br from-primary to-purple-500 flex items-center justify-center text-white font-bold">
              E
            </div>
            <h1 className="font-bold text-xl bg-gradient-to-r from-primary to-purple-500 bg-clip-text text-transparent">
              Evolve IQ
            </h1>
          </div>
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
            &copy; {new Date().getFullYear()} Evolve IQ. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
