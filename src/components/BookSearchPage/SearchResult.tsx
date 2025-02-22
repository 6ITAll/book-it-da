import React, { useState } from 'react';
import { Box, Typography, SelectChangeEvent, Stack } from '@mui/material';
import SortSelector from '@components/BookSearchPage/SortSelector';
import Pagination from '@components/BookSearchPage/Pagination';
import SearchBookCard from '@components/BookSearchPage/SearchBookCard';
import {
  setSortOption,
  setCurrentPage,
} from '@features/BookSearchPage/Slice/bookSearchSlice';
import { useSearchBooksQuery } from '@features/BookSearchPage/api/bookSearchApi';
import { RootState } from '@store/index';
import { useDispatch, useSelector } from 'react-redux';
import { searchResultStyles } from '@components/BookSearchPage/BookSearch.style';
import { renderSearchResultSkeleton } from './BookSearchSkeleton';
import { SortOption } from '@features/BookSearchPage/Slice/bookSearchSlice';
import ViewOptionSelector from './ViewOptionSelector';

const sortOptions: Array<{ value: SortOption; label: string }> = [
  { value: 'SortAccuracy' as SortOption, label: '관련도순' },
  { value: 'CustomerRating' as SortOption, label: '평점순' },
  { value: 'SalesPoint' as SortOption, label: '판매량순' },
  { value: 'PublishTime' as SortOption, label: '출간일순' },
];

const SearchResult = (): JSX.Element => {
  const dispatch = useDispatch();
  const { searchQuery, currentPage, sortOption } = useSelector(
    (state: RootState) => state.bookSearch,
  );

  // viewMode가 한 페이지당 보여줄 결과 수 (4 또는 8)
  const [viewMode, setViewMode] = useState<4 | 8>(8);
  const handleViewChange = (mode: 4 | 8) => {
    setViewMode(mode);
  };

  // 최대 50개의 결과를 받아옴
  const { data, isFetching } = useSearchBooksQuery({
    query: searchQuery,
    sort: sortOption,
  });
  const books = data?.allBooks ?? [];

  // 클라이언트 사이드 페이지네이션: 현재 페이지에 해당하는 아이템 슬라이스
  const startIndex = (currentPage - 1) * viewMode;
  const paginatedBooks = books.slice(startIndex, startIndex + viewMode);

  const handleSortChange = (event: SelectChangeEvent<string>) => {
    dispatch(setSortOption(event.target.value as SortOption));
  };

  const handlePageChange = (newPage: number) => {
    dispatch(setCurrentPage(newPage));
  };

  return (
    <>
      <Box sx={searchResultStyles.searchResultBox}>
        {/* 검색어와 결과 건수를 한 줄에 표시 */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            flexShrink: 1,
            maxWidth: '100%',
            overflow: 'hidden',
          }}
        >
          {searchQuery && (
            <>
              <Typography
                variant="h3"
                fontWeight="bold"
                sx={{
                  color: 'primary.main',
                  flexShrink: 1,
                  display: { xs: 'none', sm: 'block' },
                }}
              >
                '
              </Typography>
              <Typography
                variant="h3"
                fontWeight="bold"
                sx={{
                  color: 'primary.main',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  flexShrink: 1,
                  display: { xs: 'none', sm: 'block' },
                }}
              >
                {searchQuery}
              </Typography>
              <Typography
                variant="h3"
                fontWeight="bold"
                sx={{
                  color: 'primary.main',
                  flexShrink: 1,
                  display: { xs: 'none', sm: 'block' },
                }}
              >
                '
              </Typography>
            </>
          )}
          <Typography
            variant="h3"
            fontWeight="bold"
            sx={{ marginLeft: 1, whiteSpace: 'nowrap' }}
          >
            검색 결과
          </Typography>
          <Typography
            variant="h3"
            fontWeight="bold"
            sx={searchResultStyles.totalSearchText}
          >
            {books.length || 0}
          </Typography>
          <Typography variant="h3" fontWeight="bold" sx={{ flexShrink: 1 }}>
            건
          </Typography>
        </Box>
        <Stack direction="row" spacing={2}>
          <ViewOptionSelector viewMode={viewMode} onChange={handleViewChange} />
          <SortSelector
            value={sortOption}
            onChange={handleSortChange}
            options={sortOptions}
          />
        </Stack>
      </Box>

      {isFetching ? (
        renderSearchResultSkeleton(viewMode)
      ) : (
        <Box sx={searchResultStyles.searchResultListBox}>
          {paginatedBooks.length > 0 ? (
            paginatedBooks.map((book) => (
              <SearchBookCard
                key={book.isbn}
                isbn={book.isbn}
                title={book.title}
                author={book.author}
                cover={book.cover}
                customerReviewRank={book.customerReviewRank}
                priceStandard={book.priceStandard}
              />
            ))
          ) : (
            <Typography height="250px">검색 결과가 없습니다.</Typography>
          )}
        </Box>
      )}

      <Box sx={searchResultStyles.paginationBox}>
        <Pagination
          count={Math.ceil(books.length / viewMode)}
          page={currentPage}
          onChange={(_, newPage) => handlePageChange(newPage)}
        />
      </Box>
    </>
  );
};

export default React.memo(SearchResult);
