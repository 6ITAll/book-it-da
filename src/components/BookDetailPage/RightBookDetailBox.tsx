import { Box, Typography, Skeleton } from '@mui/material';
import BookInfoBox from '@components/BookDetailPage/BookInfoBox';
import ActionButtons from '@components/BookDetailPage/ActionButtons';
import FooterButtons from '@components/BookDetailPage/FooterButtons';
import { useFetchLibraryCountQuery } from '@features/BookDetailPage/api/bookUserShelfCountApi';
import { bookDetailStyles } from '@components/BookDetailPage/BookDetail.styles';

interface RightBookBoxProps {
  isbn: string;
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
  isbn,
  title,
  subTitle,
  author,
  categoryName,
  pubDate,
  link,
  imageUrl,
  isLoading,
}: RightBookBoxProps): JSX.Element => {
  const { data } = useFetchLibraryCountQuery(isbn);
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
            isbn={isbn}
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
              title: title,
              author: author,
              imageUrl: imageUrl,
              isbn: isbn,
            }}
          />
        </Box>
      </Box>

      <FooterButtons
        isbn={isbn}
        title={title}
        author={author}
        imageUrl={imageUrl}
        link={link}
      />
    </Box>
  );
};

export default RightBookBoxDetailBox;
