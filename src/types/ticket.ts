export interface Attachment {
  id: number;
  name: string;
  size: string;
  type: string;
  url: string;
}

export interface Comment {
  id: number;
  text: string;
  author: string;
  timestamp: string;
  isInternal: boolean;
}

export interface Ticket {
  id: number;
  title: string;
  description: string;
  status: 'new' | 'in_progress' | 'pending' | 'resolved' | 'closed';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  category: string;
  createdAt: string;
  updatedAt: string;
  customer: {
    name: string;
    email: string;
    phone?: string;
  };
  assignedTo?: string;
  attachments: Attachment[];
  comments: Comment[];
}