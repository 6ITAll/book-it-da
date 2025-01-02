import { Box, Stack, Typography } from '@mui/material';
import { GenderAge } from '@shared/types/type';

interface GenderAgeSummaryProps {
  data: GenderAge[];
}

const GenderAgeSummary = ({
  data = [],
}: GenderAgeSummaryProps): JSX.Element => {
  // 데이터가 모두 default 값인지 확인
  const isDefaultData = data.every(
    (item) => item.male === 0 && item.female === 0,
  );
  // 만약 서재에 담은 사람이 없어서, data가 아예 없다면
  if (isDefaultData) {
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
            서재에 책을 담은 사람이 없습니다.
          </Typography>
        </Stack>
      </Box>
    );
  }
  // 데이터 변환: 성별과 연령을 각각의 객체로 분리
  const transformedData = data.flatMap((item) => [
    { age: item.age, gender: '남성', value: item.male },
    { age: item.age, gender: '여성', value: item.female },
  ]);

  // value 기준으로 내림차순 정렬
  const sortedData = transformedData.sort((a, b) => b.value - a.value);

  // 상위 2개 항목 추출
  const top1 = sortedData[0] || { age: '데이터 없음', gender: 'N/A', value: 0 };
  const top2 = sortedData[1] || null; // 두 번째 항목이 없을 경우 null

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
          <strong>1위</strong> {top1.age} {top1.gender}
          {top2 && top2.value > 0 && (
            <>
              {' '}
              <strong>2위</strong> {top2.age} {top2.gender}
            </>
          )}
        </Typography>
      </Stack>
    </Box>
  );
};

export default GenderAgeSummary;
