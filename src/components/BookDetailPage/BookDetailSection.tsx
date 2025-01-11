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
  customerReviewRank: number;
  ratingCount: number;
  itemId: number;
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
  customerReviewRank,
  ratingCount,
  itemId,
}: BookDetailSectionProps): JSX.Element => {
  return (
    <Box sx={bookDetailStyles.bookDetailSectionBox}>
      {/* 왼쪽 박스 (책 이미지) */}
      <LeftBookDetailBox cover={cover} title={title} />
      {/* 오른쪽 박스 (책 정보) */}
      <RightBookDetailBox
        itemId={itemId}
        title={title}
        subTitle={subTitle}
        author={author}
        categoryName={categoryName}
        pubDate={pubDate}
        imageUrl={imageUrl}
        link={link}
        customerReviewRank={customerReviewRank}
        ratingCount={ratingCount}
      />
    </Box>
  );
};

export default BookDetailSection;
