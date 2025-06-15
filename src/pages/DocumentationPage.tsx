
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpen, Video, MessageCircle, Download } from "lucide-react";

export default function DocumentationPage() {
  const sections = [
    {
      icon: <BookOpen className="h-8 w-8 text-primary" />,
      title: "Getting Started",
      description: "Learn the basics of Projivy and set up your first project.",
      items: [
        "Quick Start Guide",
        "Creating Your First Project",
        "Inviting Team Members",
        "Basic Task Management"
      ]
    },
    {
      icon: <Video className="h-8 w-8 text-primary" />,
      title: "Video Tutorials",
      description: "Step-by-step video guides for all features.",
      items: [
        "Project Setup Walkthrough",
        "Advanced Task Management",
        "Team Collaboration Features",
        "Analytics and Reporting"
      ]
    },
    {
      icon: <MessageCircle className="h-8 w-8 text-primary" />,
      title: "FAQ",
      description: "Find answers to commonly asked questions.",
      items: [
        "Account Management",
        "Billing and Subscriptions",
        "Technical Support",
        "Feature Requests"
      ]
    },
    {
      icon: <Download className="h-8 w-8 text-primary" />,
      title: "API Documentation",
      description: "Integrate Projivy with your existing tools.",
      items: [
        "API Reference",
        "Authentication",
        "Webhooks",
        "SDKs and Libraries"
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-secondary/10">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold mb-6 bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
            Documentation
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Everything you need to know about using Projivy effectively. From getting started to advanced features.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {sections.map((section, index) => (
            <Card key={index} className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <CardHeader>
                <div className="mb-4">{section.icon}</div>
                <CardTitle className="text-xl">{section.title}</CardTitle>
                <CardDescription>{section.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {section.items.map((item, itemIndex) => (
                    <li key={itemIndex}>
                      <Button variant="ghost" className="w-full justify-start p-2 h-auto text-left">
                        {item}
                      </Button>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center bg-muted/50 rounded-lg p-8">
          <h3 className="text-2xl font-semibold mb-4">Need More Help?</h3>
          <p className="text-muted-foreground mb-6">
            Can't find what you're looking for? Our support team is here to help.
          </p>
          <Button size="lg" className="bg-gradient-to-r from-primary to-purple-500 hover:from-primary/90 hover:to-purple-500/90">
            Contact Support
          </Button>
        </div>
      </div>
    </div>
  );
}
