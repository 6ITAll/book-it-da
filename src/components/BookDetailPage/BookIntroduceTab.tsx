import React from 'react';
import { Box, Typography } from '@mui/material';
import GenderAgeChart from '@components/BookDetailPage/GenderAgeChart';
import GenderAgeSummary from '@components/BookDetailPage/GenderAgeSummary';

interface BookIntroduceTabProps {
  description?: string;
}

const BookIntroduceTab: React.FC<BookIntroduceTabProps> = ({ description }) => {
  return (
    <>
      {/* 성별·연령별 인기 분포 */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          gap: '1rem',
          padding: '1rem 1rem',
        }}
      >
        <GenderAgeChart />
        <GenderAgeSummary />
      </Box>
      {/* 책 소개 */}
      <Box
        sx={{
          marginBottom: '1.5rem',
          padding: '1rem 1rem',
          borderTop: '4px solid #e6e7e8',
        }}
      >
        <Typography variant="h6" fontWeight="bold" gutterBottom>
          책 소개
        </Typography>
        <Typography variant="body1" color="text.secondary">
          {description || '책 소개가 없습니다.'}
        </Typography>
      </Box>
    </>
  );
};

export default BookIntroduceTab;
