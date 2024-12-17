import TabSection from '@components/MyPage/TabSection';
import UserInfoSection from '@components/MyPage/UserInfoSection';
import { Container } from '@mui/material';

const MyPage = (): JSX.Element => {
  return (
    <Container>
      <UserInfoSection />
      <TabSection />
    </Container>
  );
};

export default MyPage;
