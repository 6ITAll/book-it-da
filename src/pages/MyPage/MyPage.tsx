import TabSection from '@components/MyPage/TabSection';
import UserInfoSection from '@components/MyPage/UserInfoSection';
import { Container, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { follows } from 'src/mocks/handlers/follow';
import { useGetKakaoUserInfoQuery } from '@features/SNSLogin/api/Kakaoapi';

interface UserInfo {
  userId: string;
  name: string;
  avatarUrl: string;
  about?: string;
  userStats?: Array<{ count: number; label: string; isAction?: boolean }>;
}

const MyPage = (): JSX.Element => {
  const { userId: urlUserId } = useParams<{ userId: string }>();
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [kakaoAccessToken, setKakaoAccessToken] = useState<string | null>(null);

  const { data: kakaoUserInfo, error: kakaoError } = useGetKakaoUserInfoQuery(
    kakaoAccessToken ?? '',
    {
      skip: !kakaoAccessToken,
    },
  );

  useEffect(() => {
    const fetchUserInfo = () => {
      // 카카오 로그인(로컬스토리지)
      const storedKakaoAccessToken = localStorage.getItem('kakaoAccessToken');
      if (storedKakaoAccessToken) {
        setKakaoAccessToken(storedKakaoAccessToken);
        return;
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

      // 팔로우 사용자 정보 확인
      if (urlUserId) {
        const followUser = follows.find((user) => user.userId === urlUserId);
        if (followUser) {
          setUserInfo(followUser);
          return;
        }
      }

      setUserInfo(null);
    };

    fetchUserInfo();
  }, [urlUserId]);

  useEffect(() => {
    //실제 카카오 api
    if (kakaoUserInfo) {
      setUserInfo({
        userId: kakaoUserInfo.userId.toString(),
        name: kakaoUserInfo.properties.userName,
        avatarUrl: kakaoUserInfo.properties.avatarUrl,
      });
    }
    if (kakaoError) {
      console.error('Kakao User Info Error:', kakaoError);
    }
  }, [kakaoUserInfo, kakaoError]);

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
