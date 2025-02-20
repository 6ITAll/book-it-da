import { Box, Typography, Stack, LinearProgress } from '@mui/material';
import { chartStyles } from '@components/BookDetailPage/BookDetail.styles';
import { RootState } from '@store/index';
import { defaultReaderStats } from '@features/BookDetailPage/slice/readerStatsSlice';
import { useSelector } from 'react-redux';
import { transformDemographicsData } from '@utils/BookDetailPage/transformDemographicsData';
import { AgeGroup, AgeGroupData } from './types';

const ageGroupLabels: Record<AgeGroup, string> = {
  '10s': '10대',
  '20s': '20대',
  '30s': '30대',
  '40s': '40대',
  '50s': '50대',
  '60plus': '60대 이상',
  'unknown': 'unknown',
};

const GenderAgeChart = (): JSX.Element => {
  const readerStats =
    useSelector((state: RootState) => state.readerStats) || defaultReaderStats;
  const chartData: AgeGroupData[] = transformDemographicsData(readerStats);

  return (
    <Box sx={chartStyles.GenderAgeChartBox}>
      <Typography variant="h6" fontWeight="bold">
        성별·연령별 인기 분포
      </Typography>
      {chartData.map((row: AgeGroupData) => (
        <Stack
          key={row.ageGroup}
          direction="row"
          alignItems="center"
          spacing={2}
        >
          <Typography variant="body2" sx={{ width: '10%' }}>
            {ageGroupLabels[row.ageGroup]}
          </Typography>
          <LinearProgress
            variant="determinate"
            value={row.male}
            sx={chartStyles.progressMale}
          />
          <Typography variant="body2" sx={chartStyles.percentageText}>
            {row.male.toFixed(1)}%
          </Typography>
          <LinearProgress
            variant="determinate"
            value={row.female}
            sx={chartStyles.progressFemale}
          />
          <Typography variant="body2" sx={chartStyles.percentageText}>
            {row.female.toFixed(1)}%
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
