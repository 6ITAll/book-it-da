import { Button, Stack, Typography, useTheme, Box } from '@mui/material';
import HybridDialog from '../commons/HybridDialog/HybridDialog';
import { useState } from 'react';
import FollowList from './FollowList';
import userInfoStyles from '@components/MyPage/mypage.style';

interface UserInfoSummaryProps {
  count: number;
  label: string;
  isAction?: boolean;
  type?: 'followers' | 'followings';
  userId: string;
  onRefetch: () => void;
}

const UserInfoSummary = ({
  count,
  label,
  isAction,
  type,
  userId,
  onRefetch,
}: UserInfoSummaryProps) => {
  const [open, setOpen] = useState(false);
  const theme = useTheme();

  return (
    <Stack
      direction="row"
      alignItems="center"
      justifyContent="center"
      sx={{
        margin: '0 !important',
        width: '60px',
        height: '60px',
        textAlign: 'center',
      }}
    >
      <Stack
        component={isAction ? Button : Box}
        alignItems="center"
        justifyContent="center"
        minWidth={60}
        onClick={
          isAction
            ? () => {
                setOpen(true);
              }
            : undefined
        }
        sx={{
          width: '100%',
          height: '100%',
          ...(isAction
            ? label === '팔로잉'
              ? userInfoStyles.userInfoButtonFollowing(theme)
              : userInfoStyles.userInfoButtonFollower(theme)
            : {}),
        }}
      >
        <Typography variant="h6">{count}</Typography>
        <Typography variant="body2">{label}</Typography>
      </Stack>
      {isAction && type && (
        <HybridDialog
          open={open}
          setOpen={setOpen}
          title={label}
          contentNode={
            <FollowList
              setOpen={setOpen}
              type={type}
              userId={userId}
              onRefetch={onRefetch}
            />
          }
        />
      )}
    </Stack>
  );
};

export default UserInfoSummary;
