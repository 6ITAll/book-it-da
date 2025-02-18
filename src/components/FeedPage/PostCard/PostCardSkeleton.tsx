import { Card, Skeleton, Box, CardHeader } from '@mui/material';
import styles from './PostCard.styles';
import { PostType } from '@shared/types/type';

interface PostCardSkeletonProps {
  postType: PostType;
}

const PostCardSkeleton = ({ postType }: PostCardSkeletonProps) => {
  return (
    <Card sx={styles.card}>
      <CardHeader
        sx={styles.cardHeader}
        avatar={<Skeleton variant="circular" width={40} height={40} />}
        title={<Skeleton height={10} width="80%" style={{ marginBottom: 6 }} />}
        subheader={<Skeleton animation="wave" height={10} width="40%" />}
      />
      <Skeleton
        variant="rectangular"
        width="100%"
        height={220}
        sx={{ mb: 1 }}
      />
      <Box padding={2}>
        <Skeleton width="60%" />
        <Skeleton width="90%" />
        <Skeleton width="70%" />
        <Skeleton width="60%" />
        {postType === '포스팅' && (
          <>
            <Skeleton width="30%" />
            <Skeleton width="60%" />
          </>
        )}
      </Box>
      <Skeleton sx={{ bgcolor: 'grey.50' }} variant="rectangular" height={48} />
    </Card>
  );
};

export default PostCardSkeleton;
