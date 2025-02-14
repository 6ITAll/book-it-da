import { useEffect, useMemo, useState } from 'react';
import {
  Box,
  Avatar,
  Typography,
  Button,
  IconButton,
  Menu,
  MenuItem,
  TextField,
} from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Comment, CommentItemProps } from './types';
import CommentInput from './CommentInput';
import { formatTimeAgo } from '@shared/utils/formatTimeAgo';
import {
  useCreateCommentMutation,
  useDeleteCommentMutation,
  useToggleCommentLikeMutation,
  useUpdateCommentMutation,
} from '@features/PostDetailPage/api/commentApi';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@store/index';
import { UserInfo } from '@features/user/userSlice';
import {
  editComment,
  removeComment,
  setComments,
  setTempNewReply,
  toggleCommentLike,
} from '@features/PostDetailPage/slice/commentSlice';
import TagComment from './TagComment';
import { useGetAvatarUrlQuery } from '@features/user/avatarUrlApi';
import { navigateToUserPage } from '@shared/utils/navigation';
import { useNavigate } from 'react-router-dom';

const CommentItem = ({
  comment,
  postId,
  showRepliesFor,
  setShowRepliesFor,
}: CommentItemProps) => {
  const [showReplyInput, setShowReplyInput] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editContent, setEditContent] = useState(comment.content);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [createComment] = useCreateCommentMutation();
  const [updateComment] = useUpdateCommentMutation();
  const [deleteComment] = useDeleteCommentMutation();
  const [toggleLike] = useToggleCommentLikeMutation();

  const { id: currentUserId } = useSelector(
    (state: RootState) => state.user.userInfo as UserInfo,
  );

  const { comments: currentComments } = useSelector(
    (state: RootState) => state.postingComments,
  );

  const { data: avatarUrl } = useGetAvatarUrlQuery(comment.userId);

  useEffect(() => {
    console.log(currentComments);
  }, [currentComments]);

  const handleReply = async (
    content: string,
    comment: Comment,
    hasTag: boolean,
  ) => {
    try {
      const fullContent = hasTag
        ? `@${comment.user.username} ${content}`
        : content;
      // 현재 댓글의 parentId가 있다면 그게 최상위 부모댓글
      // 없다면 현재 댓글이 부모댓글
      const parentId = comment.parentId || comment.id;
      const result = await createComment({
        postId,
        content: fullContent,
        userId: currentUserId,
        parentId,
      }).unwrap();

      dispatch(setTempNewReply({ parentId, reply: result }));
      dispatch(setComments([result]));

      // 답글 작성 후 답글 보기 켜기
      if (!showRepliesFor.has(comment.id)) {
        setShowRepliesFor((prev) => {
          const next = new Set(prev);
          next.add(comment.id);
          return next;
        });
      }
      console.log('성공');
    } catch (error) {
      console.error('답글 작성 실패:', error);
    }
  };

  // 답글 보기 토글
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

  const isLiked = useMemo(() => {
    return currentUserId ? comment.likes.includes(currentUserId) : false;
  }, [comment.likes, currentUserId]);

  // 좋아요 토글
  const handleLike = async (comment: Comment, postId: string) => {
    try {
      await toggleLike({ commentId: comment.id, postId }).unwrap();
      dispatch(
        toggleCommentLike({ commentId: comment.id, userId: currentUserId }),
      );
    } catch (error) {
      console.error('좋아요 토글 실패:', error);
    }
  };

  // 댓글 수정
  const handleEdit = async (commentId: string, newContent: string) => {
    try {
      await updateComment({ commentId, content: newContent, postId });
      dispatch(editComment({ commentId: comment.id, content: editContent }));
    } catch (error) {
      console.error('댓글 수정 실패:', error);
    }
  };

  // 댓글 삭제
  const handleDelete = async (commentId: string) => {
    try {
      const hasReplies =
        comment.parentId === null
          ? currentComments.some((c) => c.parentId === commentId)
          : false;

      const result = await deleteComment({ commentId, postId }).unwrap();
      dispatch(
        removeComment({
          commentId,
          hasReplies,
          parentId: comment.parentId,
          isParentDeleted: result.isParentDeleted,
        }),
      );

      handleMenuClose();
    } catch (error) {
      console.error('댓글 삭제 실패:', error);
    }
  };

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleEditClick = () => {
    setIsEditing(true);
    handleMenuClose();
  };

  const handleEditSubmit = () => {
    if (editContent.trim() !== comment.content) {
      handleEdit(comment.id, editContent);
    }
    setIsEditing(false);
  };

  const replyCount = useMemo(() => {
    return currentComments.filter((c) => c.parentId === comment.id).length;
  }, [currentComments, comment.id]);

  return (
    <Box sx={{ display: 'flex', mb: 2, width: '100%' }}>
      <Box
        sx={{
          width: 40,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Avatar
          onClick={() => navigateToUserPage(navigate, comment.user.username)}
          sx={{ cursor: 'pointer', width: 32, height: 32 }}
          src={avatarUrl || ''}
          alt={comment.user.username}
        />
      </Box>

      <Box sx={{ flex: 1, ml: 1 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Typography variant="subtitle2" sx={{ fontWeight: 'bold' }}>
            {comment.user.username}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            {formatTimeAgo(comment.createdAt)}
          </Typography>
          {comment.isEdited && (
            <Typography variant="caption" color="text.secondary">
              (수정됨)
            </Typography>
          )}
        </Box>

        {isEditing ? (
          <Box sx={{ my: 1 }}>
            <TextField
              fullWidth
              multiline
              value={editContent}
              onChange={(e) => setEditContent(e.target.value)}
              size="small"
              sx={{ mb: 1 }}
            />
            <Box sx={{ display: 'flex', gap: 1 }}>
              <Button
                size="small"
                onClick={handleEditSubmit}
                sx={{
                  p: 0,
                  minWidth: 'auto',
                  textTransform: 'none',
                  color: 'text.secondary',
                  bgcolor: 'transparent',
                  '&:hover': {
                    bgcolor: 'transparent',
                  },
                }}
              >
                수정
              </Button>
              <Button
                size="small"
                onClick={() => {
                  setIsEditing(false);
                  setEditContent(comment.content);
                }}
                sx={{
                  p: 0,
                  minWidth: 'auto',
                  textTransform: 'none',
                  color: 'text.secondary',
                  bgcolor: 'transparent',
                  '&:hover': {
                    bgcolor: 'transparent',
                  },
                }}
              >
                취소
              </Button>
            </Box>
          </Box>
        ) : (
          <Typography
            variant="body2"
            sx={{
              my: 1,
              color: comment.isDeleted ? 'text.secondary' : 'inherit',
            }}
          >
            {comment.isDeleted ? (
              '삭제된 댓글입니다'
            ) : (
              <TagComment content={comment.content} />
            )}
          </Typography>
        )}

        {!isEditing && (
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Button
              size="small"
              sx={{
                p: 0,
                minWidth: 'auto',
                textTransform: 'none',
                color: 'text.secondary',
                bgcolor: 'transparent',
                '&:hover': {
                  bgcolor: 'transparent',
                },
              }}
              onClick={() => setShowReplyInput(!showReplyInput)}
            >
              답글 달기
            </Button>
            {comment.parentId === null && replyCount > 0 && (
              <Button
                size="small"
                sx={{
                  p: 0,
                  minWidth: 'auto',
                  textTransform: 'none',
                  color: 'text.secondary',
                  bgcolor: 'transparent',
                  '&:hover': {
                    bgcolor: 'transparent',
                  },
                }}
                onClick={() => handleToggleReplies?.(comment.id)}
              >
                답글 {replyCount}개{' '}
                {showRepliesFor.has(comment.id) ? '숨기기' : '보기'}
              </Button>
            )}
          </Box>
        )}

        {showReplyInput && (
          <Box sx={{ mt: 1 }}>
            <CommentInput
              onSubmit={(content, hasTag) => {
                handleReply(content, comment, hasTag);
                setShowReplyInput(false);
              }}
              placeholder="답글을 입력하세요..."
              mentionedUser={{
                username: comment.user.username,
                id: comment.userId,
              }}
            />
          </Box>
        )}
      </Box>

      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Box
          sx={{
            width: 60,
            height: 60,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Box sx={{ position: 'relative' }}>
            <IconButton
              onClick={() => handleLike(comment, postId)}
              sx={{ color: isLiked ? 'error.main' : 'inherit' }}
            >
              {isLiked ? <FavoriteIcon /> : <FavoriteBorderIcon />}
            </IconButton>
            {comment.likesCount > 0 && (
              <Typography
                variant="caption"
                sx={{
                  position: 'absolute',
                  bottom: -15,
                  left: '50%',
                  transform: 'translateX(-50%)',
                }}
              >
                {comment.likesCount}
              </Typography>
            )}
          </Box>
        </Box>

        <Box>
          {currentUserId === comment.userId && (
            <IconButton onClick={handleMenuClick}>
              <MoreVertIcon />
            </IconButton>
          )}

          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
          >
            <MenuItem onClick={handleEditClick}>수정</MenuItem>
            <MenuItem
              onClick={() => {
                handleDelete(comment.id);
                handleMenuClose();
              }}
            >
              삭제
            </MenuItem>
          </Menu>
        </Box>
      </Box>
    </Box>
  );
};

export default CommentItem;
