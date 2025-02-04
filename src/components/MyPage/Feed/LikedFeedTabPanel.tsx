import {
  useGetLatestLikedPostingsQuery,
  useGetLatestLikedReviewsQuery,
  useGetUserLikedCountsQuery,
} from '@features/MyPage/api/userLikedFeedsApi';
import Feed from './Feed';
import { Typography } from '@mui/material';

interface LikedFeedTabPanelProps {
  userId: string;
  username: string;
  type: string;
}

const LikedFeedTabPanel = ({
  userId,
  username,
  type,
}: LikedFeedTabPanelProps): JSX.Element => {
  const {
    data: likedOneLineReviews,
    error: likedOneLineReviewsError,
    isLoading: isLoadinglikedOneLineReviews,
  } = useGetLatestLikedReviewsQuery({ userId });

  const {
    data: likedPostings,
    error: likedPostingsError,
    isLoading: isLoadinglikedPostings,
  } = useGetLatestLikedPostingsQuery({ userId });

  const { data: likedFeedsCount } = useGetUserLikedCountsQuery({
    username,
  });

  if (isLoadinglikedOneLineReviews || isLoadinglikedPostings)
    return <Typography>로딩 중...</Typography>;

  if (likedOneLineReviewsError || likedPostingsError)
    return (
      <Typography>
        에러 발생:{' '}
        {JSON.stringify(likedOneLineReviewsError || likedPostingsError)}
      </Typography>
    );

  if (!likedOneLineReviews || !likedPostings)
    return <Typography>데이터가 없습니다.</Typography>;

  return (
    <>
      <Feed
        userId={userId}
        username={username}
        postings={likedPostings}
        oneLineReviews={likedOneLineReviews}
        postingsCount={likedFeedsCount?.totalLikedPostingsCount ?? 0}
        oneLineReviewsCount={likedFeedsCount?.totalLikedReviewsCount ?? 0}
        type={type}
      />
    </>
  );
};

export default LikedFeedTabPanel;
