import { Button, Stack, Typography } from '@mui/material';
import HybridDialog from '../commons/HybridDialog/HybridDialog';
import { useState } from 'react';
import FollowList from './FollowList';

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
    </>
  );
};

export default UserInfoSummary;
