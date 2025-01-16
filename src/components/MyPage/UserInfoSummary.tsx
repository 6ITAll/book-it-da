import { Button, Stack, Typography, useTheme, Divider } from '@mui/material';
import HybridDialog from '../commons/HybridDialog/HybridDialog';
import { useState } from 'react';
import FollowList from './FollowList';
import userInfoStyles from '@components/MyPage/mypage.style';

interface UserInfoSummaryProps {
  count: number;
  label: string;
  isAction?: boolean;
}

const UserInfoSummary = ({ count, label, isAction }: UserInfoSummaryProps) => {
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
      <HybridDialog
        open={open}
        setOpen={setOpen}
        title={label}
        contentNode={<FollowList setOpen={setOpen} />}
      />
    </Stack>
  );
};

export default UserInfoSummary;
