
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Edit, PlusCircle, Trash2 } from "lucide-react";

interface ProjectActionsProps {
  projectId: string;
  onNewTask: () => void;
  onDeleteProject: () => void;
}

export function ProjectActions({ 
  projectId, 
  onNewTask, 
  onDeleteProject 
}: ProjectActionsProps) {
  const navigate = useNavigate();
  
  const handleEditProject = () => {
    navigate(`/projects/edit/${projectId}`);
  };

  return (
    <div className="flex items-center gap-2">
      <Button 
        onClick={handleEditProject}
        className="bg-gradient-to-r from-secondary to-secondary/80 hover:opacity-90 shadow-md hover:shadow-lg hover:scale-105 transition-all"
      >
        <Edit className="h-4 w-4 mr-1" />
        Edit
      </Button>
      <Button 
        onClick={onNewTask}
        className="bg-gradient-to-r from-primary to-purple-500 hover:opacity-90 shadow-md hover:shadow-lg hover:scale-105 transition-all"
      >
        <PlusCircle className="mr-2 h-4 w-4" />
        New Task
      </Button>
      <Button
        onClick={onDeleteProject}
        variant="destructive"
        size="icon"
        className="hover:bg-destructive/90 hover:scale-105 transition-all"
      >
        <Trash2 className="h-4 w-4" />
      </Button>
    </div>
  );
}
