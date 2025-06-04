
import { useState } from 'react';
import { ProjectTemplate } from '@/types/templates';
import { projectTemplates, templateCategories } from '@/data/projectTemplates';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Clock, FileText, Tag } from 'lucide-react';
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
    return IconComponent ? <IconComponent className="h-6 w-6" /> : <FileText className="h-6 w-6" />;
  };

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold">Choose a Project Template</h2>
        <p className="text-muted-foreground">
          Start with a pre-built template or create from scratch
        </p>
      </div>

      <div className="flex flex-wrap gap-2 justify-center">
        {templateCategories.map((category) => (
          <Button
            key={category}
            variant={selectedCategory === category ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedCategory(category)}
            className="transition-all"
          >
            {category}
          </Button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredTemplates.map((template, index) => (
          <Card 
            key={template.id} 
            className={cn(
              "cursor-pointer transition-all hover:shadow-lg hover:scale-[1.02] animate-fade-in",
              "bg-gradient-to-br from-card to-card/90"
            )}
            style={{ animationDelay: `${index * 0.1}s` }}
            onClick={() => onSelectTemplate(template)}
          >
            <CardHeader className="pb-3">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-primary/10 text-primary">
                  {getIcon(template.icon)}
                </div>
                <div className="flex-1">
                  <CardTitle className="text-lg leading-tight">{template.name}</CardTitle>
                  <div className="flex items-center gap-1 text-sm text-muted-foreground mt-1">
                    <Clock className="h-3 w-3" />
                    {template.estimatedDuration} days
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <CardDescription className="text-sm">
                {template.description}
              </CardDescription>
              
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <FileText className="h-3 w-3" />
                {template.tasks.length} tasks included
              </div>

              <div className="flex flex-wrap gap-1">
                {template.tags.slice(0, 3).map((tag) => (
                  <Badge key={tag} variant="secondary" className="text-xs">
                    {tag}
                  </Badge>
                ))}
                {template.tags.length > 3 && (
                  <Badge variant="outline" className="text-xs">
                    +{template.tags.length - 3} more
                  </Badge>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="flex justify-center">
        <Button 
          variant="outline" 
          onClick={onSkipTemplate}
          className="hover:bg-muted/50 transition-colors"
        >
          Start from scratch instead
        </Button>
      </div>
    </div>
  );
}
