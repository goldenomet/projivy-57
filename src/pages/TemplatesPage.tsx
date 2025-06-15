
import { useState } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { FileText, Plus, Briefcase, Code, Palette, Heart, Zap, Settings } from "lucide-react";
import { toast } from "sonner";

interface ProjectTemplate {
  id: string;
  name: string;
  description: string;
  category: string;
  icon: React.ReactNode;
  tasks: string[];
  isPremium?: boolean;
}

export default function TemplatesPage() {
  const [templates, setTemplates] = useState<ProjectTemplate[]>([
    {
      id: "marketing",
      name: "Marketing Campaign",
      description: "Launch a comprehensive marketing campaign with all necessary tasks",
      category: "Marketing",
      icon: <Zap className="h-6 w-6" />,
      tasks: ["Market research", "Content creation", "Social media setup", "Campaign launch", "Performance analysis"],
      isPremium: false
    },
    {
      id: "software",
      name: "Software Development",
      description: "Full software development lifecycle from planning to deployment",
      category: "Development",
      icon: <Code className="h-6 w-6" />,
      tasks: ["Requirements gathering", "System design", "Development", "Testing", "Deployment", "Documentation"],
      isPremium: true
    },
    {
      id: "event",
      name: "Event Planning",
      description: "Organize and execute successful events from start to finish",
      category: "Events",
      icon: <Heart className="h-6 w-6" />,
      tasks: ["Venue booking", "Vendor coordination", "Marketing", "Registration setup", "Event execution", "Follow-up"],
      isPremium: false
    },
    {
      id: "design",
      name: "Design Project",
      description: "Complete design workflow for brand or product design projects",
      category: "Design",
      icon: <Palette className="h-6 w-6" />,
      tasks: ["Discovery", "Research", "Wireframing", "Design", "Prototyping", "Testing", "Handoff"],
      isPremium: true
    }
  ]);

  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [newTemplate, setNewTemplate] = useState({
    name: "",
    description: "",
    category: "",
    tasks: ""
  });

  const handleCreateTemplate = () => {
    if (!newTemplate.name || !newTemplate.description) {
      toast.error("Please fill in all required fields");
      return;
    }

    const template: ProjectTemplate = {
      id: `custom-${Date.now()}`,
      name: newTemplate.name,
      description: newTemplate.description,
      category: newTemplate.category || "Custom",
      icon: <FileText className="h-6 w-6" />,
      tasks: newTemplate.tasks.split('\n').filter(task => task.trim()),
      isPremium: false
    };

    setTemplates(prev => [...prev, template]);
    setNewTemplate({ name: "", description: "", category: "", tasks: "" });
    setIsCreateDialogOpen(false);
    toast.success("Template created successfully!");
  };

  const useTemplate = (template: ProjectTemplate) => {
    if (template.isPremium) {
      toast.error("This is a premium template. Upgrade to access it.");
      return;
    }
    toast.success(`Using template: ${template.name}`);
    // In a real app, this would navigate to project creation with pre-filled data
  };

  return (
    <AppLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FileText className="h-6 w-6" />
            <h1 className="text-2xl font-bold">Project Templates</h1>
          </div>
          
          <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
            <DialogTrigger asChild>
              <Button className="gap-2">
                <Plus className="h-4 w-4" />
                Create Template
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create Custom Template</DialogTitle>
                <DialogDescription>
                  Create a reusable project template with predefined tasks and structure.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="name">Template Name</Label>
                  <Input
                    id="name"
                    value={newTemplate.name}
                    onChange={(e) => setNewTemplate(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="Enter template name"
                  />
                </div>
                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={newTemplate.description}
                    onChange={(e) => setNewTemplate(prev => ({ ...prev, description: e.target.value }))}
                    placeholder="Describe what this template is for"
                  />
                </div>
                <div>
                  <Label htmlFor="category">Category</Label>
                  <Input
                    id="category"
                    value={newTemplate.category}
                    onChange={(e) => setNewTemplate(prev => ({ ...prev, category: e.target.value }))}
                    placeholder="e.g., Marketing, Development, Design"
                  />
                </div>
                <div>
                  <Label htmlFor="tasks">Tasks (one per line)</Label>
                  <Textarea
                    id="tasks"
                    value={newTemplate.tasks}
                    onChange={(e) => setNewTemplate(prev => ({ ...prev, tasks: e.target.value }))}
                    placeholder="Task 1&#10;Task 2&#10;Task 3"
                    rows={5}
                  />
                </div>
                <Button onClick={handleCreateTemplate} className="w-full">
                  Create Template
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {templates.map((template) => (
            <Card key={template.id} className="relative group hover:shadow-lg transition-all duration-300">
              {template.isPremium && (
                <div className="absolute top-4 right-4">
                  <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">
                    Premium
                  </Badge>
                </div>
              )}
              
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-primary/10 text-primary">
                    {template.icon}
                  </div>
                  <div>
                    <CardTitle className="text-lg">{template.name}</CardTitle>
                    <Badge variant="outline" className="text-xs">
                      {template.category}
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <CardDescription>{template.description}</CardDescription>
                
                <div>
                  <p className="text-sm font-medium mb-2">Included Tasks:</p>
                  <div className="space-y-1">
                    {template.tasks.slice(0, 3).map((task, index) => (
                      <div key={index} className="text-xs text-muted-foreground flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary/60" />
                        {task}
                      </div>
                    ))}
                    {template.tasks.length > 3 && (
                      <div className="text-xs text-muted-foreground">
                        +{template.tasks.length - 3} more tasks
                      </div>
                    )}
                  </div>
                </div>
                
                <Button 
                  onClick={() => useTemplate(template)}
                  className="w-full"
                  variant={template.isPremium ? "outline" : "default"}
                >
                  {template.isPremium ? "Upgrade to Use" : "Use Template"}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Settings className="h-5 w-5" />
              <CardTitle>Template Management</CardTitle>
            </div>
            <CardDescription>
              Enterprise users can create unlimited custom templates and share them across the organization.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex gap-4">
              <Button variant="outline">
                <Briefcase className="h-4 w-4 mr-2" />
                Organization Templates
              </Button>
              <Button variant="outline">
                Import Template
              </Button>
              <Button variant="outline">
                Export Templates
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}
