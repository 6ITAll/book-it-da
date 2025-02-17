import { Stack, Typography, Avatar } from '@mui/material';
import UserInfoSummary from './UserInfoSummary';
import FollowButton from './FollowButton';
import { UserInfo, UserStat } from './types';

interface UserInfoSectionProps {
  userInfo: UserInfo;
  userStats: UserStat[];
  userId: string;
  onRefetch: () => void;
  showFollowButton: boolean;
  userIdForFollow: string;
}

const UserInfoSection = ({
  userInfo,
  userStats,
  userId,
  onRefetch,
  showFollowButton,
  userIdForFollow,
}: UserInfoSectionProps): JSX.Element => {
  return (
    <Stack direction="row" alignItems="center" spacing={4} padding={4}>
      <Avatar
        alt={userInfo.name}
        src={userInfo.avatarUrl}
        sx={{ width: 100, height: 100 }}
      />
      <Stack spacing={1}>
        <Stack direction="row" spacing={2} alignItems="center">
          <Typography variant="h6" fontWeight="bold">
            {userInfo.name}
          </Typography>
          {showFollowButton && <FollowButton userId={userIdForFollow} />}
        </Stack>
        <Stack direction="row" spacing={2} alignItems="center">
          {userStats.map(({ count, label, isAction, type }) => (
            <UserInfoSummary
              key={label}
              count={count}
              label={label}
              isAction={isAction}
              type={type}
              userId={userId}
              onRefetch={onRefetch}
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
