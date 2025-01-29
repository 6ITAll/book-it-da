import TabSection from '@components/MyPage/TabSection';
import UserInfoSection from '@components/MyPage/UserInfoSection';
import { useGetUserProfileStatsQuery } from '@features/MyPage/api/userProfileStatsApi';
import { Container, Typography } from '@mui/material';
import { useParams } from 'react-router-dom';

const MyPage = (): JSX.Element => {
  const { username } = useParams<{ username: string }>();

  const { data, error, isLoading } = useGetUserProfileStatsQuery(
    username || '',
  );

  const userStats = [
    { count: data?.completed_books_count, label: '읽은책' },
    { count: data?.post_count, label: '피드' },
    {
      count: data?.follower_count,
      label: '팔로워',
      isAction: true,
      type: 'followers' as const,
    },
    {
      count: data?.following_count,
      label: '팔로잉',
      isAction: true,
      type: 'followings' as const,
    },
  ];

  if (isLoading) {
    return (
      <Container maxWidth="md">
        <Typography>로딩 중...</Typography>
      </Container>
    );
  }

  if (error || !data) {
    return (
      <Container maxWidth="md">
        <Typography>사용자 정보를 찾을 수 없습니다.</Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="md">
      <UserInfoSection
        userInfo={{
          userId: data?.user_id,
          name: data?.user_name,
          avatarUrl: data?.user_avatar_url,
          about: data?.user_about,
        }}
        userStats={userStats}
      />
      <TabSection userId={data?.user_id} />
    </Container>
  );
};

export default MyPage;
