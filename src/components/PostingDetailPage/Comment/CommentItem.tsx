import { useState } from 'react';
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
import { CommentItemProps } from './types';
import CommentInput from './CommentInput';
import { RootState } from '@store/index';
import { UserInfo } from '@features/user/userSlice';
import { useSelector } from 'react-redux';
import { formatTimeAgo } from '@shared/utils/formatTimeAgo';

const CommentItem = ({
  comment,
  onReply,
  onToggleReplies,
  onLike,
  onEdit,
  onDelete,
}: CommentItemProps) => {
  const [showReplyInput, setShowReplyInput] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editContent, setEditContent] = useState(comment.content);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const { id: currentUserId } = useSelector(
    (state: RootState) => state.user.userInfo as UserInfo,
  );

  const isOwner = currentUserId === comment.userId;
  const open = Boolean(anchorEl);

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

  const handleDeleteClick = () => {
    onDelete(comment.id);
    handleMenuClose();
  };

  const handleEditSubmit = () => {
    if (editContent.trim() !== comment.content) {
      onEdit(comment.id, editContent);
    }
    setIsEditing(false);
  };

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
        <Avatar sx={{ width: 32, height: 32 }}>{comment.userId[0]}</Avatar>
      </Box>

      <Box sx={{ flex: 1, ml: 1 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Typography variant="subtitle2" sx={{ fontWeight: 'bold' }}>
            {comment.username}
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
                  border: 'none',
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
          <Typography variant="body2" sx={{ my: 1 }}>
            {comment.content}
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
            {comment.parentId === null && comment.replyCount! > 0 && (
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
                onClick={() => onToggleReplies?.(comment.id)}
              >
                답글 보기
              </Button>
            )}
          </Box>
        )}

        {showReplyInput && (
          <Box sx={{ mt: 1 }}>
            <CommentInput
              onSubmit={(content) => {
                onReply(content, comment.id);
                setShowReplyInput(false);
              }}
              placeholder="답글을 입력하세요..."
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
          <IconButton
            onClick={() => onLike(comment.id)}
            sx={{ color: comment.isLiked ? 'error.main' : 'inherit' }}
          >
            {comment.isLiked ? <FavoriteIcon /> : <FavoriteBorderIcon />}
          </IconButton>
          {comment.likes > 0 && (
            <Typography variant="caption">{comment.likes}</Typography>
          )}
        </Box>

        {isOwner && !isEditing && (
          <Box>
            <IconButton onClick={handleMenuClick}>
              <MoreVertIcon />
            </IconButton>
            <Menu anchorEl={anchorEl} open={open} onClose={handleMenuClose}>
              <MenuItem onClick={handleEditClick}>수정</MenuItem>
              <MenuItem onClick={handleDeleteClick}>삭제</MenuItem>
            </Menu>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default CommentItem;
