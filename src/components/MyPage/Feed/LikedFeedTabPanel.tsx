import { useGetLikedFeedsQuery } from '@features/MyPage/userFeedsApi';
import Feed from './Feed';
import { Typography } from '@mui/material';

interface LikedFeedTabPanelProps {
  userId: string;
}

const LikedFeedTabPanel = ({ userId }: LikedFeedTabPanelProps): JSX.Element => {
  const { data: feeds, error, isLoading } = useGetLikedFeedsQuery(userId);

  if (isLoading) return <Typography>로딩 중...</Typography>;
  if (error) return <Typography>에러 발생: {JSON.stringify(error)}</Typography>;

  return <>{feeds && <Feed posts={feeds.posts} reviews={feeds.reviews} />}</>;
};

export default LikedFeedTabPanel;
