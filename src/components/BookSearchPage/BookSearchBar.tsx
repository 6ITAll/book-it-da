import { TextField, InputAdornment, Box } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { bookSearchBarStyles } from '@components/BookSearchPage/BookSearch.style';
import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';

const BookSearchBar = React.memo((): JSX.Element => {
  const [inputValue, setInputValue] = useState('');
  const [, setSearchParams] = useSearchParams();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleSearch = () => {
    const trimmedQuery = inputValue.trim();
    if (trimmedQuery) {
      setSearchParams({ query: trimmedQuery }); // URL 업데이트
    } else {
      setSearchParams({});
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <Box sx={bookSearchBarStyles.bookSearchBarBox}>
      <TextField
        variant="outlined"
        placeholder="도서명, 저자를 검색하세요"
        fullWidth
        value={inputValue}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        InputProps={{
          startAdornment: (
            <InputAdornment
              position="start"
              sx={{ cursor: 'pointer' }}
              onClick={handleSearch}
            >
              <SearchIcon />
            </InputAdornment>
          ),
        }}
        sx={bookSearchBarStyles.textfield}
      />
    </Box>
  );
});

export default BookSearchBar;
