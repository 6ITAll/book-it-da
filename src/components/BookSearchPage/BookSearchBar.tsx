import { TextField, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

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
    <TextField
      variant="outlined"
      placeholder="도서명, 저자를 검색하세요"
      fullWidth
      value={value}
      onChange={onChange}
      onKeyDown={handleKeyDown}
      InputProps={{
        startAdornment: (
          <InputAdornment
            sx={{ cursor: 'pointer' }}
            onClick={onSearch}
            position="start"
          >
            <SearchIcon />
          </InputAdornment>
        ),
      }}
      sx={{
        width: '100%',
        backgroundColor: '#fff',
      }}
    />
  );
};

export default BookSearchBar;
