import {
  Autocomplete,
  Box,
  CircularProgress,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { useSearchBooksQuery } from '@features/BookSearchPage/api/bookSearchApi';
import { Book } from '@shared/types/type';

interface BookSearchAutoCompleteProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedBook: Book | null;
  setSelectedBook: (book: Book | null) => void;
}

const BookSearchAutoComplete = ({
  searchQuery,
  setSearchQuery,
  setSelectedBook,
}: BookSearchAutoCompleteProps) => {
  const { data: searchResults, isLoading } = useSearchBooksQuery(
    {
      query: searchQuery,
      page: 1,
      sort: 'Accuracy',
    },
    {
      skip: !searchQuery,
    },
  );

  return (
    <>
      <Autocomplete
        fullWidth
        loading={isLoading}
        loadingText="Loading..."
        noOptionsText="검색 결과가 없습니다"
        options={searchResults?.item || []}
        getOptionLabel={(option) => option.title}
        onChange={(_, newValue) => {
          if (newValue) {
            const selectedBook: Book = {
              bookTitle: newValue.title,
              author: newValue.author,
              imageUrl: newValue.cover,
              itemId: newValue.itemId,
            };
            setSelectedBook(selectedBook);
          } else {
            setSelectedBook(null);
          }
        }}
        renderOption={(props, option) => (
          <Box component="li" {...props}>
            <Stack direction="row" spacing={2} alignItems="center">
              <img
                src={option.cover}
                alt={option.title}
                style={{ width: 40, height: 60 }}
              />
              <Stack>
                <Typography variant="body1">{option.title}</Typography>
                <Typography variant="body2" color="text.secondary">
                  {option.author}
                </Typography>
              </Stack>
            </Stack>
          </Box>
        )}
        renderInput={(params) => (
          <TextField
            {...params}
            label="책 검색"
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="책 제목을 입력하세요"
            slotProps={{
              input: {
                ...params.InputProps,
                endAdornment: (
                  <>
                    {isLoading ? (
                      <CircularProgress color="inherit" size={20} />
                    ) : null}
                    {params.InputProps.endAdornment}
                  </>
                ),
              },
            }}
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: '8px',
              },
            }}
          />
        )}
      />
    </>
  );
};

export default BookSearchAutoComplete;
