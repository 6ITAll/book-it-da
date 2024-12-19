import { Button, Stack, Typography } from '@mui/material';
import HybridDialog from '../commons/HybridDialog';
import { useState } from 'react';
import FollowList from './FollowList';

interface UserInfoSummaryProps {
  count: number;
  label: string;
  isAction?: boolean;
}

const UserInfoSummary = ({ count, label, isAction }: UserInfoSummaryProps) => {
  const [open, setOpen] = useState(false);

  return (
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
      <HybridDialog
        open={open}
        setOpen={setOpen}
        title={label}
        contentNode={<FollowList />}
      />
    </Stack>
  );
};

export default UserInfoSummary;
