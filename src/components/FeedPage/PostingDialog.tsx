import { Box, Stack, TextField, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { PostType } from './WriteDialog';
import TextEditor from '@components/commons/TextEditor';
import BookSearchAutoComplete from '@components/commons/BookSearchAutoComplete';
import { Book } from '@shared/types/type';
import HybridDialog from '@components/commons/HybridDialog';

interface PostingDialogProps {
  handleBack: () => void;
  selectedType: PostType;
  setSelectedType: React.Dispatch<React.SetStateAction<PostType>>;
}

const PostingDialog = ({
  selectedType,
  setSelectedType,
  handleBack,
}: PostingDialogProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');

  // 다이얼로그 닫히면 책 검색 결과 초기화
  useEffect(() => {
    if (selectedType !== 'review') {
      setSelectedBook(null);
      setSearchQuery('');
    }
  }, [selectedType]);

  const contentNode = (
    <Stack sx={{ gap: '30px' }}>
      <BookSearchAutoComplete
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedBook={selectedBook}
        setSelectedBook={setSelectedBook}
      />
      {/* 선택한 책 정보 추후 고유 id 뺼 예정 */}
      {selectedBook && (
        <Box sx={{ mb: 2 }}>
          <Stack direction="row" spacing={2} alignItems="center">
            <img
              src={selectedBook.imageUrl}
              alt={selectedBook.bookTitle}
              style={{ width: 60, height: 90 }}
            />
            <Stack>
              <Typography>{selectedBook.bookTitle}</Typography>
              <Typography variant="body2">{selectedBook.author}</Typography>
              <Typography>{selectedBook.itemId}</Typography>
            </Stack>
          </Stack>
        </Box>
      )}
      {/* 포스팅 제목 입력창 */}
      <TextField
        fullWidth
        multiline
        label="제목"
        variant="outlined"
        placeholder="제목을 입력하세요"
        minRows={1}
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        sx={{
          '& .MuiOutlinedInput-root': {
            borderRadius: '8px',
            height: '50px',
            '& textarea': {
              height: '100% !important',
            },
          },
        }}
      />
      <TextEditor value={content} setValue={setContent} />
    </Stack>
  );
  return (
    <HybridDialog
      title="포스트 작성"
      contentNode={contentNode}
      open={selectedType === 'post'}
      setOpen={() => setSelectedType(null)}
      onBack={handleBack}
      action="포스트 작성"
      onActionClick={() => {}}
      fullScreen
      sx={{
        '& .MuiDialogContent-root': {
          display: 'flex',
          flexDirection: 'column',
          gap: '30px',
          padding: '30px 20px',
        },
      }}
    />
  );
};
export default PostingDialog;
