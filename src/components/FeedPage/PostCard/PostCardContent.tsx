import { Box, CardContent, Typography } from '@mui/material';
import { styles } from './PostCard.styles';
import { PostType } from '@shared/types/type';

interface PostCardBaseContent {
  bookTitle: string;
  bookAuthor: string;
}

interface PostingContent extends PostCardBaseContent {
  title: string;
  description: string;
  review?: never;
}

interface OneLineContent extends PostCardBaseContent {
  review: string;
  title?: never;
  description?: never;
}

interface PostCardContentProps {
  type: PostType;
  content: PostingContent | OneLineContent;
}

const PostCardContent = ({
  type,
  content: { bookTitle, bookAuthor, title, description, review },
}: PostCardContentProps) => {
  const getContent = () => {
    switch (type) {
      case '한줄평':
        return (
          <>
            <Box sx={styles.cardTitleBox}>
              <Typography variant="h6" sx={styles.cardTitle}>
                {bookTitle}
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={styles.bookAuthor}
              >
                {bookAuthor}
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
                {description}
              </Typography>
            </Box>
          </>
        );
    }
  };

  return <CardContent sx={styles.cardContent}>{getContent()}</CardContent>;
};

export default PostCardContent;
