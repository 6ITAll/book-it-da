import { Container } from '@mui/material';
import BookSearchBar from '@components/BookSearchPage/BookSearchBar';
import BestSellerSection from '@components/BookSearchPage/BestSellerSection';
import SearchResult from '@components/BookSearchPage/SearchResult';
import React from 'react';
import { bookSearchStyles } from '@components/BookSearchPage/BookSearch.style';

const BookSearchPage = React.memo((): JSX.Element => {
  return (
    <Container maxWidth="lg" sx={bookSearchStyles.bookSearchContainer}>
      <BookSearchBar />
      <BestSellerSection />
      <SearchResult />
    </Container>
  );
});

export default BookSearchPage;
