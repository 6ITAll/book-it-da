import { Box, Stack, TextField, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { PostType } from './WriteDialog';
import BookSearchAutoComplete from '@components/commons/BookSearchAutoComplete';
import { Book } from '@shared/types/type';
import HybridDialog from '@components/commons/HybridDialog';

interface OneLineReviewDialogProps {
  handleBack: () => void;
  selectedType: PostType;
  setSelectedType: React.Dispatch<React.SetStateAction<PostType>>;
}

const OneLineReviewDialog = ({
  selectedType,
  setSelectedType,
  handleBack,
}: OneLineReviewDialogProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [review, setReview] = useState('');

  // 다이얼로그 닫히면 책 검색 결과 초기화
  useEffect(() => {
    if (selectedType !== 'review') {
      setSelectedBook(null);
      setSearchQuery('');
      setReview('');
    }
  }, [selectedType]);

  const handleSubmit = () => {
    // 한줄평 제출 로직 구현
    console.log('한줄평 제출:', { selectedBook, review });
  };

  const contentNode = (
    <Stack sx={{ gap: '20px' }}>
      <BookSearchAutoComplete
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedBook={selectedBook}
        setSelectedBook={setSelectedBook}
      />

      {selectedBook && (
        <Box>
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

      <TextField
        fullWidth
        multiline
        label="한줄평"
        variant="outlined"
        placeholder="한줄평을 입력하세요"
        value={review}
        onChange={(e) => setReview(e.target.value)}
        minRows={12}
        sx={{
          '& .MuiOutlinedInput-root': {
            borderRadius: '8px',
            height: '200px',
            '& textarea': {
              height: '100% !important',
            },
          },
        }}
      />
    </Stack>
  );

  return (
    <HybridDialog
      open={selectedType === 'review'}
      setOpen={() => setSelectedType(null)}
      title="한줄평 작성"
      onBack={handleBack}
      action="한줄평 작성"
      onActionClick={handleSubmit}
      contentNode={contentNode}
      sx={{
        '& .MuiDialog-paper': {
          borderRadius: '10px',
        },
      }}
    />
  );
};

export default OneLineReviewDialog;
