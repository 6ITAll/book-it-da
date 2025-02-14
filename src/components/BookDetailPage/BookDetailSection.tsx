import { Box } from '@mui/material';
import LeftBookDetailBox from '@components/BookDetailPage/LeftBookDetailBox';
import RightBookDetailBox from '@components/BookDetailPage/RightBookDetailBox';
import { bookDetailStyles } from '@components/BookDetailPage/BookDetail.styles';

interface BookDetailSectionProps {
  cover: string;
  title: string;
  subTitle: string;
  author: string;
  categoryName: string;
  pubDate: string;
  imageUrl: string;
  link: string;
  isbn: string;
  readerCount: number;
  bookInfoLoading: boolean;
  readerStatsLoading: boolean;
}

const BookDetailSection = ({
  cover,
  title,
  subTitle,
  author,
  categoryName,
  pubDate,
  imageUrl,
  link,
  isbn,
  readerCount,
  bookInfoLoading,
  readerStatsLoading,
}: BookDetailSectionProps): JSX.Element => {
  return (
    <Box sx={bookDetailStyles.bookDetailSectionBox}>
      {/* 왼쪽 박스 (책 이미지) */}
      <LeftBookDetailBox
        cover={cover}
        title={title}
        isLoading={bookInfoLoading}
      />
      {/* 오른쪽 박스 (책 정보) */}
      <RightBookDetailBox
        isbn={isbn}
        title={title}
        subTitle={subTitle}
        author={author}
        categoryName={categoryName}
        pubDate={pubDate}
        imageUrl={imageUrl}
        link={link}
        readerCount={readerCount}
        bookInfoLoading={bookInfoLoading}
        readerStatsLoading={readerStatsLoading}
      />
    </Box>
  );
};

export default BookDetailSection;
