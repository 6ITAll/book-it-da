import React from 'react';
import { Box, Typography } from '@mui/material';
import GenderAgeChart from '@components/BookDetailPage/GenderAgeChart';
import GenderAgeSummary from '@components/BookDetailPage/GenderAgeSummary';
import { useGetGenderAgeQuery } from '@features/BookDetailPage/api/genderAgeApi';
import { bookDetailStyles } from '@components/BookDetailPage/BookDetail.styles';
interface BookIntroduceTabProps {
  itemId: number;
  description: string;
}

const BookIntroduceTab: React.FC<BookIntroduceTabProps> = ({
  itemId,
  description,
}) => {
  const { data } = useGetGenderAgeQuery(itemId);
  return (
    <>
      {/* 성별·연령별 인기 분포 */}
      <Box sx={bookDetailStyles.bookIntroduceTabBox}>
        <GenderAgeChart data={data ?? []} />
        <GenderAgeSummary data={data ?? []} />
      </Box>
      {/* 책 소개 */}
      <Box sx={bookDetailStyles.bookIntroduceBox}>
        <Typography
          sx={bookDetailStyles.bookIntroduceText}
          variant="h6"
          fontWeight="bold"
        >
          책 소개
        </Typography>
        <Typography
          sx={bookDetailStyles.bookIntroduceText}
          variant="body1"
          color="text.secondary"
        >
          {description || '책 소개가 없습니다.'}
        </Typography>
      </Box>
    </>
  );
};

export default BookIntroduceTab;
