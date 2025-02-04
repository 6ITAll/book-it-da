import { useState, KeyboardEvent } from 'react';
import {
  Box,
  TextField,
  Button,
  Typography,
  Avatar,
  Divider,
} from '@mui/material';

interface Comment {
  id: number;
  author: string;
  content: string;
  createdAt: string;
}

const CommentSection = (): JSX.Element => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState('');

  const handleCommentSubmit = (content: string) => {
    if (content.trim()) {
      const comment: Comment = {
        id: Date.now(),
        author: '익명',
        content: content.trim(),
        createdAt: new Date().toISOString(),
      };
      setComments([...comments, comment]);
      setNewComment('');
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
    }
  };

  return (
    <Box sx={{ mt: 4, p: 2, borderRadius: 2, width: '100%' }}>
      <Typography variant="h6" sx={{ mb: 2 }}>
        댓글
      </Typography>
      <Divider sx={{ mb: 2 }} />
      {comments.map((comment) => (
        <Box
          key={comment.id}
          sx={{ mb: 2, display: 'flex', alignItems: 'flex-start' }}
        >
          <Avatar sx={{ mr: 2, width: 32, height: 32 }}>
            {comment.author[0]}
          </Avatar>
          <Box sx={{ flex: 1 }}>
            <Typography variant="subtitle2" sx={{ fontWeight: 'bold' }}>
              {comment.author}
            </Typography>
            <Typography variant="body2" sx={{ my: 1, whiteSpace: 'pre-wrap' }}>
              {comment.content}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              {new Date(comment.createdAt).toLocaleString()}
            </Typography>
          </Box>
        </Box>
      ))}
      <Box
        component="form"
        onSubmit={(e) => {
          e.preventDefault();
          handleCommentSubmit(newComment);
        }}
        sx={{ mt: 2, display: 'flex', alignItems: 'flex-start', width: '100%' }}
      >
        <TextField
          fullWidth
          multiline
          rows={3}
          variant="outlined"
          placeholder="댓글을 입력하세요..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          onKeyDown={handleKeyDown}
          sx={{
            mr: 1,
            '& .MuiOutlinedInput-root': {
              fontWeight: 400,
              fontSize: '0.875rem',
            },
          }}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          sx={{
            height: '56px',
            minWidth: '80px',
            fontWeight: 500,
            fontSize: '0.875rem',
          }}
        >
          등록
        </Button>
      </Box>
    </Box>
  );
};

export default CommentSection;
