
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { MessageSquare, Clock, Tag, Users } from "lucide-react";
import { Discussion } from "@/types/collaboration";

interface DiscussionCardProps {
  discussion: Discussion;
  onClick: () => void;
}

export function DiscussionCard({ discussion, onClick }: DiscussionCardProps) {
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
    <Card className="cursor-pointer hover:bg-accent/50 transition-colors" onClick={onClick}>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <CardTitle className="text-base font-medium leading-tight">
            {discussion.title}
          </CardTitle>
          <div className="flex items-center gap-1">
            <Badge className={statusColors[discussion.status]}>
              {discussion.status}
            </Badge>
            <Badge className={priorityColors[discussion.priority]}>
              {discussion.priority}
            </Badge>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="pt-0">
        <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
          {discussion.description}
        </p>
        
        {discussion.tags.length > 0 && (
          <div className="flex items-center gap-1 mb-3">
            <Tag className="h-3 w-3 text-muted-foreground" />
            <div className="flex flex-wrap gap-1">
              {discussion.tags.map((tag) => (
                <Badge key={tag} variant="outline" className="text-xs">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
        )}
        
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1">
              <Avatar className="h-4 w-4">
                <AvatarImage src={discussion.author.avatarUrl} />
                <AvatarFallback className="text-[10px]">
                  {discussion.author.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <span>{discussion.author.name}</span>
            </div>
            
            <div className="flex items-center gap-1">
              <MessageSquare className="h-3 w-3" />
              <span>{discussion.comments.length}</span>
            </div>
            
            <div className="flex items-center gap-1">
              <Users className="h-3 w-3" />
              <span>{discussion.participants.length}</span>
            </div>
          </div>
          
          <div className="flex items-center gap-1">
            <Clock className="h-3 w-3" />
            <span>{timeAgo(discussion.updatedAt)}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
