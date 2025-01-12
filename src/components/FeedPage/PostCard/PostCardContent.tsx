import { Box, CardContent, Typography } from '@mui/material';
import styles from './PostCard.styles';
import { Book, PostType } from '@shared/types/type';
import { stripHtml } from 'string-strip-html';

interface PostCardBaseContent {
  book: Book;
}

interface PostingContent extends PostCardBaseContent {
  title: string;
  content: string;
  review?: never;
}

interface OneLineContent extends PostCardBaseContent {
  review: string;
  title?: never;
  content?: never;
}

interface PostCardContentProps {
  type: PostType;
  content: PostingContent | OneLineContent;
}

const PostCardContent = ({
  type,
  content: { book, title, content, review },
}: PostCardContentProps): JSX.Element => {
  // html 태그를 제거한 순수 텍스트
  const plainText = stripHtml(content ?? '').result;
  const getContent = () => {
    switch (type) {
      case '한줄평':
        return (
          <>
            <Box sx={styles.cardTitleBox}>
              <Typography variant="h6" sx={styles.cardTitle}>
                {book.bookTitle}
              </Typography>
              <Typography variant="body2" sx={styles.bookAuthor}>
                {book.author}
              </Typography>
            </Box>
            <Box sx={styles.cardDescriptionBox}>
              <Typography
                variant="h6"
                fontWeight="bold"
                fontSize="18px"
                align="center"
                sx={styles.cardSentence}
              >
                {`"${review}"`}
              </Typography>
            </Box>
          </>
        );
      case '포스팅':
      default:
        return (
          <>
            <Box sx={styles.cardTitleBox}>
              <Typography variant="h6" sx={styles.cardTitle}>
                {title}
              </Typography>
            </Box>
            <Box sx={styles.cardDescriptionBox}>
              <Typography
                variant="body2"
                fontSize="13px"
                sx={styles.postingDescription}
              >
                {plainText}
              </Typography>
            </Box>
          </>
        );
    }
  };

  return <CardContent sx={styles.cardContent}>{getContent()}</CardContent>;
};

export default PostCardContent;
