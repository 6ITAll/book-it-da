import { Stack, Typography } from '@mui/material';
import React, { useEffect, useState, useRef } from 'react';
import { PostType } from '@shared/types/type';
import BookSearchAutoComplete from '@components/commons/BookSearchAutoComplete';
import { Book } from '@shared/types/type';
import HybridDialog from '@components/commons/HybridDialog/HybridDialog';
import StarRating from '@components/commons/StarRating';
import BookPreviewSection from './OneLineReviewBookPreview';
import ReviewTextField from './OneLineReviewTextField';
import styles from './OneLineReviewDialog.styles';
import { REVIEW_DIALOG } from 'src/constants';
import { useCreateOneLineReviewMutation } from '@features/OneLineReviewDialog/api/oneLineReviewApi';
import { validateOneLineReview } from '@features/OneLineReviewDialog/utils/validate';
import { showSnackbar } from '@features/Snackbar/snackbarSlice';
import { useDispatch } from 'react-redux';

interface OneLineReviewDialogProps {
  handleBack?: () => void;
  selectedType?: PostType;
  setSelectedType?: React.Dispatch<React.SetStateAction<PostType>>;
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
  const dispatch = useDispatch();
  const [selectedBook, setSelectedBook] = useState<Book | null>(
    receivedBook || null,
  );
  const starRatingRef = useRef<number>(
    receivedRating || REVIEW_DIALOG.DEFAULT_STAR_RATING,
  );
  const [error, setError] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [createOneLineReview] = useCreateOneLineReviewMutation();

  const dialogOpen = selectedType ? selectedType === '한줄평' : !!isOpen;

  const reviewInputRef = useRef<HTMLInputElement>(null);

  const resetState = () => {
    setSelectedBook(null);
    setError('');
    starRatingRef.current = REVIEW_DIALOG.DEFAULT_STAR_RATING;
  };

  // 다이얼로그 닫히면 책 검색 결과 초기화
  useEffect(() => {
    if (!receivedBook && selectedType !== '한줄평') {
      resetState();
    }
  }, [selectedType, receivedBook, selectedBook]);

  // 상세 페이지에서 가져온 별점이 있다면 ref에 적용
  useEffect(() => {
    if (receivedRating) {
      starRatingRef.current = receivedRating;
    }
  }, [receivedRating]);

  const handleSubmit = async () => {
    setIsSubmitting(true);

    // 부모는 ref를 통해 ReviewTextField의 입력값을 직접 읽어옵니다.
    const reviewValue = reviewInputRef.current
      ? reviewInputRef.current.value
      : '';
    const validation = validateOneLineReview(
      selectedBook,
      starRatingRef.current,
      reviewValue,
    );

    if (!validation.isValid) {
      setError(validation.error);
      setIsSubmitting(false);
      return;
    }

    try {
      const result = await createOneLineReview({
        book: selectedBook!,
        rating: starRatingRef.current,
        review: reviewValue.trim(),
      }).unwrap();

      if (result.success) {
        resetState();
        handleDialogClose();
        dispatch(
          showSnackbar({
            message: '한줄평이 성공적으로 작성되었습니다.',
            severity: 'success',
          }),
        );
      } else {
        dispatch(
          showSnackbar({
            message: '한줄평 작성에 실패했습니다. 다시 시도해주세요.',
            severity: 'error',
          }),
        );
      }
    } catch (error) {
      console.error('한줄평 작성 실패:', error);
      dispatch(
        showSnackbar({
          message: '한줄평 작성에 실패했습니다. 다시 시도해주세요.',
          severity: 'error',
        }),
      );
    }
  };

  const handleDialogClose = () => {
    if (!error) {
      if (selectedType) {
        setSelectedType?.('선택안함');
      } else {
        onClose?.();
      }
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
          selectedBook={selectedBook}
          setSelectedBook={setSelectedBook}
        />
      )}
      {/* 한줄평 하고 있는 책 <= 책 검색 or 책 상세 페이지 */}
      {selectedBook && <BookPreviewSection book={selectedBook} />}
      {/* 별점 기능 */}
      <StarRating
        rating={starRatingRef.current}
        onRatingChange={(newRating) => {
          starRatingRef.current = newRating;
        }}
        isDialog={true}
      />
      {/* 한줄평 작성 영역 */}
      <ReviewTextField inputRef={reviewInputRef} />
    </Stack>
  );

  return (
    <HybridDialog
      open={dialogOpen}
      setOpen={() => {
        if (!isSubmitting && !error) {
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
