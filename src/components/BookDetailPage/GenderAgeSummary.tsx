import { Box, Stack, Typography } from '@mui/material';
import { summaryStyles } from '@components/BookDetailPage/BookDetail.styles';
import { RootState } from '@store/index';
import { defaultReaderStats } from '@features/BookDetailPage/slice/readerStatsSlice';
import { useSelector } from 'react-redux';
import { AgeGroup } from './types';

const ageGroupLabels: Record<AgeGroup, string> = {
  '10s': '10대',
  '20s': '20대',
  '30s': '30대',
  '40s': '40대',
  '50s': '50대',
  '60plus': '60대 이상',
  'unknown': '미상',
};
// 타입 추후 components/BookDetailPage/types.ts 로
interface TransformedData {
  age: AgeGroup;
  gender: string;
  value: number;
}

const defaultData: TransformedData = {
  age: 'unknown',
  gender: 'unknown',
  value: 0,
};

const GenderAgeSummary = (): JSX.Element => {
  const readerStats =
    useSelector((state: RootState) => state.readerStats) || defaultReaderStats;
  const isEmptyData =
    !readerStats?.demographics ||
    (Object.values(readerStats.demographics.gender.male).every(
      (v) => v === 0,
    ) &&
      Object.values(readerStats.demographics.gender.female).every(
        (v) => v === 0,
      ) &&
      readerStats.demographics.gender.unknown === 0);

  if (isEmptyData) {
    return (
      <Box sx={summaryStyles.container}>
        <Stack sx={summaryStyles.emptyStack}>
          <Typography sx={summaryStyles.topInfoText}>
            서재에 책을 담은 사람이 없습니다.
          </Typography>
        </Stack>
      </Box>
    );
  }

  const transformedData: TransformedData[] = [
    ...Object.entries(readerStats.demographics.gender.male).map(
      ([age, value]) => ({
        age: age as AgeGroup,
        gender: '남성',
        value,
      }),
    ),
    ...Object.entries(readerStats.demographics.gender.female).map(
      ([age, value]) => ({
        age: age as AgeGroup,
        gender: '여성',
        value,
      }),
    ),
  ].filter((item) => item.age !== 'unknown' && item.value > 0);

  const sortedData: TransformedData[] = transformedData.sort(
    (a, b) => b.value - a.value,
  );

  const top1: TransformedData = sortedData[0] || defaultData;
  const top2: TransformedData | null = sortedData[1] || null;

  return (
    <Box sx={summaryStyles.container}>
      <Stack sx={summaryStyles.emptyStack}>
        <Typography sx={summaryStyles.topInfoText}>
          이 책을 서재에 가장 많이 담은 회원
        </Typography>
        <Typography variant="body2">
          <strong>1위</strong> {ageGroupLabels[top1.age]} {top1.gender}
          {top2 && (
            <>
              {' '}
              <strong>2위</strong> {ageGroupLabels[top2.age]} {top2.gender}
            </>
          )}
        </Typography>
      </Stack>
    </Box>
  );
};

export default GenderAgeSummary;
