
import React, { useState } from "react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Reply, MoreHorizontal, Edit, Trash2 } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Comment } from "@/types/collaboration";
import { CommentBox } from "./CommentBox";

interface CommentItemProps {
  comment: Comment;
  onReply: (content: string, mentions: string[], parentId: string) => void;
  onEdit?: (commentId: string, content: string) => void;
  onDelete?: (commentId: string) => void;
  canEdit?: boolean;
  canDelete?: boolean;
  level?: number;
}

export function CommentItem({ 
  comment, 
  onReply, 
  onEdit, 
  onDelete, 
  canEdit = false, 
  canDelete = false,
  level = 0 
}: CommentItemProps) {
  const [showReplyBox, setShowReplyBox] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const handleReply = (content: string, mentions: string[]) => {
    onReply(content, mentions, comment.id);
    setShowReplyBox(false);
  };

  const formatContent = (content: string) => {
    // Replace @mentions with styled mentions
    return content.replace(/@(\w+)/g, '<span class="text-primary font-medium">@$1</span>');
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
    <div className={`space-y-3 ${level > 0 ? 'ml-8 border-l-2 border-border/30 pl-4' : ''}`}>
      <Card className="border-border/50">
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <Avatar className="h-8 w-8 flex-shrink-0">
              <AvatarImage src={comment.author.avatarUrl} />
              <AvatarFallback className="text-xs">
                {comment.author.name.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <span className="font-medium text-sm">{comment.author.name}</span>
                <span className="text-xs text-muted-foreground">
                  {timeAgo(comment.createdAt)}
                </span>
                {comment.updatedAt > comment.createdAt && (
                  <span className="text-xs text-muted-foreground">(edited)</span>
                )}
              </div>
              
              <div 
                className="text-sm text-foreground mb-3 break-words"
                dangerouslySetInnerHTML={{ __html: formatContent(comment.content) }}
              />
              
              <div className="flex items-center gap-2">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => setShowReplyBox(!showReplyBox)}
                  className="h-7 px-2 text-xs"
                >
                  <Reply className="h-3 w-3 mr-1" />
                  Reply
                </Button>
                
                {(canEdit || canDelete) && (
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm" className="h-7 w-7 p-0">
                        <MoreHorizontal className="h-3 w-3" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      {canEdit && (
                        <DropdownMenuItem onClick={() => setIsEditing(true)}>
                          <Edit className="h-3 w-3 mr-2" />
                          Edit
                        </DropdownMenuItem>
                      )}
                      {canDelete && (
                        <DropdownMenuItem 
                          onClick={() => onDelete?.(comment.id)}
                          className="text-destructive"
                        >
                          <Trash2 className="h-3 w-3 mr-2" />
                          Delete
                        </DropdownMenuItem>
                      )}
                    </DropdownMenuContent>
                  </DropdownMenu>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      {showReplyBox && (
        <div className="ml-8">
          <CommentBox
            onSubmit={handleReply}
            placeholder={`Reply to ${comment.author.name}...`}
            replyTo={comment}
            onCancel={() => setShowReplyBox(false)}
          />
        </div>
      )}
      
      {comment.replies && comment.replies.map((reply) => (
        <CommentItem
          key={reply.id}
          comment={reply}
          onReply={onReply}
          onEdit={onEdit}
          onDelete={onDelete}
          canEdit={canEdit}
          canDelete={canDelete}
          level={level + 1}
        />
      ))}
    </div>
  );
}
