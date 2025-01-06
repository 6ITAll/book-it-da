import TabSection from '@components/MyPage/TabSection';
import UserInfoSection from '@components/MyPage/UserInfoSection';
import { Container } from '@mui/material';
import { useParams } from 'react-router-dom';

const MyPage = (): JSX.Element => {
  /* TODO 로그인 작업 완료 후 내 유저 ID가 기본값으로 들어가도록 확장 */
  const { userId = 'test' } = useParams();

  return (
    <Container maxWidth="md">
      <UserInfoSection userId={userId} />
      <TabSection userId={userId} />
    </Container>
  );
};

export default MyPage;
