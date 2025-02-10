import { useState } from 'react';
import { Box, TextField, Button } from '@mui/material';
import { CommentInputProps } from './types';

const CommentInput = ({ onSubmit, placeholder }: CommentInputProps) => {
  const [content, setContent] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (content.trim()) {
      onSubmit(content);
      setContent('');
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        display: 'flex',
        gap: 1,
        width: '100%',
      }}
    >
      <TextField
        fullWidth
        multiline
        rows={1}
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder={placeholder || '댓글을 입력하세요...'}
        sx={{
          '& .MuiOutlinedInput-root': {
            fontSize: '0.875rem',
          },
        }}
      />
      <Button
        type="submit"
        variant="contained"
        disabled={!content.trim()}
        sx={{
          minWidth: '80px',
          height: '40px',
        }}
      >
        등록
      </Button>
    </Box>
  );
};

export default CommentInput;
