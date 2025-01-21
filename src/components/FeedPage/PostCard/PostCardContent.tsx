import { Box, CardContent, Typography } from '@mui/material';
import styles from './PostCard.styles';
import { PostType } from '@shared/types/type';
import { stripHtml } from 'string-strip-html';

interface PostCardBaseContent {
  book: {
    isbn: string;
  };
}

interface PostingContent extends PostCardBaseContent {
  title: string;
  content: string;
  review?: never; // 한줄평에서는 사용되지 않음
}

interface OneLineContent extends PostCardBaseContent {
  review: string;
  title?: never; // 포스팅에서는 사용되지 않음
  content?: never; // 포스팅에서는 사용되지 않음
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
                {/* {book.title} */}
              </Typography>
              <Typography variant="body2" sx={styles.bookAuthor}>
                {/* {book.author} */}
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
