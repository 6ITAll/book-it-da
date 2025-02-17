import { Box, Typography, Skeleton } from '@mui/material';
import BookInfoBox from '@components/BookDetailPage/BookInfoBox';
import ActionButtons from '@components/BookDetailPage/ActionButtons';
import FooterButtons from '@components/BookDetailPage/FooterButtons';
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
  readerCount: number;
  bookInfoLoading: boolean;
  readerStatsLoading: boolean;
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
  readerCount,
  bookInfoLoading,
  readerStatsLoading,
}: RightBookBoxProps): JSX.Element => {
  return (
    <Box sx={bookDetailStyles.rightBox}>
      <Box sx={bookDetailStyles.rightBoxInfoBox}>
        {bookInfoLoading ? (
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
          {readerStatsLoading ? (
            <Skeleton variant="text" width="25%" height="40px" />
          ) : (
            <Typography variant="body2" color="text.secondary">
              이 책을 담은 사람 <strong>{readerCount}명</strong>
            </Typography>
          )}
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
