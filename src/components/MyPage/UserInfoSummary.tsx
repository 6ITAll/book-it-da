import { Stack, Typography } from '@mui/material';

interface UserInfoSummaryProps {
  count: number;
  label: string;
}

const UserInfoSummary = ({ count, label }: UserInfoSummaryProps) => {
  return (
    <Stack>
      <Typography>{count}</Typography>
      <Typography>{label}</Typography>
    </Stack>
  );
};

export default UserInfoSummary;
