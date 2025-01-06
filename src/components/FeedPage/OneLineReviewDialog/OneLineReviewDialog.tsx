import { Stack, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { PostType } from '@shared/types/type';
import BookSearchAutoComplete from '@components/commons/BookSearchAutoComplete';
import { Book } from '@shared/types/type';
import HybridDialog from '@components/commons/HybridDialog';
import StarRating from '@components/commons/StarRating';
import BookPreviewSection from './OneLineReviewBookPreview';
import ReviewTextField from './OneLineReviewTextField';
import styles from './OneLineReviewDialog.styles';
import { REVIEW_DIALOG } from 'src/constants';
import { useCreateOneLineReviewMutation } from '@features/OneLineReviewDialog/api/oneLineReviewApi';
import { validateOneLineReview } from '@features/OneLineReviewDialog/utils/validate';

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
  const [starRating, setStarRating] = useState<number>(
    receivedRating || REVIEW_DIALOG.DEFAULT_STAR_RATING,
  );

  const [error, setError] = useState<string>('');
  const [createOneLineReview] = useCreateOneLineReviewMutation();

  const dialogOpen = selectedType ? selectedType === '한줄평' : !!isOpen;

  // 다이얼로그 초기화 함수
  const resetState = () => {
    setSelectedBook(null);
    setSearchQuery('');
    setReview('');
    setStarRating(REVIEW_DIALOG.DEFAULT_STAR_RATING);
  };

  // 다이얼로그 닫히면 책 검색 결과 초기화
  useEffect(() => {
    if (!receivedBook && selectedType !== '한줄평') {
      resetState();
    }
  }, [selectedType, receivedBook, selectedBook]);

  // 상세 페이지에서 가져온 별점 적용
  useEffect(() => {
    if (receivedRating) {
      setStarRating(receivedRating);
    }
  }, [receivedRating]);

  const handleSubmit = async () => {
    const validation = validateOneLineReview(selectedBook, starRating, review);

    if (!validation.isValid) {
      setError(validation.error);
      return;
    }

    try {
      const result = await createOneLineReview({
        book: selectedBook!,
        rating: starRating,
        review: review.trim(),
      }).unwrap();

      if (result.success) {
        resetState();
        handleDialogClose();
      }
    } catch (error) {
      setError('한줄평 작성에 실패했습니다. 다시 시도해주세요.');
      console.error('한줄평 작성 실패:', error);
    }
  };

  const handleDialogClose = () => {
    if (selectedType) {
      setSelectedType?.('선택안함');
    } else {
      onClose?.();
    }
  };

  const contentNode = (
    <Stack sx={styles.contentStack}>
      {error && (
        <Typography color="error" sx={{ mb: 2 }}>
          {error}
        </Typography>
      )}
      {/* 상세 페이지에서 넘어갈 시 책 검색 기능 표시하지 않음 */}
      {!receivedBook && (
        <BookSearchAutoComplete
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          selectedBook={selectedBook}
          setSelectedBook={setSelectedBook}
        />
      )}
      {/* 한줄평 하고 있는 책 <= 책 검색 or 책 상세 페이지 */}
      {selectedBook && <BookPreviewSection book={selectedBook} />}
      {/* 별점 기능 */}
      <StarRating
        rating={starRating}
        onRatingChange={setStarRating}
        isDialog={true}
      />
      {/* 한줄평 작성 영역 */}
      <ReviewTextField review={review} setReview={setReview} />
    </Stack>
  );

  return (
    <HybridDialog
      open={dialogOpen}
      setOpen={() => {
        if (!error) {
          handleDialogClose();
        }
      }}
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
