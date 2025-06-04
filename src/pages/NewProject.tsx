
import { useState } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import ProjectForm from "@/components/projects/ProjectForm";
import { ProjectTemplateSelector } from "@/components/projects/ProjectTemplateSelector";
import { ProjectTemplate } from "@/types/templates";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import { Link } from "react-router-dom";

export default function NewProject() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<ProjectTemplate | null>(null);
  const [showForm, setShowForm] = useState(false);

  const handleFormSubmit = (isSubmitting: boolean) => {
    setIsSubmitting(isSubmitting);
  };

  const handleSelectTemplate = (template: ProjectTemplate) => {
    setSelectedTemplate(template);
    setShowForm(true);
  };

  const handleSkipTemplate = () => {
    setSelectedTemplate(null);
    setShowForm(true);
  };

  const handleBackToTemplates = () => {
    setShowForm(false);
    setSelectedTemplate(null);
  };

  return (
    <AppLayout>
      <div className="space-y-6 animate-fade-in">
        <div className="flex flex-col space-y-2">
          {!showForm ? (
            <Link to="/projects">
              <Button variant="ghost" size="sm" className="-ml-2 hover:scale-105 transition-transform">
                <ChevronLeft className="h-4 w-4 mr-1" />
                Back to Projects
              </Button>
            </Link>
          ) : (
            <Button 
              variant="ghost" 
              size="sm" 
              className="-ml-2 hover:scale-105 transition-transform"
              onClick={handleBackToTemplates}
            >
              <ChevronLeft className="h-4 w-4 mr-1" />
              Back to Templates
            </Button>
          )}
          
          <h1 className="text-3xl font-bold tracking-tight text-transparent bg-gradient-to-r from-primary to-purple-500 bg-clip-text">
            {!showForm ? "Create New Project" : selectedTemplate ? `Create ${selectedTemplate.name}` : "Create New Project"}
          </h1>
        </div>
        
        <div className="bg-gradient-to-br from-card to-card/90 rounded-lg p-6 border shadow-md animate-slide-in">
          {!showForm ? (
            <ProjectTemplateSelector
              onSelectTemplate={handleSelectTemplate}
              onSkipTemplate={handleSkipTemplate}
            />
          ) : (
            <>
              <ProjectForm 
                onFormSubmitting={handleFormSubmit} 
                selectedTemplate={selectedTemplate}
              />
              {isSubmitting && (
                <div className="fixed inset-0 bg-background/50 backdrop-blur-sm flex items-center justify-center z-50">
                  <div className="bg-card p-6 rounded-lg shadow-lg flex flex-col items-center space-y-4">
                    <div className="w-12 h-12 rounded-full border-4 border-primary border-t-transparent animate-spin"></div>
                    <p className="text-lg font-medium">Creating your project...</p>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </AppLayout>
  );
}
