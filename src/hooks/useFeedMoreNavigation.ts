import { BookReviewTabProps } from '@components/BookDetailPage/BookReviewTab';
import { useNavigate } from 'react-router-dom';

type MoreType = 'posts' | 'reviews';

export const useFeedMoreNavigation = () => {
  const navigate = useNavigate();

  const handleSeeMore = (type: MoreType, bookDetails: BookReviewTabProps) => {
    if (bookDetails.itemId) {
      navigate(`/bookDetail/${bookDetails.itemId}/${type}`, {
        state: {
          bookDetails,
        },
      });
    }
  };

  return {
    handleSeeMore,
  };
};
