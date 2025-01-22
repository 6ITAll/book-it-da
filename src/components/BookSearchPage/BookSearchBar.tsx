import { TextField, InputAdornment, Box } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { bookSearchBarStyles } from '@components/BookSearchPage/BookSearch.style';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setSearchQuery } from '@features/BookSearchPage/Slice/bookSearchSlice';

const BookSearchBar = React.memo((): JSX.Element => {
  const [inputValue, setInputValue] = useState('');
  const dispatch = useDispatch();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleSearch = () => {
    const trimmedQuery = inputValue.trim();
    if (trimmedQuery) {
      dispatch(setSearchQuery(trimmedQuery));
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault(); // 중복 호출 방지
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
        slotProps={{
          input: {
            startAdornment: (
              <InputAdornment
                position="start"
                sx={{ cursor: 'pointer' }}
                onClick={handleSearch}
              >
                <SearchIcon />
              </InputAdornment>
            ),
          },
        }}
        sx={bookSearchBarStyles.textfield}
      />
    </Box>
  );
});

export default BookSearchBar;
