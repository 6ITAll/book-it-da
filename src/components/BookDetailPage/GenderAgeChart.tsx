import { Box, Typography, Stack, LinearProgress } from '@mui/material';
import { GenderAge } from '@shared/types/type';
import { chartStyles } from '@components/BookDetailPage/BookDetail.styles';

interface GenderAgeChartProps {
  data: GenderAge[];
}

const GenderAgeChart = ({ data }: GenderAgeChartProps): JSX.Element => {
  return (
    <Box sx={chartStyles.GenderAgeChartBox}>
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
            sx={chartStyles.progressMale}
          />
          <Typography variant="body2" sx={chartStyles.percentageText}>
            {row.male}%
          </Typography>
          <LinearProgress
            variant="determinate"
            value={row.female}
            sx={chartStyles.progressFemale}
          />
          <Typography variant="body2" sx={chartStyles.percentageText}>
            {row.female}%
          </Typography>
        </Stack>
      ))}
      <Typography variant="body2" color="text.secondary">
        남성 <span style={chartStyles.maleLegendDot}>●</span> 여성{' '}
        <span style={chartStyles.femaleLegendDot}>●</span> (단위: %)
      </Typography>
    </Box>
  );
};

export default GenderAgeChart;
