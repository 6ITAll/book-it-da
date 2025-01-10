import TabSection from '@components/MyPage/TabSection';
import UserInfoSection from '@components/MyPage/UserInfoSection';
import { Container, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { follows } from 'src/mocks/handlers/follow';

interface UserInfo {
  userId: string;
  name: string;
  avartarUrl: string;
  about?: string;
  userStats?: Array<{ count: number; label: string; isAction?: boolean }>;
}

const MyPage = (): JSX.Element => {
  const { userId: urlUserId } = useParams<{ userId: string }>();
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);

  useEffect(() => {
    //url로 userId 받기
    const fetchUserInfo = () => {
      if (urlUserId) {
        const followUser = follows.find((user) => user.userId === urlUserId);
        if (followUser) {
          setUserInfo(followUser);
          return;
        }
      }

      // 일반 로그인
      const storedUserInfo = localStorage.getItem('userInfo');
      if (storedUserInfo) {
        const users = JSON.parse(storedUserInfo);
        if (users.length > 0) {
          setUserInfo(users[0]);
          return;
        }
      }

      // 카카오 로그인
      const kakaoUserInfo = localStorage.getItem('kakaoUserInfo');
      if (kakaoUserInfo) {
        const kakaoUser = JSON.parse(kakaoUserInfo);
        setUserInfo({
          userId: kakaoUser.id.toString(),
          name: kakaoUser.properties.nickname,
          avartarUrl: kakaoUser.properties.profile_image,
        });
        return;
      }

      setUserInfo(null);
    };

    fetchUserInfo();
  }, [urlUserId]);

  if (!userInfo) {
    return (
      <Container maxWidth="md">
        <Typography>
          사용자 정보를 찾을 수 없습니다. 로그인 후 다시 시도해주세요.
        </Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="md">
      <UserInfoSection userInfo={userInfo} />
      <TabSection userId={userInfo.userId} />
    </Container>
  );
};

export default MyPage;
