import { Box, Typography } from '@mui/material';
import SortSelector from '@components/BookSearchPage/SortSelector';
import Pagination from '@components/BookSearchPage/Pagination';
import SearchBookCard from '@components/BookSearchPage/SearchBookCard';
import { SortOption } from '@features/BookSearchPage/Slice/bookSearchSlice';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@store/index';
import { SelectChangeEvent } from '@mui/material';
import {
  setSortOption,
  setCurrentPage,
} from '@features/BookSearchPage/Slice/bookSearchSlice';
import { useSearchBooksQuery } from '@features/BookSearchPage/api/bookSearchApi';
import { searchResultStyles } from '@components/BookSearchPage/BookSearch.style';
import React from 'react';
import { renderSearchResultSkeleton } from './BookSearchSkeleton';
// 정렬 옵션 배열 정의
const sortOptions: Array<{ value: SortOption; label: string }> = [
  { value: 'SortAccuracy', label: '관련도순' },
  { value: 'CustomerRating', label: '평점순' },
  { value: 'SalesPoint', label: '판매량순' },
  { value: 'PublishTime', label: '출간일순' },
];

const SearchResult = (): JSX.Element => {
  const dispatch = useDispatch();
  const { searchQuery, currentPage, sortOption } = useSelector(
    (state: RootState) => state.bookSearch,
  );

  // API 호출
  const { data, isFetching } = useSearchBooksQuery(
    {
      query: searchQuery,
      page: currentPage,
      sort: sortOption,
    },
    { refetchOnMountOrArgChange: true },
  );
  // 정렬 옵션 변경 함수
  const handleSortChange = (event: SelectChangeEvent) => {
    dispatch(setSortOption(event.target.value as SortOption));
  };

  // 페이지네이션 처리
  const handlePageChange = (newPage: number) => {
    dispatch(setCurrentPage(newPage));
  };

  return (
    <>
      <Box sx={searchResultStyles.searchResultBox}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Typography variant="h3" fontWeight="bold">
            검색 결과
          </Typography>
          <Typography
            variant="h3"
            fontWeight="bold"
            sx={searchResultStyles.totalSearchText}
          >
            {data?.totalResults || 0}
          </Typography>
          <Typography variant="h3" fontWeight="bold">
            건
          </Typography>
        </Box>
        <SortSelector
          value={sortOption}
          onChange={handleSortChange}
          options={sortOptions}
        />
      </Box>
      {/* 검색 결과 리스트 */}
      {isFetching ? (
        renderSearchResultSkeleton(8)
      ) : (
        <Box sx={searchResultStyles.searchResultListBox}>
          {data?.item?.map((book) => (
            <SearchBookCard
              key={book.itemId}
              itemId={book.itemId}
              title={book.title}
              author={book.author}
              cover={book.cover}
              customerReviewRank={book.customerReviewRank}
              priceStandard={book.priceStandard}
            />
          )) || <Typography height="250px">검색 결과가 없습니다.</Typography>}
        </Box>
      )}
      {/* 페이지네이션 */}
      <Box sx={searchResultStyles.paginationBox}>
        <Pagination
          count={Math.ceil((data?.totalResults || 0) / 4)}
          page={currentPage}
          onChange={(_, newPage) => handlePageChange(newPage)}
        />
      </Box>
    </>
  );
};

export default React.memo(SearchResult);
