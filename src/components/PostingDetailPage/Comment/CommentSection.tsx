import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Box, Typography, Divider } from '@mui/material';
import CommentItem from './CommentItem';
import CommentInput from './CommentInput';
import { Comment } from './types';
import { RootState } from '@store/index';
import { UserInfo } from '@features/user/userSlice';

const CommentSection = () => {
  const { id: currentUserId, username: currentUsername } = useSelector(
    (state: RootState) => state.user.userInfo as UserInfo,
  );
  const [comments, setComments] = useState<Comment[]>([]);
  const [showRepliesFor, setShowRepliesFor] = useState<Set<string>>(new Set());

  const handleNewComment = (content: string) => {
    const newComment: Comment = {
      id: Date.now().toString(),
      userId: currentUserId,
      username: currentUsername,
      content,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      isEdited: false,
      parentId: null,
      likes: 0,
      isLiked: false,
      replyCount: 0,
    };
    setComments((prev) => [...prev, newComment]);
  };

  const handleReply = (content: string, parentId: string) => {
    const newReply: Comment = {
      id: Date.now().toString(),
      userId: currentUserId,
      username: currentUsername,
      content,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      isEdited: false,
      parentId,
      likes: 0,
      isLiked: false,
    };
    setComments((prev) => {
      const updatedComments = [...prev, newReply];
      return updatedComments.map((comment) =>
        comment.id === parentId
          ? { ...comment, replyCount: (comment.replyCount || 0) + 1 }
          : comment,
      );
    });
  };

  const handleToggleReplies = (commentId: string) => {
    setShowRepliesFor((prev) => {
      const next = new Set(prev);
      if (next.has(commentId)) {
        next.delete(commentId);
      } else {
        next.add(commentId);
      }
      return next;
    });
  };

  const handleLike = (commentId: string) => {
    setComments((prev) =>
      prev.map((comment) => {
        if (comment.id === commentId) {
          return {
            ...comment,
            likes: comment.isLiked ? comment.likes - 1 : comment.likes + 1,
            isLiked: !comment.isLiked,
          };
        }
        return comment;
      }),
    );
  };

  const handleEdit = (commentId: string, newContent: string) => {
    setComments((prev) =>
      prev.map((comment) => {
        if (comment.id === commentId) {
          return {
            ...comment,
            content: newContent,
            isEdited: true,
            updatedAt: new Date().toISOString(),
          };
        }
        return comment;
      }),
    );
  };

  const handleDelete = (commentId: string) => {
    setComments((prev) => {
      const commentToDelete = prev.find((c) => c.id === commentId);
      if (!commentToDelete) return prev;

      const updatedComments = prev
        .filter((c) => c.id !== commentId)
        .map((comment) => {
          if (
            commentToDelete.parentId &&
            comment.id === commentToDelete.parentId
          ) {
            return {
              ...comment,
              replyCount: (comment.replyCount || 0) - 1,
            };
          }
          return comment;
        });

      return updatedComments.filter((c) => c.parentId !== commentId);
    });
  };

  return (
    <Box sx={{ mt: 4, p: 2, borderRadius: 2, width: '100%' }}>
      <Typography variant="h6" sx={{ mb: 2 }}>
        댓글
      </Typography>
      <Divider sx={{ mb: 2 }} />

      {comments
        .filter((comment) => !comment.parentId)
        .sort(
          (a, b) =>
            new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
        )
        .map((comment) => (
          <Box key={comment.id}>
            <CommentItem
              comment={comment}
              onReply={handleReply}
              onToggleReplies={handleToggleReplies}
              onLike={handleLike}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
            {showRepliesFor.has(comment.id) && (
              <Box sx={{ ml: 5 }}>
                {comments
                  .filter((reply) => reply.parentId === comment.id)
                  .sort(
                    (a, b) =>
                      new Date(a.createdAt).getTime() -
                      new Date(b.createdAt).getTime(),
                  )
                  .map((reply) => (
                    <CommentItem
                      key={reply.id}
                      comment={reply}
                      onReply={handleReply}
                      onLike={handleLike}
                      onEdit={handleEdit}
                      onDelete={handleDelete}
                    />
                  ))}
              </Box>
            )}
          </Box>
        ))}

      <Box sx={{ mt: 2 }}>
        <CommentInput onSubmit={handleNewComment} />
      </Box>
    </Box>
  );
};

export default CommentSection;
