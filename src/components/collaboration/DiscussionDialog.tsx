
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Clock, Tag, Users, X } from "lucide-react";
import { Discussion, Comment } from "@/types/collaboration";
import { CommentBox } from "./CommentBox";
import { CommentItem } from "./CommentItem";

interface DiscussionDialogProps {
  discussion: Discussion | null;
  isOpen: boolean;
  onClose: () => void;
  onAddComment: (content: string, mentions: string[]) => void;
  onReplyToComment: (content: string, mentions: string[], parentId: string) => void;
}

export function DiscussionDialog({ 
  discussion, 
  isOpen, 
  onClose, 
  onAddComment, 
  onReplyToComment 
}: DiscussionDialogProps) {
  if (!discussion) return null;

  const statusColors = {
    open: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
    resolved: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
    closed: "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200",
  };

  const priorityColors = {
    low: "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200",
    medium: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
    high: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
  };

  const timeAgo = (date: Date) => {
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
    
    if (diffInSeconds < 60) return 'just now';
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
    return `${Math.floor(diffInSeconds / 86400)}d ago`;
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] flex flex-col">
        <DialogHeader>
          <div className="flex items-start justify-between">
            <div className="flex-1 min-w-0">
              <DialogTitle className="text-lg font-semibold leading-tight mb-2">
                {discussion.title}
              </DialogTitle>
              <div className="flex items-center gap-2 mb-2">
                <Badge className={statusColors[discussion.status]}>
                  {discussion.status}
                </Badge>
                <Badge className={priorityColors[discussion.priority]}>
                  {discussion.priority}
                </Badge>
              </div>
            </div>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </DialogHeader>

        <div className="flex-1 flex flex-col min-h-0">
          <div className="space-y-4 mb-4">
            <p className="text-sm text-muted-foreground">
              {discussion.description}
            </p>
            
            {discussion.tags.length > 0 && (
              <div className="flex items-center gap-2">
                <Tag className="h-4 w-4 text-muted-foreground" />
                <div className="flex flex-wrap gap-1">
                  {discussion.tags.map((tag) => (
                    <Badge key={tag} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
            
            <div className="flex items-center gap-4 text-xs text-muted-foreground">
              <div className="flex items-center gap-1">
                <Avatar className="h-4 w-4">
                  <AvatarImage src={discussion.author.avatarUrl} />
                  <AvatarFallback className="text-[10px]">
                    {discussion.author.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <span>Created by {discussion.author.name}</span>
              </div>
              
              <div className="flex items-center gap-1">
                <Clock className="h-3 w-3" />
                <span>{timeAgo(discussion.createdAt)}</span>
              </div>
              
              <div className="flex items-center gap-1">
                <Users className="h-3 w-3" />
                <span>{discussion.participants.length} participants</span>
              </div>
            </div>
          </div>

          <Separator className="my-4" />

          <div className="flex-1 flex flex-col min-h-0">
            <h3 className="font-medium mb-3">
              Comments ({discussion.comments.length})
            </h3>
            
            <ScrollArea className="flex-1 pr-4">
              <div className="space-y-4">
                {discussion.comments.map((comment) => (
                  <CommentItem
                    key={comment.id}
                    comment={comment}
                    onReply={onReplyToComment}
                    canEdit={false}
                    canDelete={false}
                  />
                ))}
                
                {discussion.comments.length === 0 && (
                  <div className="text-center py-8 text-muted-foreground">
                    <p>No comments yet. Start the discussion!</p>
                  </div>
                )}
              </div>
            </ScrollArea>
            
            <div className="mt-4 pt-4 border-t">
              <CommentBox
                onSubmit={onAddComment}
                placeholder="Add to the discussion..."
              />
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
