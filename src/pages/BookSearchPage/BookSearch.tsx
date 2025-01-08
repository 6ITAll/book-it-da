import { Container } from '@mui/material';
import BookSearchBar from '@components/BookSearchPage/BookSearchBar';
import { bookSearchStyles } from '@components/BookSearchPage/BookSearch.style';
import BestSellerSection from '@components/BookSearchPage/BestSellerSection';
import SearchResult from '@components/BookSearchPage/SearchResult';
import useSearchInput from '@components/BookSearchPage/useSearchInput';
const BookSearchPage = (): JSX.Element => {
  const { inputValue, searchParams, handleInputChange, handleSearch } =
    useSearchInput();

  return (
    <Container maxWidth="lg" sx={bookSearchStyles.bookSearchContainer}>
      {/* 검색 바 섹션 */}
      <BookSearchBar
        value={inputValue}
        onChange={handleInputChange}
        onSearch={handleSearch}
      />
      <BestSellerSection />
      <SearchResult searchParams={searchParams} />
    </Container>
  );
};

export default BookSearchPage;
