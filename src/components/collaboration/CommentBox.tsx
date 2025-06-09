
import React, { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Send, AtSign } from "lucide-react";
import { Comment } from "@/types/collaboration";

interface CommentBoxProps {
  onSubmit: (content: string, mentions: string[]) => void;
  placeholder?: string;
  isSubmitting?: boolean;
  replyTo?: Comment;
  onCancel?: () => void;
}

export function CommentBox({ 
  onSubmit, 
  placeholder = "Write a comment...", 
  isSubmitting = false,
  replyTo,
  onCancel 
}: CommentBoxProps) {
  const [content, setContent] = useState("");
  const [mentions, setMentions] = useState<string[]>([]);
  const [showMentions, setShowMentions] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Mock users for mentions - in real app, this would come from your user service
  const availableUsers = [
    { id: "user1", name: "John Doe", email: "john@example.com" },
    { id: "user2", name: "Jane Smith", email: "jane@example.com" },
    { id: "user3", name: "Mike Johnson", email: "mike@example.com" },
  ];

  const handleSubmit = () => {
    if (!content.trim()) return;
    
    // Extract mentions from content
    const mentionMatches = content.match(/@\w+/g) || [];
    const extractedMentions = mentionMatches.map(mention => 
      mention.replace('@', '')
    );
    
    onSubmit(content, extractedMentions);
    setContent("");
    setMentions([]);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
      e.preventDefault();
      handleSubmit();
    }
    
    if (e.key === '@') {
      setShowMentions(true);
    }
  };

  const insertMention = (user: { id: string; name: string }) => {
    const cursorPosition = textareaRef.current?.selectionStart || 0;
    const beforeCursor = content.substring(0, cursorPosition);
    const afterCursor = content.substring(cursorPosition);
    
    const newContent = beforeCursor + `@${user.name} ` + afterCursor;
    setContent(newContent);
    setMentions(prev => [...prev, user.id]);
    setShowMentions(false);
    
    // Focus back to textarea
    setTimeout(() => {
      textareaRef.current?.focus();
    }, 0);
  };

  return (
    <Card className="border-border/50">
      <CardContent className="p-4">
        {replyTo && (
          <div className="mb-3 p-2 bg-muted/50 rounded text-sm">
            <span className="text-muted-foreground">Replying to </span>
            <span className="font-medium">{replyTo.author.name}</span>
          </div>
        )}
        
        <div className="space-y-3">
          <div className="relative">
            <Textarea
              ref={textareaRef}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={placeholder}
              className="min-h-[80px] resize-none"
            />
            
            {showMentions && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-popover border rounded-md shadow-lg z-50 max-h-48 overflow-y-auto">
                {availableUsers.map((user) => (
                  <button
                    key={user.id}
                    onClick={() => insertMention(user)}
                    className="w-full px-3 py-2 text-left hover:bg-accent flex items-center gap-2 text-sm"
                  >
                    <Avatar className="h-6 w-6">
                      <AvatarFallback className="text-xs">
                        {user.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium">{user.name}</div>
                      <div className="text-xs text-muted-foreground">{user.email}</div>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <AtSign className="h-3 w-3" />
              <span>Use @ to mention team members</span>
            </div>
            
            <div className="flex items-center gap-2">
              {replyTo && (
                <Button variant="outline" size="sm" onClick={onCancel}>
                  Cancel
                </Button>
              )}
              <Button 
                size="sm" 
                onClick={handleSubmit}
                disabled={!content.trim() || isSubmitting}
                className="gap-2"
              >
                <Send className="h-3 w-3" />
                {replyTo ? 'Reply' : 'Comment'}
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
