import { Button, Stack, Typography, useTheme, Divider } from '@mui/material';
import HybridDialog from '../commons/HybridDialog/HybridDialog';
import { useState } from 'react';
import FollowList from './FollowList';
import userInfoStyles from '@components/MyPage/mypage.style';

interface UserInfoSummaryProps {
  count: number;
  label: string;
  isAction?: boolean;
  type?: 'followers' | 'followings'; //추가
}

const UserInfoSummary = ({
  count,
  label,
  isAction,
  type,
}: UserInfoSummaryProps) => {
  const [open, setOpen] = useState(false);
  const theme = useTheme();

  return (
    <Stack
      divider={<Divider orientation="vertical" flexItem />}
      direction="row"
      alignItems="center"
      sx={{
        margin: '0 !important', // 최상위 Stack margin 제거
      }}
    >
      <Stack
        component={isAction ? Button : 'div'}
        alignItems="center"
        minWidth={64}
        onClick={
          isAction
            ? () => {
                setOpen(true);
              }
            : undefined
        }
        sx={
          isAction
            ? label === '팔로잉'
              ? userInfoStyles.userInfoButtonFollowing(theme)
              : userInfoStyles.userInfoButtonFollower(theme)
            : {}
        }
      >
        <Typography>{count}</Typography>
        <Typography>{label}</Typography>
      </Stack>
      {isAction && type && (
        <HybridDialog
          open={open}
          setOpen={setOpen}
          title={label}
          contentNode={<FollowList setOpen={setOpen} type={type} />}
        />
      )}
    </Stack>
  );
};

export default UserInfoSummary;
