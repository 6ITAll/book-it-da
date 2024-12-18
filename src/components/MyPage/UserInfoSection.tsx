import { Avatar, Stack, Typography } from '@mui/material';
import UserInfoSummary from './UserInfoSummary';

const UserInfoSection = (): JSX.Element => {
  /* TODO user api로 받아오기  */
  const user = {
    name: '김독서',
    avartarUrl: '',
    about: '책을 사랑하는 독서가',
    userStats: [
      { count: 286, label: '피드' },
      { count: 842, label: '팔로워' },
      { count: 267, label: '팔로잉' },
    ],
  };

  return (
    <Stack direction="row" alignItems="center" spacing={4} padding={4}>
      <Avatar
        alt={user.name}
        src={user.avartarUrl}
        sx={{ width: 100, height: 100 }}
      />
      <Stack spacing={2}>
        <Typography variant="h6" fontWeight="bold">
          {user.name}
        </Typography>
        <Stack direction="row" spacing={4}>
          {user?.userStats?.map(({ count, label }) => (
            <UserInfoSummary key={label} count={count} label={label} />
          ))}
        </Stack>
        <Typography variant="body2" color="grey.700">
          {user.about}
        </Typography>
      </Stack>
    </Stack>
  );
};

export default UserInfoSection;
