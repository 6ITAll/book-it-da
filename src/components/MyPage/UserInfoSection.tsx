import { Stack, Typography, Avatar } from '@mui/material';
import UserInfoSummary from './UserInfoSummary';

interface UserInfo {
  userId: string;
  name: string;
  avatarUrl: string;
}

interface UserInfoSectionProps {
  userInfo: UserInfo;
}

const UserInfoSection = ({ userInfo }: UserInfoSectionProps): JSX.Element => {
  const userStats = [
    { count: 286, label: '피드' },
    {
      count: 842,
      label: '팔로워',
      isAction: true,
      type: 'followers' as const,
    }, // type 명시
    {
      count: 267,
      label: '팔로잉',
      isAction: true,
      type: 'followings' as const,
    },
  ];

  return (
    <Stack direction="row" alignItems="center" spacing={4} padding={4}>
      <Avatar
        alt={userInfo.name}
        src={userInfo.avatarUrl}
        sx={{ width: 100, height: 100 }}
      />
      <Stack spacing={1}>
        <Typography variant="h6" fontWeight="bold">
          {userInfo.name}
        </Typography>
        <Stack direction="row" spacing={2} alignItems="center">
          {userStats.map(({ count, label, isAction, type }) => (
            <UserInfoSummary
              key={label}
              count={count}
              label={label}
              isAction={isAction}
              type={type} // type prop 전달
            />
          ))}
        </Stack>
        <Typography variant="body2" color="grey.700">
          책을 사랑하는 독서가
        </Typography>
      </Stack>
    </Stack>
  );
};

export default UserInfoSection;
