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
  onSubmit: (content: string, hasTag: boolean) => void;
  placeholder?: string;
  mentionedUser?: {
    username: string;
    id: string;
  };
}

export interface CommentItemProps {
  comment: Comment;
  postId: string;
}

export interface TagCommentProps {
  content: string;
}
