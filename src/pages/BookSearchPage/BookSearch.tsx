/** @jsxImportSource @emotion/react */
import { Container, Box, Typography, Stack } from '@mui/material';
import BookCard from '@/components/BookSearchPage/BookCard';
import Pagination from '@/components/BookSearchPage/Pagination';
import BookSearchBar from '@/components/BookSearchPage/BookSearchBar';
import BestBookCarousel from '@/components/BookSearchPage/BestBookCarousel';
import { css } from '@emotion/react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store/index';
import { useSearchBooksQuery } from '@/features/BookSearchPage/api/bookSearchApi';
import {
  setSearchQuery,
  setCurrentPage,
  setSortOption,
} from '@/features/BookSearchPage/Slice/bookSearchSlice';
import { useState } from 'react';
import { SelectChangeEvent } from '@mui/material';
import TagList from '@/components/BookSearchPage/TagList';
import SortSelector from '@/components/BookSearchPage/SortSelector';

/** 태그 데이터 */
const tags = ['#베스트셀러', '#신간', '#소설', '#자기계발'];

const BookSearchPage = (): JSX.Element => {
  const dispatch = useDispatch();

  // 상태 관리
  const [inputValue, setInputValue] = useState('');
  const { searchQuery, currentPage, sortOption } = useSelector(
    (state: RootState) => state.bookSearch,
  );

  // 핸들러 함수
  const handleSortChange = (event: SelectChangeEvent) => {
    dispatch(setSortOption(event.target.value));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleSearch = () => {
    if (inputValue.trim()) {
      dispatch(setSearchQuery(inputValue.trim()));
    }
  };

  const handlePageChange = (value: number) => {
    dispatch(setCurrentPage(value)); // 페이지 변경 처리
  };

  // API 호출
  const { data, isLoading, error } = useSearchBooksQuery({
    query: searchQuery,
    page: currentPage,
    sort: sortOption,
  });

  const sortOptions = [
    { value: 'SortAccuracy', label: '관련도순' },
    { value: 'CustomerRating', label: '평점순' },
    { value: 'SalesPoint', label: '판매량순' },
    { value: 'PublishTime', label: '출간일순' },
  ];

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
        <TagList tags={tags} />
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
        <Stack
          direction="row"
          flexWrap="wrap"
          justifyContent="space-between"
          spacing={2}
        >
          {data?.item?.map((book) => (
            <Box key={book.itemId}>
              <BookCard
                title={book.title}
                author={book.author}
                cover={book.cover}
                customerReviewRank={book.customerReviewRank}
                priceStandard={book.priceStandard}
                link={book.link}
              />
            </Box>
          )) || <Typography>검색 결과가 없습니다.</Typography>}
        </Stack>

        {/* 페이지네이션 */}
        <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 4 }}>
          <Pagination
            count={Math.ceil((data?.totalResults || 0) / 10)} // 총 페이지 수 계산
            page={currentPage}
            onChange={(_, value) => handlePageChange(value)}
          />
        </Box>
      </Box>
    </Container>
  );
};

export default BookSearchPage;
