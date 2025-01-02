import { useGetUserFeedsQuery } from '@features/MyPage/api/userFeedsApi';
import Feed from './Feed';
import { Typography } from '@mui/material';

interface UserFeedTabPanelProps {
  userId: string;
}

const UserFeedTabPanel = ({ userId }: UserFeedTabPanelProps): JSX.Element => {
  const { data: feeds, error, isLoading } = useGetUserFeedsQuery(userId);

  if (isLoading) return <Typography>로딩 중...</Typography>;
  if (error) return <Typography>에러 발생: {JSON.stringify(error)}</Typography>;

  return <>{feeds && <Feed posts={feeds.posts} reviews={feeds.reviews} />}</>;
};

export default UserFeedTabPanel;
