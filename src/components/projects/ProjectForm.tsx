
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Project, ProjectStatus } from "@/types/project";
import { toast } from "sonner";
import { ProjectService } from "@/services/projectService";

interface ProjectFormProps {
  onFormSubmitting?: (isSubmitting: boolean) => void;
  projectToEdit?: Project;
}

export default function ProjectForm({ onFormSubmitting, projectToEdit }: ProjectFormProps) {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    startDate: "",
    endDate: "",
    status: "active" as ProjectStatus,
  });

  useEffect(() => {
    if (projectToEdit) {
      setFormData({
        name: projectToEdit.name,
        description: projectToEdit.description,
        startDate: projectToEdit.startDate.toISOString().split('T')[0],
        endDate: projectToEdit.endDate.toISOString().split('T')[0],
        status: projectToEdit.status,
      });
    }
  }, [projectToEdit]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name.trim()) {
      toast.error("Project name is required");
      return;
    }

    if (!formData.startDate || !formData.endDate) {
      toast.error("Start date and end date are required");
      return;
    }

    const startDate = new Date(formData.startDate);
    const endDate = new Date(formData.endDate);

    if (endDate <= startDate) {
      toast.error("End date must be after start date");
      return;
    }

    setIsSubmitting(true);
    onFormSubmitting?.(true);

    try {
      const projectData = {
        name: formData.name.trim(),
        description: formData.description.trim(),
        startDate,
        endDate,
        status: formData.status,
        progress: projectToEdit?.progress || 0,
        tasks: projectToEdit?.tasks || [],
      };

      if (projectToEdit) {
        // Update existing project
        const success = await ProjectService.updateProject(projectToEdit.id, projectData);
        if (success) {
          toast.success("Project updated successfully!");
          navigate(`/projects/${projectToEdit.id}`);
        } else {
          toast.error("Failed to update project");
        }
      } else {
        // Create new project
        const newProject = await ProjectService.createProject(projectData);
        if (newProject) {
          toast.success("Project created successfully!");
          navigate("/projects");
        } else {
          toast.error("Failed to create project");
        }
      }
    } catch (error) {
      console.error("Error saving project:", error);
      toast.error("Failed to save project");
    } finally {
      setIsSubmitting(false);
      onFormSubmitting?.(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="name">Project Name *</Label>
        <Input
          id="name"
          type="text"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          placeholder="Enter project name"
          required
          className="focus:ring-2 focus:ring-primary/50"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          placeholder="Enter project description"
          rows={4}
          className="focus:ring-2 focus:ring-primary/50"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="startDate">Start Date *</Label>
          <Input
            id="startDate"
            type="date"
            value={formData.startDate}
            onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
            required
            className="focus:ring-2 focus:ring-primary/50"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="endDate">End Date *</Label>
          <Input
            id="endDate"
            type="date"
            value={formData.endDate}
            onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
            required
            className="focus:ring-2 focus:ring-primary/50"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="status">Status</Label>
        <Select value={formData.status} onValueChange={(value: ProjectStatus) => setFormData({ ...formData, status: value })}>
          <SelectTrigger className="focus:ring-2 focus:ring-primary/50">
            <SelectValue placeholder="Select status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="completed">Completed</SelectItem>
            <SelectItem value="on-hold">On Hold</SelectItem>
            <SelectItem value="cancelled">Cancelled</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex gap-4 pt-4">
        <Button
          type="button"
          variant="outline"
          onClick={() => navigate("/projects")}
          disabled={isSubmitting}
          className="flex-1"
        >
          Cancel
        </Button>
        <Button
          type="submit"
          disabled={isSubmitting}
          className="flex-1 bg-gradient-to-r from-primary to-purple-500 hover:opacity-90"
        >
          {isSubmitting ? (
            <div className="flex items-center">
              <div className="animate-spin rounded-full h-4 w-4 border-2 border-white/30 border-t-white mr-2"></div>
              {projectToEdit ? "Updating..." : "Creating..."}
            </div>
          ) : (
            projectToEdit ? "Update Project" : "Create Project"
          )}
        </Button>
      </div>
    </form>
  );
}
