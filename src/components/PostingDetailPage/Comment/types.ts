import { Dispatch, SetStateAction } from 'react';

export interface Comment {
  id: string;
  createdAt: string;
  updatedAt: string;
  postId: string;
  userId: string;
  content: string;
  parentId: string | null;
  isEdited: boolean;
  isDeleted: boolean;
  user: {
    id: string;
    username: string;
    avatarUrl: string | null;
  };
  likesCount: number;
  likes: string[];
  isLiked: boolean;
}

export interface CommentInputProps {
  onSubmit: (content: string, parentId?: string) => void;
  placeholder?: string;
}

export interface CommentItemProps {
  comment: Comment;
  postId: string;
  showRepliesFor: Set<string>;
  setShowRepliesFor: Dispatch<SetStateAction<Set<string>>>;
}
