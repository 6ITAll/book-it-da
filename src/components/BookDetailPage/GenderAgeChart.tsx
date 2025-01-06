import { Box, Typography, Stack, LinearProgress } from '@mui/material';
import { GenderAge } from '@shared/types/type';

interface GenderAgeChartProps {
  data: GenderAge[];
}

const GenderAgeChart = ({ data }: GenderAgeChartProps): JSX.Element => {
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
