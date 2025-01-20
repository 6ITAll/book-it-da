import { Box, Typography, Skeleton } from '@mui/material';
import BookInfoBox from '@components/BookDetailPage/BookInfoBox';
import ActionButtons from '@components/BookDetailPage/ActionButtons';
import FooterButtons from '@components/BookDetailPage/FooterButtons';
import { useFetchLibraryCountQuery } from '@features/BookDetailPage/api/bookUserShelfCountApi';
import { bookDetailStyles } from '@components/BookDetailPage/BookDetail.styles';

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
  isLoading: boolean;
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
  isLoading,
}: RightBookBoxProps): JSX.Element => {
  const { data } = useFetchLibraryCountQuery(itemId);
  return (
    <Box sx={bookDetailStyles.rightBox}>
      <Box sx={bookDetailStyles.rightBoxInfoBox}>
        {isLoading ? (
          <>
            <Skeleton variant="text" width="60%" height="40px" />
            <Skeleton variant="text" width="40%" height="30px" />
            <Skeleton variant="text" width="50%" height="20px" />
            <Skeleton variant="text" width="70%" height="20px" />
            <Skeleton variant="text" width="80%" height="20px" />
          </>
        ) : (
          <BookInfoBox
            title={title}
            subTitle={subTitle}
            author={author}
            categoryName={categoryName}
            pubDate={pubDate}
            customerReviewRank={customerReviewRank}
            ratingCount={ratingCount}
          />
        )}

        <Box sx={bookDetailStyles.rightBoxBottom}>
          {isLoading ? (
            <Skeleton variant="text" width="25%" height="40px" />
          ) : (
            <Typography variant="body2" color="text.secondary">
              이 책이 담긴 서재 <strong>{data?.libraryCount || 0}명</strong>
            </Typography>
          )}
          =
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
