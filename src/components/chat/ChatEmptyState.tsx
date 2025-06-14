
import { Button } from "@/components/ui/button";
import { MessageCircle, Plus } from "lucide-react";

interface ChatEmptyStateProps {
  onCreateRoom: () => void;
}

export function ChatEmptyState({ onCreateRoom }: ChatEmptyStateProps) {
  return (
    <div className="flex-1 flex items-center justify-center bg-muted/20">
      <div className="text-center max-w-md">
        <MessageCircle className="h-20 w-20 mx-auto mb-6 text-muted-foreground" />
        <h2 className="text-2xl font-semibold mb-4">Welcome to Team Chat</h2>
        <p className="text-muted-foreground mb-6">
          Select a chat to start messaging or create a new one to get started.
        </p>
        <Button onClick={onCreateRoom}>
          <Plus className="h-4 w-4 mr-2" />
          Create New Chat
        </Button>
      </div>
    </div>
  );
}
