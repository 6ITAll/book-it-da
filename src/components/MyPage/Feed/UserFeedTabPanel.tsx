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
  type: string;
}

const UserFeedTabPanel = ({
  userId,
  username,
  type,
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
    username,
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
        postingsCount={feedsCount?.totalPostingsCount ?? 0}
        oneLineReviewsCount={feedsCount?.totalReviewsCount ?? 0}
        type={type}
      />
    </>
  );
};

export default UserFeedTabPanel;
