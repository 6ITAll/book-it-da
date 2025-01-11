import { Box } from '@mui/material';
import BookDetailNavBar from '@components/BookDetailPage/BookDetailNavBar';
import BookIntroduceTab from '@components/BookDetailPage/BookIntroduceTab';
import BookReviewTab from '@components/BookDetailPage/BookReviewTab';
import { useGetReviewsQuery } from '@features/BookDetailPage/api/reviewApi';
import { useState } from 'react';
import { bookDetailStyles } from '@components/BookDetailPage/BookDetail.styles';

interface BookDetailContentProps {
  itemId: number;
  title: string;
  description: string;
  author: string;
  imageUrl: string;
}

const BookDetailContent = ({
  itemId,
  description = '',
  title = '',
  author = '',
  imageUrl = '',
}: BookDetailContentProps): JSX.Element => {
  // 리뷰 데이터 가져오기
  const { data: reviewData } = useGetReviewsQuery(itemId);
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
          <BookIntroduceTab itemId={itemId} description={description} />
        )}
        {/* 리뷰 섹션 */}
        {currentTab === 1 && (
          <BookReviewTab
            itemId={itemId}
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
