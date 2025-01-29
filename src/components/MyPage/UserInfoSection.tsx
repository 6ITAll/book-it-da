import { Stack, Typography, Avatar } from '@mui/material';
import UserInfoSummary from './UserInfoSummary';

interface UserStat {
  count: number;
  label: string;
  isAction?: boolean;
  type?: 'followers' | 'followings';
}

interface UserInfo {
  userId: string;
  name: string;
  avatarUrl: string;
  about: string;
}

interface UserInfoSectionProps {
  userInfo: UserInfo;
  userStats: UserStat[];
}

const UserInfoSection = ({
  userInfo,
  userStats,
}: UserInfoSectionProps): JSX.Element => {
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
              type={type}
            />
          ))}
        </Stack>
        <Typography variant="body2" color="grey.700">
          {userInfo.about}
        </Typography>
      </Stack>
    </Stack>
  );
};

export default UserInfoSection;
