import { Typography } from '@mui/material';
import Feed from './Feed';
import {
  useGetLatestOneLineReviewsQuery,
  useGetLatestPostingsQuery,
  useGetUserPostingReviewCountsQuery,
} from '@features/MyPage/api/userFeedsApi';

interface UserFeedTabPanelProps {
  userId: string;
  username: string;
}

const UserFeedTabPanel = ({
  userId,
  username,
}: UserFeedTabPanelProps): JSX.Element => {
  const {
    data: oneLineReviewsData,
    error: oneLineReviewsError,
    isLoading: isLoadingOneLineReviews,
  } = useGetLatestOneLineReviewsQuery({ userId });
  const {
    data: postingsData,
    error: postingsError,
    isLoading: isLoadingPostings,
  } = useGetLatestPostingsQuery({ userId });

  const { data: feedsCount } = useGetUserPostingReviewCountsQuery({
    userId,
  });

  if (isLoadingOneLineReviews || isLoadingPostings)
    return <Typography>로딩 중...</Typography>;

  if (oneLineReviewsError || postingsError)
    return (
      <Typography>
        에러 발생: {JSON.stringify(oneLineReviewsError || postingsError)}
      </Typography>
    );

  if (!oneLineReviewsData || !postingsData)
    return <Typography>데이터가 없습니다.</Typography>;

  return (
    <>
      <Feed
        userId={userId}
        username={username}
        postings={postingsData}
        oneLineReviews={oneLineReviewsData}
        postingsCount={feedsCount?.total_postings_count ?? 0}
        oneLineReviewsCount={feedsCount?.total_reviews_count ?? 0}
      />
    </>
  );
};

export default UserFeedTabPanel;
