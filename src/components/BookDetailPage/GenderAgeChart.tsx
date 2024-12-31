import { Box, Typography, Stack, LinearProgress } from '@mui/material';

const GenderAgeChart = (): JSX.Element => {
  const data = [
    { age: '10대', male: 3.6, female: 3.2 },
    { age: '20대', male: 15.7, female: 17.8 },
    { age: '30대', male: 11.3, female: 13.8 },
    { age: '40대', male: 10.3, female: 10.6 },
    { age: '50대', male: 5.3, female: 5 },
    { age: '60대~', male: 1.3, female: 1.5 },
  ];

  return (
    <Box
      sx={{
        display: 'flex',
        flex: 2,
        flexDirection: 'column',
        backgroundColor: '#f9f9f9',
        borderRadius: '8px',
        padding: '1rem 1rem',
        gap: '1rem',
      }}
    >
      <Typography variant="h6" fontWeight="bold">
        성별·연령별 인기 분포
      </Typography>
      {data.map((row, index) => (
        <Stack key={index} direction="row" alignItems="center" spacing={2}>
          <Typography variant="body2" sx={{ width: '10%' }}>
            {row.age}
          </Typography>
          <LinearProgress
            variant="determinate"
            value={row.male}
            sx={{
              height: 8,
              borderRadius: '4px',
              backgroundColor: '#d1e4f6',
              flex: 1,
              '& .MuiLinearProgress-bar': { backgroundColor: '#4285f4' },
            }}
          />
          <Typography
            variant="body2"
            sx={{ width: '10%', textAlign: 'center' }}
          >
            {row.male}%
          </Typography>
          <LinearProgress
            variant="determinate"
            value={row.female}
            sx={{
              height: 8,
              borderRadius: '4px',
              backgroundColor: '#fbdcdc',
              flex: 1,
              '& .MuiLinearProgress-bar': { backgroundColor: '#e53935' },
            }}
          />
          <Typography
            variant="body2"
            sx={{ width: '10%', textAlign: 'center' }}
          >
            {row.female}%
          </Typography>
        </Stack>
      ))}
      <Typography variant="body2" color="text.secondary">
        남성 <span style={{ color: '#4285f4' }}>●</span> 여성{' '}
        <span style={{ color: '#e53935' }}>●</span> (단위: %)
      </Typography>
    </Box>
  );
};

export default GenderAgeChart;
