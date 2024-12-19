import { Button, Stack, Typography } from '@mui/material';

interface UserInfoSummaryProps {
  count: number;
  label: string;
  isAction?: boolean;
}

const UserInfoSummary = ({ count, label, isAction }: UserInfoSummaryProps) => {
  return (
    <Stack
      component={isAction ? Button : 'div'}
      alignItems="center"
      padding="6px 4px"
      minWidth={64}
    >
      <Typography>{count}</Typography>
      <Typography>{label}</Typography>
    </Stack>
  );
};

export default UserInfoSummary;
