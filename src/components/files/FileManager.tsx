
import { useState } from "react";
import { FileUpload } from "./FileUpload";
import { FileList } from "./FileList";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FolderOpen } from "lucide-react";

interface FileManagerProps {
  projectId: string;
}

export function FileManager({ projectId }: FileManagerProps) {
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const handleFileUploaded = () => {
    setRefreshTrigger(prev => prev + 1);
  };

  return (
    <Card className="bg-gradient-to-br from-card to-card/80">
      <CardHeader>
        <div className="flex items-center gap-2">
          <FolderOpen className="h-5 w-5 text-primary" />
          <CardTitle className="text-transparent bg-gradient-to-r from-primary to-purple-500 bg-clip-text">
            Project Files
          </CardTitle>
        </div>
        <CardDescription>
          Upload and manage documents, images, and other files for this project
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <FileUpload projectId={projectId} onFileUploaded={handleFileUploaded} />
        <FileList projectId={projectId} refreshTrigger={refreshTrigger} />
      </CardContent>
    </Card>
  );
}
