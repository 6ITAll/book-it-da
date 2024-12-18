import { Stack, Typography } from '@mui/material';

interface UserInfoSummaryProps {
  count: number;
  label: string;
}

const UserInfoSummary = ({ count, label }: UserInfoSummaryProps) => {
  return (
    <Stack alignItems="center">
      <Typography>{count}</Typography>
      <Typography>{label}</Typography>
    </Stack>
  );
};

export default UserInfoSummary;
