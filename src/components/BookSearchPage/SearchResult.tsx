import { Box, Typography } from '@mui/material';
import SortSelector from '@components/BookSearchPage/SortSelector';
import Pagination from '@components/BookSearchPage/Pagination';
import SearchBookCard from '@components/BookSearchPage/SearchBookCard';
import { SortOption } from '@features/BookSearchPage/Slice/bookSearchSlice';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@store/index';
import { SelectChangeEvent } from '@mui/material';
import { useEffect } from 'react';
import {
  setSearchQuery,
  setCurrentPage,
  setSortOption,
} from '@features/BookSearchPage/Slice/bookSearchSlice';
import { useSearchBooksQuery } from '@features/BookSearchPage/api/bookSearchApi';
import useSearchInput from '@components/BookSearchPage/useSearchInput';
import { searchResultStyles } from '@components/BookSearchPage/BookSearch.style';
import { renderSearchResultSkeleton } from '@components/BookSearchPage/BookSearchSkeleton';
// 정렬 옵션 배열 정의
const sortOptions: Array<{ value: SortOption; label: string }> = [
  { value: 'SortAccuracy', label: '관련도순' },
  { value: 'CustomerRating', label: '평점순' },
  { value: 'SalesPoint', label: '판매량순' },
  { value: 'PublishTime', label: '출간일순' },
];

interface SearchResultProps {
  searchParams: URLSearchParams;
}

const SearchResult = ({ searchParams }: SearchResultProps): JSX.Element => {
  const dispatch = useDispatch();
  const { setInputValue } = useSearchInput();
  const { searchQuery, currentPage, sortOption } = useSelector(
    (state: RootState) => state.bookSearch,
  );

  useEffect(() => {
    const query = searchParams.get('query') || '';
    const page = parseInt(searchParams.get('page') || '1', 10);
    dispatch(setSearchQuery(query));
    dispatch(setCurrentPage(page));
  }, [searchParams, dispatch, setInputValue]);

  // 정렬 옵션 변경 함수
  const handleSortChange = (event: SelectChangeEvent) => {
    dispatch(setSortOption(event.target.value as SortOption));
  };

  // 페이지네이션 처리 함수
  const handlePageChange = (value: number) => {
    dispatch(setCurrentPage(value));
  };

  // 검색 API 호출
  const { data, isFetching } = useSearchBooksQuery(
    {
      query: searchQuery,
      page: currentPage,
      sort: sortOption,
    },
    { refetchOnMountOrArgChange: true },
  );

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
          onChange={(_, value) => handlePageChange(value)}
        />
      </Box>
    </>
  );
};

export default SearchResult;
