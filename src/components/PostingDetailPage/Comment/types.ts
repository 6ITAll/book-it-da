export interface Comment {
  id: string;
  userId: string;
  username: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  isEdited: boolean;
  parentId: string | null;
  likes: number;
  isLiked: boolean;
  replyCount?: number;
}

export interface CommentInputProps {
  onSubmit: (content: string, parentId?: string) => void;
  placeholder?: string;
}

export interface CommentItemProps {
  comment: Comment;
  onReply: (content: string, parentId: string) => void;
  onToggleReplies?: (commentId: string) => void;
  onLike: (commentId: string) => void;
  onEdit: (commentId: string, newContent: string) => void;
  onDelete: (commentId: string) => void;
}
