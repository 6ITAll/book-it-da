import { Button, Stack, Typography, useTheme } from '@mui/material';
import HybridDialog from '../commons/HybridDialog/HybridDialog';
import { useState } from 'react';
import FollowList from './FollowList';
import userInfoStyles from './Mypage.style';

interface UserInfoSummaryProps {
  count: number;
  label: string;
  isAction?: boolean;
}

const UserInfoSummary = ({ count, label, isAction }: UserInfoSummaryProps) => {
  const [open, setOpen] = useState(false);
  const theme = useTheme();

  return (
    <>
      <Stack
        component={isAction ? Button : 'div'}
        alignItems="center"
        padding="6px 4px"
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
    </>
  );
};

export default UserInfoSummary;
