import React from 'react';
import { Box, Typography, Skeleton } from '@mui/material';
import GenderAgeChart from '@components/BookDetailPage/GenderAgeChart';
import GenderAgeSummary from '@components/BookDetailPage/GenderAgeSummary';
import { useGetGenderAgeQuery } from '@features/BookDetailPage/api/genderAgeApi';
import { bookDetailStyles } from '@components/BookDetailPage/BookDetail.styles';
interface BookIntroduceTabProps {
  isbn: string;
  description: string;
  isLoading: boolean;
}

const BookIntroduceTab: React.FC<BookIntroduceTabProps> = ({
  isbn,
  description,
  isLoading,
}) => {
  const { data } = useGetGenderAgeQuery(isbn);

  return (
    <>
      {/* 성별·연령 인기 분포 섹션 */}
      <Box sx={bookDetailStyles.bookIntroduceTabBox}>
        {isLoading ? (
          <>
            <Skeleton
              variant="rectangular"
              height="300px"
              sx={{ borderRadius: '8px', marginBottom: '1rem', flex: 2 }}
            />

            <Skeleton
              variant="text"
              height="300px"
              sx={{ display: 'flex', flex: 1 }}
            />
          </>
        ) : (
          <>
            <GenderAgeChart data={data ?? []} />
            <GenderAgeSummary data={data ?? []} />
          </>
        )}
      </Box>

      {/* 책 소개 섹션 */}
      <Box sx={bookDetailStyles.bookIntroduceBox}>
        <Typography
          sx={bookDetailStyles.bookIntroduceText}
          variant="h6"
          fontWeight="bold"
        >
          책 소개
        </Typography>
        {isLoading ? (
          <Skeleton variant="text" width="90%" height="100px" />
        ) : (
          <Typography
            sx={bookDetailStyles.bookIntroduceText}
            variant="body1"
            color="text.secondary"
          >
            {description || '책 소개가 없습니다.'}
          </Typography>
        )}
      </Box>
    </>
  );
};

export default BookIntroduceTab;
