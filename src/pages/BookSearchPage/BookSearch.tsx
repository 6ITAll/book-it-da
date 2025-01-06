/** @jsxImportSource @emotion/react */
import { Container, Box, Typography } from '@mui/material';
import SearchBookCard from '@components/BookSearchPage/SearchBookCard';
import Pagination from '@components/BookSearchPage/Pagination';
import BookSearchBar from '@components/BookSearchPage/BookSearchBar';
import BestBookCarousel from '@components/BookSearchPage/BestBookCarousel';
import { css } from '@emotion/react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@store/index';
import { useSearchBooksQuery } from '@features/BookSearchPage/api/bookSearchApi';
import {
  setSearchQuery,
  setCurrentPage,
  setSortOption,
} from '@features/BookSearchPage/Slice/bookSearchSlice';
import { useState } from 'react';
import { SelectChangeEvent } from '@mui/material';
import SortSelector from '@components/BookSearchPage/SortSelector';
import { SortOption } from '@features/BookSearchPage/Slice/bookSearchSlice';
import { useEffect } from 'react';

// 정렬 옵션 배열 정의
const sortOptions: Array<{ value: SortOption; label: string }> = [
  { value: 'SortAccuracy', label: '관련도순' },
  { value: 'CustomerRating', label: '평점순' },
  { value: 'SalesPoint', label: '판매량순' },
  { value: 'PublishTime', label: '출간일순' },
];

const BookSearchPage = (): JSX.Element => {
  const dispatch = useDispatch();
  const [inputValue, setInputValue] = useState('');
  const { searchQuery, currentPage, sortOption } = useSelector(
    (state: RootState) => state.bookSearch,
  );

  // URL 쿼리 파라미터에서 검색어 추출하고, 검색 결과가 바로 나오도록 함
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const query = params.get('query');
    if (query) {
      dispatch(setSearchQuery(query)); // Redux 상태에 저장
    }
  }, [dispatch]);

  // 정렬 옵션 변경 함수
  const handleSortChange = (event: SelectChangeEvent) => {
    dispatch(setSortOption(event.target.value as SortOption));
  };

  // 검색어 변경 함수
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleSearch = () => {
    if (inputValue.trim()) {
      dispatch(setSearchQuery(inputValue.trim()));
    }
  };

  // 페이지네이션 처리 함수
  const handlePageChange = (value: number) => {
    dispatch(setCurrentPage(value));
  };

  // API 호출
  const { data, isLoading, error } = useSearchBooksQuery({
    query: searchQuery,
    page: currentPage,
    sort: sortOption,
  });

  // 로딩 및 에러 처리
  if (isLoading) return <Typography>로딩 중...</Typography>;
  if (error) return <Typography>에러 발생: {JSON.stringify(error)}</Typography>;

  return (
    <Container
      maxWidth="md"
      css={css`
        display: flex;
        flex-direction: column;
        width: 100%;
      `}
    >
      {/* 검색 바 섹션 */}
      <Box sx={{ marginBottom: 5 }}>
        <BookSearchBar
          value={inputValue}
          onChange={handleInputChange}
          onSearch={handleSearch}
        />
      </Box>

      {/* 베스트셀러 섹션 */}
      <Box sx={{ marginBottom: 5 }}>
        <Typography variant="h5" fontWeight="bold" gutterBottom>
          베스트셀러
        </Typography>
        <BestBookCarousel />
      </Box>

      {/* 검색 결과 섹션 */}
      <Box>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginY: 3,
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography variant="h5" fontWeight="bold">
              검색 결과
            </Typography>
            <Typography
              variant="h5"
              fontWeight="bold"
              sx={{ color: '#2196f3', mx: 0.5 }}
            >
              {data?.totalResults || 0}
            </Typography>
            <Typography variant="h5" fontWeight="bold">
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
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)', // 4열로 정렬
            gap: 2, // 카드 간격
          }}
        >
          {data?.item?.map((book) => (
            <SearchBookCard
              key={book.itemId} // 고유 key 추가
              itemId={book.itemId}
              title={book.title}
              author={book.author}
              cover={book.cover}
              customerReviewRank={book.customerReviewRank}
              priceStandard={book.priceStandard}
              onClick={() => {
                console.log('상세페이지 이동');
              }}
            />
          )) || <Typography>검색 결과가 없습니다.</Typography>}
        </Box>
        {/* 페이지네이션 */}
        <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 4 }}>
          <Pagination
            count={Math.ceil((data?.totalResults || 0) / 4)}
            page={currentPage}
            onChange={(_, value) => handlePageChange(value)}
          />
        </Box>
      </Box>
    </Container>
  );
};

export default BookSearchPage;
