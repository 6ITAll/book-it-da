import { useState, useCallback, useEffect } from 'react';
import { Box, TextField, Button } from '@mui/material';
import { CommentInputProps } from './types';

const CommentInput = ({
  onSubmit,
  placeholder,
  mentionedUser,
}: CommentInputProps) => {
  const [content, setContent] = useState('');
  const [tag, setTag] = useState<string | null>(null);

  useEffect(() => {
    if (mentionedUser) {
      setTag(`@${mentionedUser.username} `); // 공백 있어야 함
    }
  }, [mentionedUser]);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = e.target.value;

      // 태그가 있고 백스페이스를 눌렀을 때
      if (tag && newValue === tag.slice(0, -1)) {
        setTag(null);
        setContent('');
        return;
      }

      // 태그가 있으면 태그 부분을 제외한 나머지만 content로 저장
      if (tag && newValue.startsWith(tag)) {
        setContent(newValue.slice(tag.length));
      } else {
        setContent(newValue);
      }
    },
    [tag],
  );

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      if (content.trim()) {
        onSubmit(content.trim(), tag !== null);
        setContent('');
        setTag(null);
      }
    },
    [content, onSubmit, tag],
  );

  const displayValue = tag ? `${tag}${content}` : content;

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
        value={displayValue}
        onChange={handleChange}
        placeholder={placeholder || '댓글을 입력하세요...'}
        sx={{ '& .MuiOutlinedInput-root': { fontSize: '0.875rem' } }}
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
