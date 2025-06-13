
import { useState } from 'react';
import { ProjectTemplate } from '@/types/templates';
import { projectTemplates, templateCategories } from '@/data/projectTemplates';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Clock, FileText, Tag, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import * as LucideIcons from 'lucide-react';

interface ProjectTemplateSelectorProps {
  onSelectTemplate: (template: ProjectTemplate) => void;
  onSkipTemplate: () => void;
}

export function ProjectTemplateSelector({ onSelectTemplate, onSkipTemplate }: ProjectTemplateSelectorProps) {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredTemplates = selectedCategory === 'All' 
    ? projectTemplates 
    : projectTemplates.filter(template => template.category === selectedCategory);

  const getIcon = (iconName: string) => {
    const IconComponent = (LucideIcons as any)[iconName];
    return IconComponent ? <IconComponent className="h-8 w-8" /> : <FileText className="h-8 w-8" />;
  };

  const getTemplateImage = (template: ProjectTemplate) => {
    // Map template categories to Unsplash images
    const imageMap: Record<string, string> = {
      'Software Development': 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=200&fit=crop',
      'Marketing': 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=200&fit=crop',
      'Business': 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=400&h=200&fit=crop',
      'Education': 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&h=200&fit=crop',
      'Event Planning': 'https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?w=400&h=200&fit=crop',
      'Research': 'https://images.unsplash.com/photo-1605810230434-7631ac76ec81?w=400&h=200&fit=crop'
    };
    
    return imageMap[template.category] || 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=400&h=200&fit=crop';
  };

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8">
      {/* Header Section */}
      <div className="text-center space-y-4 pb-2">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full text-primary text-sm font-medium">
          <FileText className="h-4 w-4" />
          Project Templates
        </div>
        <h1 className="text-4xl font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
          Choose your starting point
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Jump-start your project with professionally designed templates, or start from scratch if you prefer a clean slate.
        </p>
      </div>

      {/* Category Pills */}
      <div className="flex flex-wrap gap-2 justify-center p-4 bg-muted/30 rounded-2xl border">
        {templateCategories.map((category) => (
          <Button
            key={category}
            variant={selectedCategory === category ? "default" : "ghost"}
            size="sm"
            onClick={() => setSelectedCategory(category)}
            className={cn(
              "rounded-full px-4 py-2 transition-all duration-200",
              selectedCategory === category 
                ? "bg-primary text-primary-foreground shadow-md hover:bg-primary/90" 
                : "hover:bg-background/80 text-muted-foreground hover:text-foreground"
            )}
          >
            {category}
          </Button>
        ))}
      </div>

      {/* Templates Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTemplates.map((template, index) => (
          <Card 
            key={template.id} 
            className={cn(
              "group cursor-pointer transition-all duration-300 hover:shadow-2xl hover:-translate-y-1",
              "bg-gradient-to-br from-background to-background/95 border-2 hover:border-primary/20",
              "overflow-hidden animate-fade-in"
            )}
            style={{ animationDelay: `${index * 0.1}s` }}
            onClick={() => onSelectTemplate(template)}
          >
            {/* Template Image */}
            <div className="relative h-32 bg-gradient-to-br from-primary/5 to-primary/10 overflow-hidden">
              <img 
                src={getTemplateImage(template)}
                alt={template.name}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
              <div className="absolute top-3 left-3 p-2 rounded-xl bg-background/90 backdrop-blur-sm border border-border/50">
                <div className="text-primary">
                  {getIcon(template.icon)}
                </div>
              </div>
              <div className="absolute top-3 right-3">
                <Badge variant="secondary" className="bg-background/90 backdrop-blur-sm text-xs font-medium">
                  {template.category}
                </Badge>
              </div>
            </div>

            <CardHeader className="pb-3 space-y-3">
              <div className="space-y-2">
                <CardTitle className="text-xl font-semibold leading-tight group-hover:text-primary transition-colors">
                  {template.name}
                </CardTitle>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {template.estimatedDuration} days
                  </div>
                  <div className="flex items-center gap-1">
                    <FileText className="h-3 w-3" />
                    {template.tasks.length} tasks
                  </div>
                </div>
              </div>
            </CardHeader>

            <CardContent className="space-y-4">
              <CardDescription className="text-sm leading-relaxed line-clamp-2">
                {template.description}
              </CardDescription>

              {/* Tags */}
              <div className="flex flex-wrap gap-1">
                {template.tags.slice(0, 3).map((tag) => (
                  <Badge key={tag} variant="outline" className="text-xs px-2 py-1 bg-muted/50">
                    {tag}
                  </Badge>
                ))}
                {template.tags.length > 3 && (
                  <Badge variant="outline" className="text-xs px-2 py-1 bg-primary/5 text-primary">
                    +{template.tags.length - 3}
                  </Badge>
                )}
              </div>

              {/* Action Button */}
              <div className="pt-2">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="w-full justify-between group-hover:bg-primary/5 transition-colors"
                >
                  <span className="text-sm font-medium">Use template</span>
                  <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Skip Template Section */}
      <div className="text-center pt-8 border-t border-border/50">
        <div className="space-y-3">
          <p className="text-muted-foreground">
            Prefer to build from the ground up?
          </p>
          <Button 
            variant="outline" 
            onClick={onSkipTemplate}
            className="rounded-full px-6 hover:bg-muted/80 transition-colors"
            size="lg"
          >
            Start with a blank project
          </Button>
        </div>
      </div>
    </div>
  );
}
