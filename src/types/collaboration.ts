
export interface Comment {
  id: string;
  content: string;
  author: {
    id: string;
    name: string;
    avatarUrl?: string;
  };
  mentions: string[]; // Array of user IDs that were mentioned
  createdAt: Date;
  updatedAt: Date;
  replies?: Comment[];
  parentId?: string;
}

export interface Discussion {
  id: string;
  title: string;
  description: string;
  projectId: string;
  taskId?: string;
  author: {
    id: string;
    name: string;
    avatarUrl?: string;
  };
  status: 'open' | 'resolved' | 'closed';
  priority: 'low' | 'medium' | 'high';
  tags: string[];
  participants: string[]; // Array of user IDs
  comments: Comment[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Mention {
  id: string;
  userId: string;
  commentId: string;
  discussionId?: string;
  isRead: boolean;
  createdAt: Date;
}
