import { TextField, InputAdornment, Box } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { bookSearchBarStyles } from '@components/BookSearchPage/BookSearch.style';

interface BookSearchBarProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSearch: () => void;
}

const BookSearchBar = ({
  value,
  onChange,
  onSearch,
}: BookSearchBarProps): JSX.Element => {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onSearch();
    }
  };

  return (
    <Box sx={bookSearchBarStyles.bookSearchBarBox}>
      <TextField
        variant="outlined"
        placeholder="도서명, 저자를 검색하세요"
        fullWidth
        value={value}
        onChange={onChange}
        onKeyDown={handleKeyDown}
        slotProps={{
          input: {
            startAdornment: (
              <InputAdornment
                sx={{ cursor: 'pointer' }}
                onClick={onSearch}
                position="start"
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
};

export default BookSearchBar;
