import { Book } from '@shared/types/type';

interface ValidationResult {
  isValid: boolean;
  error: string;
}

export const validateOneLineReview = (
  selectedBook: Book | null,
  starRating: number,
  review: string,
): ValidationResult => {
  if (!selectedBook) {
    return {
      isValid: false,
      error: '책을 선택해주세요.',
    };
  }

  if (starRating === 0) {
    return {
      isValid: false,
      error: '별점을 선택해주세요.',
    };
  }

  if (!review.trim()) {
    return {
      isValid: false,
      error: '한줄평을 작성해주세요.',
    };
  }

  if (review.length > 50) {
    return {
      isValid: false,
      error: '한줄평은 50자를 초과할 수 없습니다.',
    };
  }

  return {
    isValid: true,
    error: '',
  };
};
