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
    { count: 842, label: '팔로워', isAction: true },
    { count: 267, label: '팔로잉', isAction: true },
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
          {userStats.map(({ count, label, isAction }) => (
            <UserInfoSummary
              key={label}
              count={count}
              label={label}
              isAction={isAction}
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
