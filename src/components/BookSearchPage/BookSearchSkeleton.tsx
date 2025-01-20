import { Box, Skeleton } from '@mui/material';
import { bestBookStyles } from '@components/BookSearchPage/BookSearch.style';
import { searchResultStyles } from '@components/BookSearchPage/BookSearch.style';

// 베스트 셀러 Skeleton 렌더링 함수
export const renderBestBookSkeletons = (count: number): JSX.Element => (
  <Box sx={bestBookStyles.bestBookSkeletonBox}>
    {Array.from({ length: count }).map((_, index) => (
      <Skeleton
        key={index}
        variant="rectangular"
        sx={bestBookStyles.bestBookSkeltonCard}
      />
    ))}
  </Box>
);

// 개별 카드 스타일
const skeletonCardStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  boxShadow: 2,
  padding: '1rem',
  borderRadius: 2,
  overflow: 'hidden',
};

// 검색 결과 스켈레톤 렌더링 함수
export const renderSearchResultSkeleton = (count: number): JSX.Element => (
  <Box sx={searchResultStyles.searchResultListBox}>
    {Array.from({ length: count }).map((_, index) => (
      <Box key={index} sx={skeletonCardStyle}>
        {/* 이미지 스켈레톤 */}
        <Skeleton
          variant="rectangular"
          width="100%"
          height="200px"
          sx={{ marginBottom: '1rem', borderRadius: 1 }}
        />
        {/* 제목 스켈레톤 */}
        <Skeleton
          variant="text"
          width="80%"
          height="24px"
          sx={{ marginBottom: '0.5rem' }}
        />
        {/* 저자/가격 스켈레톤 */}
        <Skeleton variant="text" width="60%" height="20px" />
      </Box>
    ))}
  </Box>
);
