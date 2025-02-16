import { Box } from '@mui/material';
import BookDetailNavBar from '@components/BookDetailPage/BookDetailNavBar';
import BookIntroduceTab from '@components/BookDetailPage/BookIntroduceTab';
import BookFeedTab from '@components/BookDetailPage/BookFeedTab';
import { useState } from 'react';
import { bookDetailStyles } from '@components/BookDetailPage/BookDetail.styles';
import { BOOK_TABS, BookTabType } from './types';

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
  const [currentTab, setCurrentTab] = useState<BookTabType>(
    BOOK_TABS.INTRODUCE,
  );

  const handleTabChange = (tab: BookTabType) => {
    setCurrentTab(tab);
  };

  return (
    <Box sx={bookDetailStyles.bookDetailContentBox}>
      {/* 메인 콘텐츠 */}
      <Box width="100%">
        <BookDetailNavBar
          currentTab={currentTab}
          onTabChange={handleTabChange}
        />
        {/* 성별, 연령별 인기 분포 섹션 */}
        {currentTab === BOOK_TABS.INTRODUCE && (
          <BookIntroduceTab description={description} isLoading={isLoading} />
        )}
        {currentTab === BOOK_TABS.FEED && (
          <BookFeedTab
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
