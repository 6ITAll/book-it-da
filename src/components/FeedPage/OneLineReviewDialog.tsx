import { Box, Stack, TextField, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { PostType } from './WriteDialog';
import BookSearchAutoComplete from '@components/commons/BookSearchAutoComplete';
import { Book } from '@shared/types/type';
import HybridDialog from '@components/commons/HybridDialog';
import StarRating from '@components/commons/StarRating';

interface OneLineReviewDialogProps {
  // 포스팅 타입 선택 다이얼로그에서 오는 Props
  handleBack?: () => void;
  selectedType?: PostType;
  setSelectedType?: React.Dispatch<React.SetStateAction<PostType>>;
  // 상세 페이지에서 오는 Props
  receivedBook?: Book;
  receivedRating?: number;
  isOpen?: boolean;
  onClose?: () => void;
}

const OneLineReviewDialog = ({
  selectedType,
  setSelectedType,
  handleBack,
  receivedBook,
  receivedRating,
  isOpen,
  onClose,
}: OneLineReviewDialogProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBook, setSelectedBook] = useState<Book | null>(
    receivedBook || null,
  );
  const [review, setReview] = useState('');
  const [rating, setRating] = useState<number>(receivedRating || 0);

  const dialogOpen = selectedType ? selectedType === 'review' : !!isOpen;
  // 다이얼로그 닫히면 책 검색 결과 초기화
  useEffect(() => {
    if (!receivedBook && selectedType !== 'review') {
      setSelectedBook(null);
      setSearchQuery('');
      setReview('');
    }
  }, [selectedType, receivedBook]);
  // 상세 페이지에서 가져온 별점 적용
  useEffect(() => {
    if (receivedRating) {
      setRating(receivedRating);
    }
  }, [receivedRating]);

  const handleSubmit = () => {
    // 한줄평 제출 로직 구현
    console.log('한줄평 제출:', { selectedBook, review });
  };

  const handleDialogClose: React.Dispatch<
    React.SetStateAction<boolean>
  > = () => {
    if (selectedType) {
      // 포스팅 타입 선택 다이얼로그에서 연 경우
      setSelectedType?.(null);
    } else {
      // 다른 경로로 다이얼로그를 연 경우
      onClose?.();
    }
  };

  const contentNode = (
    <Stack sx={{ gap: '20px' }}>
      {/* 상세 페이지에서 넘어갈 시 책 검색 기능 표시하지 않음 */}
      {!receivedBook && (
        <BookSearchAutoComplete
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          selectedBook={selectedBook}
          setSelectedBook={setSelectedBook}
        />
      )}
      {/* 한줄평 하고 있는 책 < 책 검색 or 책 상세 페이지 */}
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
            </Stack>
          </Stack>
        </Box>
      )}
      {/* 별점 기능 */}
      <StarRating rating={rating} onRatingChange={setRating} isDialog={true} />
      {/* 한줄평 작성 영역 */}
      <Box position="relative">
        <TextField
          fullWidth
          multiline
          label="한줄평"
          variant="outlined"
          placeholder="한줄평을 입력하세요"
          value={review}
          onChange={(e) => {
            // 50자 제한
            if (e.target.value.length <= 50) {
              setReview(e.target.value);
            }
          }}
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
        <Typography
          variant="caption"
          sx={{
            position: 'absolute',
            bottom: '8px',
            right: '14px',
            color: 'text.secondary',
          }}
        >
          {review.length}/50
        </Typography>
      </Box>
    </Stack>
  );

  return (
    <HybridDialog
      open={dialogOpen}
      setOpen={handleDialogClose}
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
