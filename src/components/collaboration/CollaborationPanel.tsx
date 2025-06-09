
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MessageSquare, Plus, Search } from "lucide-react";
import { Discussion, Comment } from "@/types/collaboration";
import { DiscussionCard } from "./DiscussionCard";
import { DiscussionDialog } from "./DiscussionDialog";
import { CommentBox } from "./CommentBox";
import { CommentItem } from "./CommentItem";

interface CollaborationPanelProps {
  projectId: string;
  taskId?: string;
}

export function CollaborationPanel({ projectId, taskId }: CollaborationPanelProps) {
  const [activeTab, setActiveTab] = useState("comments");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDiscussion, setSelectedDiscussion] = useState<Discussion | null>(null);
  const [isDiscussionDialogOpen, setIsDiscussionDialogOpen] = useState(false);

  // Mock data - in real app, this would come from your backend
  const [discussions, setDiscussions] = useState<Discussion[]>([
    {
      id: "disc1",
      title: "UI Design Review",
      description: "Let's review the new dashboard design and discuss any changes needed before implementation.",
      projectId,
      taskId,
      author: {
        id: "user1",
        name: "John Doe",
        avatarUrl: undefined,
      },
      status: "open",
      priority: "high",
      tags: ["design", "review"],
      participants: ["user1", "user2", "user3"],
      comments: [
        {
          id: "comment1",
          content: "The color scheme looks great! @Jane what do you think about the navigation?",
          author: {
            id: "user1",
            name: "John Doe",
          },
          mentions: ["user2"],
          createdAt: new Date(Date.now() - 3600000),
          updatedAt: new Date(Date.now() - 3600000),
        },
      ],
      createdAt: new Date(Date.now() - 7200000),
      updatedAt: new Date(Date.now() - 3600000),
    },
  ]);

  const [comments, setComments] = useState<Comment[]>([
    {
      id: "comment2",
      content: "Great progress on this task! @Mike can you review the implementation?",
      author: {
        id: "user1",
        name: "John Doe",
      },
      mentions: ["user3"],
      createdAt: new Date(Date.now() - 1800000),
      updatedAt: new Date(Date.now() - 1800000),
    },
  ]);

  const handleAddComment = (content: string, mentions: string[]) => {
    const newComment: Comment = {
      id: `comment${Date.now()}`,
      content,
      author: {
        id: "current-user",
        name: "Current User",
      },
      mentions,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    
    setComments(prev => [...prev, newComment]);
  };

  const handleReplyToComment = (content: string, mentions: string[], parentId: string) => {
    const newReply: Comment = {
      id: `reply${Date.now()}`,
      content,
      author: {
        id: "current-user",
        name: "Current User",
      },
      mentions,
      parentId,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    
    setComments(prev => {
      const updated = [...prev];
      const parentIndex = updated.findIndex(c => c.id === parentId);
      if (parentIndex !== -1) {
        if (!updated[parentIndex].replies) {
          updated[parentIndex].replies = [];
        }
        updated[parentIndex].replies!.push(newReply);
      }
      return updated;
    });
  };

  const handleAddDiscussionComment = (content: string, mentions: string[]) => {
    if (!selectedDiscussion) return;
    
    const newComment: Comment = {
      id: `comment${Date.now()}`,
      content,
      author: {
        id: "current-user",
        name: "Current User",
      },
      mentions,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    
    setDiscussions(prev => prev.map(disc => 
      disc.id === selectedDiscussion.id
        ? { ...disc, comments: [...disc.comments, newComment] }
        : disc
    ));
    
    setSelectedDiscussion(prev => prev ? { ...prev, comments: [...prev.comments, newComment] } : null);
  };

  const handleReplyToDiscussionComment = (content: string, mentions: string[], parentId: string) => {
    if (!selectedDiscussion) return;
    
    const newReply: Comment = {
      id: `reply${Date.now()}`,
      content,
      author: {
        id: "current-user",
        name: "Current User",
      },
      mentions,
      parentId,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    
    setDiscussions(prev => prev.map(disc => {
      if (disc.id === selectedDiscussion.id) {
        const updatedComments = [...disc.comments];
        const parentIndex = updatedComments.findIndex(c => c.id === parentId);
        if (parentIndex !== -1) {
          if (!updatedComments[parentIndex].replies) {
            updatedComments[parentIndex].replies = [];
          }
          updatedComments[parentIndex].replies!.push(newReply);
        }
        return { ...disc, comments: updatedComments };
      }
      return disc;
    }));
    
    setSelectedDiscussion(prev => {
      if (!prev) return null;
      const updatedComments = [...prev.comments];
      const parentIndex = updatedComments.findIndex(c => c.id === parentId);
      if (parentIndex !== -1) {
        if (!updatedComments[parentIndex].replies) {
          updatedComments[parentIndex].replies = [];
        }
        updatedComments[parentIndex].replies!.push(newReply);
      }
      return { ...prev, comments: updatedComments };
    });
  };

  const filteredDiscussions = discussions.filter(discussion =>
    discussion.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    discussion.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageSquare className="h-5 w-5" />
            Collaboration
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="comments">Comments</TabsTrigger>
              <TabsTrigger value="discussions">Discussions</TabsTrigger>
            </TabsList>
            
            <TabsContent value="comments" className="space-y-4">
              <div className="space-y-4">
                {comments.map((comment) => (
                  <CommentItem
                    key={comment.id}
                    comment={comment}
                    onReply={handleReplyToComment}
                    canEdit={true}
                    canDelete={true}
                  />
                ))}
                
                {comments.length === 0 && (
                  <div className="text-center py-8 text-muted-foreground">
                    <p>No comments yet. Start the conversation!</p>
                  </div>
                )}
              </div>
              
              <CommentBox
                onSubmit={handleAddComment}
                placeholder="Add a comment..."
              />
            </TabsContent>
            
            <TabsContent value="discussions" className="space-y-4">
              <div className="flex items-center gap-2">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search discussions..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-9"
                  />
                </div>
                <Button size="sm" className="gap-2">
                  <Plus className="h-4 w-4" />
                  New Discussion
                </Button>
              </div>
              
              <div className="space-y-3">
                {filteredDiscussions.map((discussion) => (
                  <DiscussionCard
                    key={discussion.id}
                    discussion={discussion}
                    onClick={() => {
                      setSelectedDiscussion(discussion);
                      setIsDiscussionDialogOpen(true);
                    }}
                  />
                ))}
                
                {filteredDiscussions.length === 0 && (
                  <div className="text-center py-8 text-muted-foreground">
                    <p>No discussions found.</p>
                    <Button size="sm" className="mt-2 gap-2">
                      <Plus className="h-4 w-4" />
                      Start a Discussion
                    </Button>
                  </div>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
      
      <DiscussionDialog
        discussion={selectedDiscussion}
        isOpen={isDiscussionDialogOpen}
        onClose={() => {
          setIsDiscussionDialogOpen(false);
          setSelectedDiscussion(null);
        }}
        onAddComment={handleAddDiscussionComment}
        onReplyToComment={handleReplyToDiscussionComment}
      />
    </div>
  );
}
