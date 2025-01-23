import { Box } from '@mui/material';
import BookDetailNavBar from '@components/BookDetailPage/BookDetailNavBar';
import BookIntroduceTab from '@components/BookDetailPage/BookIntroduceTab';
import BookReviewTab from '@components/BookDetailPage/BookReviewTab';
import { useGetReviewsQuery } from '@features/BookDetailPage/api/reviewApi';
import { useState } from 'react';
import { bookDetailStyles } from '@components/BookDetailPage/BookDetail.styles';

interface BookDetailContentProps {
  isbn: string;
  title: string;
  description: string;
  author: string;
  imageUrl: string;
  isLoading: boolean;
}

const BookDetailContent = ({
  isbn,
  description = '',
  title = '',
  author = '',
  imageUrl = '',
  isLoading,
}: BookDetailContentProps): JSX.Element => {
  // 리뷰 데이터 가져오기
  const { data: reviewData } = useGetReviewsQuery(isbn);
  const totalReviews = reviewData?.totalReviews || 0;
  const [currentTab, setCurrentTab] = useState(0);

  const handleTabChange = (tabIndex: number) => {
    setCurrentTab(tabIndex);
  };

  return (
    <Box sx={bookDetailStyles.bookDetailContentBox}>
      {/* 메인 콘텐츠 */}
      <Box width="100%">
        <BookDetailNavBar
          totalReviews={totalReviews}
          onTabChange={handleTabChange}
        />
        {/* 성별, 연령별 인기 분포 섹션 */}
        {currentTab === 0 && (
          <BookIntroduceTab
            isbn={isbn}
            description={description}
            isLoading={isLoading}
          />
        )}
        {/* 리뷰 섹션 */}
        {currentTab === 1 && (
          <BookReviewTab
            isbn={isbn}
            title={title}
            author={author}
            imageUrl={imageUrl}
          />
        )}
      </Box>
    </Box>
  );
};

export default BookDetailContent;
