import { Avatar, Stack, Typography } from '@mui/material';
import UserInfoSummary from './UserInfoSummary';

interface UserInfoSectionProps {
  userId: string;
}

const UserInfoSection = ({ userId }: UserInfoSectionProps): JSX.Element => {
  /* TODO user api로 받아오기  */
  /* 본인이 아닐 경우 isAction은 모두 false -> api 연동 후 처리 */
  const user = (userId: string) => ({
    name: '김독서',
    userId: userId, // 실제로는 응답에 따른 값이 들어갑니다.
    avartarUrl: '',
    about: '책을 사랑하는 독서가',
    userStats: [
      { count: 286, label: '피드' },
      { count: 842, label: '팔로워', isAction: true },
      { count: 267, label: '팔로잉', isAction: true },
    ],
  });

  return (
    <Stack direction="row" alignItems="center" spacing={4} padding={4}>
      <Avatar
        alt={user(userId).name}
        src={user(userId).avartarUrl}
        sx={{ width: 100, height: 100 }}
      />
      <Stack spacing={1}>
        <Typography variant="h6" fontWeight="bold">
          {user(userId).name}
        </Typography>
        <Stack direction="row" spacing={2} alignItems="center">
          {user(userId)?.userStats?.map(({ count, label, isAction }) => (
            <UserInfoSummary
              key={label}
              count={count}
              label={label}
              isAction={isAction}
            />
          ))}
        </Stack>
        <Typography variant="body2" color="grey.700">
          {user(userId).about}
        </Typography>
      </Stack>
    </Stack>
  );
};

export default UserInfoSection;
