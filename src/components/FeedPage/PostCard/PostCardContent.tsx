import { Box, CardContent, Typography } from '@mui/material';
import styles from './PostCard.styles';
import { PostType } from '@shared/types/type';
import { stripHtml } from 'string-strip-html';

interface PostingContent {
  postTitle: string;
  postContent: string;
}

interface OneLineContent {
  title: string;
  author: string;
  review: string;
}

interface PostCardContentProps {
  type: PostType;
  content: PostingContent | OneLineContent;
}

const PostCardContent = ({
  type,
  content,
}: PostCardContentProps): JSX.Element => {
  const getContent = () => {
    switch (type) {
      case '한줄평': {
        const { title, author, review } = content as OneLineContent;
        return (
          <>
            <Box sx={styles.cardTitleBox}>
              <Typography variant="h6" sx={styles.cardTitle}>
                {title}
              </Typography>
              <Typography variant="body2" sx={styles.bookAuthor}>
                {author}
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
      }
      case '포스팅':
      default: {
        const { postTitle, postContent } = content as PostingContent;
        const plainText = stripHtml(postContent ?? '').result;
        return (
          <>
            <Box sx={styles.cardTitleBox}>
              <Typography variant="h6" sx={styles.cardTitle}>
                {postTitle}
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
    }
  };

  return <CardContent sx={styles.cardContent}>{getContent()}</CardContent>;
};

export default PostCardContent;
