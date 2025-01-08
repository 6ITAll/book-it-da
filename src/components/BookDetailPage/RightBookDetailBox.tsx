import { Box, Typography } from '@mui/material';
import BookInfoBox from './BookInfoBox';
import ActionButtons from './ActionButtons';
import FooterButtons from './FooterButtons';
import { useFetchLibraryCountQuery } from '@features/BookDetailPage/api/bookUserShelfCountApi';
import { bookDetailStyles } from './BookDetail.styles';

interface RightBookBoxProps {
  itemId: number;
  title: string;
  subTitle: string;
  author: string;
  categoryName: string;
  pubDate: string;
  link: string;
  imageUrl: string;
  customerReviewRank: number;
  ratingCount: number;
}

const RightBookBoxDetailBox = ({
  itemId,
  title,
  subTitle,
  author,
  categoryName,
  pubDate,
  link,
  imageUrl,
  customerReviewRank,
  ratingCount,
}: RightBookBoxProps): JSX.Element => {
  const { data } = useFetchLibraryCountQuery(itemId);
  return (
    <Box sx={bookDetailStyles.rightBox}>
      {/* 책 정보와 액션 버튼 */}
      <Box sx={bookDetailStyles.rightBoxInfoBox}>
        <BookInfoBox
          title={title}
          subTitle={subTitle}
          author={author}
          categoryName={categoryName}
          pubDate={pubDate}
          customerReviewRank={customerReviewRank}
          ratingCount={ratingCount}
        />
        <Box sx={bookDetailStyles.rightBoxBottom}>
          <Typography variant="body2" color="text.secondary">
            이 책이 담긴 서재 <strong>{data?.libraryCount || 0}명</strong>
          </Typography>
          <ActionButtons
            book={{
              bookTitle: title,
              author: author,
              imageUrl: imageUrl,
              itemId: itemId,
            }}
          />
        </Box>
      </Box>
      {/* 하단 버튼 */}
      <FooterButtons
        itemId={itemId}
        title={title}
        author={author}
        imageUrl={imageUrl}
        link={link}
      />
    </Box>
  );
};

export default RightBookBoxDetailBox;
