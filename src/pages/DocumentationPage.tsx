
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Video, MessageCircle, Download, ArrowLeft, Search, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";

export default function DocumentationPage() {
  const sections = [
    {
      icon: <BookOpen className="h-8 w-8 text-primary" />,
      title: "Getting Started",
      description: "Learn the basics of Projivy and set up your first project.",
      badge: "Essential",
      items: [
        { title: "Quick Start Guide", time: "5 min read" },
        { title: "Creating Your First Project", time: "10 min read" },
        { title: "Inviting Team Members", time: "3 min read" },
        { title: "Basic Task Management", time: "8 min read" }
      ]
    },
    {
      icon: <Video className="h-8 w-8 text-primary" />,
      title: "Video Tutorials",
      description: "Step-by-step video guides for all features.",
      badge: "Popular",
      items: [
        { title: "Project Setup Walkthrough", time: "12 min video" },
        { title: "Advanced Task Management", time: "18 min video" },
        { title: "Team Collaboration Features", time: "15 min video" },
        { title: "Analytics and Reporting", time: "10 min video" }
      ]
    },
    {
      icon: <MessageCircle className="h-8 w-8 text-primary" />,
      title: "FAQ",
      description: "Find answers to commonly asked questions.",
      badge: "Updated",
      items: [
        { title: "Account Management", time: "Quick answers" },
        { title: "Billing and Subscriptions", time: "Quick answers" },
        { title: "Technical Support", time: "Quick answers" },
        { title: "Feature Requests", time: "Quick answers" }
      ]
    },
    {
      icon: <Download className="h-8 w-8 text-primary" />,
      title: "API Documentation",
      description: "Integrate Projivy with your existing tools.",
      badge: "Technical",
      items: [
        { title: "API Reference", time: "Complete guide" },
        { title: "Authentication", time: "Setup guide" },
        { title: "Webhooks", time: "Integration guide" },
        { title: "SDKs and Libraries", time: "Download & docs" }
      ]
    }
  ];

  const quickLinks = [
    "Installation Guide",
    "Project Templates",
    "Keyboard Shortcuts",
    "Mobile App",
    "Integrations",
    "Security"
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
            Documentation
          </h1>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Everything you need to know about using Projivy effectively. From getting started to advanced features.
          </p>
          
          {/* Search Bar */}
          <div className="mt-8 max-w-md mx-auto">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input 
                type="text" 
                placeholder="Search documentation..." 
                className="w-full pl-10 pr-4 py-3 rounded-lg border border-border bg-background/50 backdrop-blur-sm focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300"
              />
            </div>
          </div>
        </div>

        {/* Quick Links */}
        <div className="mb-12 sm:mb-16 animate-slide-in">
          <h2 className="text-xl font-semibold mb-6 text-center">Quick Links</h2>
          <div className="flex flex-wrap justify-center gap-3">
            {quickLinks.map((link, index) => (
              <Button 
                key={index}
                variant="outline" 
                size="sm"
                className="hover:bg-primary/10 hover:scale-105 transition-all duration-300"
              >
                {link}
                <ExternalLink className="h-3 w-3 ml-1" />
              </Button>
            ))}
          </div>
        </div>

        {/* Documentation Sections */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 mb-12 sm:mb-16">
          {sections.map((section, index) => (
            <Card 
              key={index} 
              className="group hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 cursor-pointer border-2 hover:border-primary/20 animate-scale-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between mb-4">
                  <div className="group-hover:scale-110 transition-transform duration-300">
                    {section.icon}
                  </div>
                  <Badge variant="secondary" className="text-xs">
                    {section.badge}
                  </Badge>
                </div>
                <CardTitle className="text-lg sm:text-xl group-hover:text-primary transition-colors duration-300">
                  {section.title}
                </CardTitle>
                <CardDescription className="text-sm sm:text-base">
                  {section.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {section.items.map((item, itemIndex) => (
                    <li key={itemIndex}>
                      <Button 
                        variant="ghost" 
                        className="w-full justify-between p-3 h-auto text-left hover:bg-primary/5 transition-all duration-300 group/item"
                      >
                        <div>
                          <div className="font-medium group-hover/item:text-primary transition-colors">
                            {item.title}
                          </div>
                          <div className="text-xs text-muted-foreground mt-1">
                            {item.time}
                          </div>
                        </div>
                        <ExternalLink className="h-4 w-4 opacity-0 group-hover/item:opacity-100 transition-opacity" />
                      </Button>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Help Section */}
        <div className="text-center bg-muted/30 rounded-2xl p-8 sm:p-12 animate-slide-in">
          <h3 className="text-2xl sm:text-3xl font-semibold mb-4 sm:mb-6">Need More Help?</h3>
          <p className="text-muted-foreground mb-6 sm:mb-8 max-w-2xl mx-auto">
            Can't find what you're looking for? Our support team is here to help you succeed.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-gradient-to-r from-primary to-purple-500 hover:from-primary/90 hover:to-purple-500/90 hover:scale-105 transition-all duration-300">
              Contact Support
            </Button>
            <Button variant="outline" size="lg" className="hover:bg-primary/10 hover:scale-105 transition-all duration-300">
              Join Community
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
