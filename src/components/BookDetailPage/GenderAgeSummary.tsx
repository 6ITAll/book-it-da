import { Box, Stack, Typography } from '@mui/material';

const GenderAgeSummary = (): JSX.Element => {
  return (
    <Box
      sx={{
        display: 'flex',
        flex: 1,
        flexDirection: 'column',
        borderRadius: '8px',
        padding: '0 1rem',
        gap: '1rem',
      }}
    >
      <Stack
        sx={{
          backgroundColor: '#f9f9f9',
          flex: 1,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Typography variant="body2" fontWeight="bold">
          이 책을 서재에 가장 많이 담은 회원
        </Typography>
        <Typography variant="body2">
          <strong>1위</strong> 20대 여성 <strong>2위</strong> 20대 남성
        </Typography>
      </Stack>
      <Stack
        sx={{
          backgroundColor: '#f9f9f9',
          flex: 1,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Typography variant="body2" fontWeight="bold">
          이 책이 속한 세계문학전집 분야
        </Typography>
        <Typography variant="body2">
          역시 20대 여성이 가장 즐겨보고 있어요.
        </Typography>
      </Stack>
    </Box>
  );
};

export default GenderAgeSummary;
