import { TextField, InputAdornment, Box } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { bookSearchBarStyles } from '@components/BookSearchPage/BookSearch.style';
import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setSearchQuery } from '@features/BookSearchPage/Slice/bookSearchSlice';
import { useSearchParams } from 'react-router-dom';

const BookSearchBar = React.memo((): JSX.Element => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [inputValue, setInputValue] = useState(searchParams.get('query') || ''); // 초기값을 URL에서 가져오기
  const dispatch = useDispatch();
  useEffect(() => {
    if (searchParams.get('query')) {
      dispatch(setSearchQuery(searchParams.get('query') || '')); // URL 변경 시 Redux 업데이트
    }
  }, [searchParams, dispatch]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleSearch = () => {
    const trimmedQuery = inputValue.trim();
    if (trimmedQuery) {
      setSearchParams({ query: trimmedQuery }); // ✅ URL에 검색어 반영
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
