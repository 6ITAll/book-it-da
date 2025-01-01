import { Stack, Button } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import ShareIcon from '@mui/icons-material/Share';

const ActionButtons = (): JSX.Element => {
  return (
    <Stack direction="row" spacing={2}>
      <Button
        sx={{
          borderRadius: '50%',
          minWidth: 0,
          width: 36,
          height: 36,
          backgroundColor: '#f5f5f5',
          boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
          '&:hover': { backgroundColor: '#e0e0e0' },
        }}
      >
        <EditIcon sx={{ width: 18, height: 18 }} />
      </Button>
      <Button
        sx={{
          borderRadius: '50%',
          minWidth: 0,
          width: 36,
          height: 36,
          backgroundColor: '#f5f5f5',
          boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
          '&:hover': { backgroundColor: '#e0e0e0' },
        }}
      >
        <ShareIcon sx={{ width: 18, height: 18 }} />
      </Button>
    </Stack>
  );
};

export default ActionButtons;
