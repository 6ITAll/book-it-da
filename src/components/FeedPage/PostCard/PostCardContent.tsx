import { Box, CardContent, Typography } from '@mui/material';
import { styles } from './PostCard.styles';
import { PostType } from '@shared/types/type';

interface PostCardContentProps {
  type: PostType;
  content: {
    bookTitle?: string;
    bookAuthor?: string;
    title: string;
    description: string;
  };
}

const PostCardContent = ({ type, content }: PostCardContentProps) => {
  const { bookTitle, bookAuthor, title, description } = content;

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
                {`"${title}"`}
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
