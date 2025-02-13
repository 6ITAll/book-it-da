import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useLocation, useParams, useNavigate } from 'react-router-dom';
import { RootState } from '@store/index';
import { useGetUserProfileStatsQuery } from '@features/MyPage/api/userProfileStatsApi';
import TabSection from '@components/MyPage/TabSection';
import UserInfoSection from '@components/MyPage/UserInfoSection';
import { Container, Typography } from '@mui/material';

const MyPage = (): JSX.Element => {
  const { username } = useParams<{ username: string }>();
  const currentUsername = useSelector(
    (state: RootState) => state.user.userInfo?.username,
  );
  const location = useLocation();
  const navigate = useNavigate();
  const [isCurrentUser, setIsCurrentUser] = useState(false);

  const { data, error, isLoading, refetch } = useGetUserProfileStatsQuery(
    username || '',
  );

  useEffect(() => {
    if (currentUsername && username) {
      setIsCurrentUser(currentUsername === username);
    }
  }, [currentUsername, username]);

  useEffect(() => {
    if (isCurrentUser && currentUsername && username !== currentUsername) {
      navigate(`/my-page/${currentUsername}`, { replace: true });
    }
  }, [isCurrentUser, currentUsername, username, navigate]);

  useEffect(() => {
    refetch();
  }, [location, username, refetch]);

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
          id: data?.user_id,
          name: data?.user_name,
          avatarUrl: data?.user_avatar_url,
          about: data?.user_about,
        }}
        userStats={userStats}
        userId={data?.user_id}
        onRefetch={refetch}
      />
      <TabSection userId={data?.user_id} username={username || ''} />
    </Container>
  );
};

export default MyPage;
