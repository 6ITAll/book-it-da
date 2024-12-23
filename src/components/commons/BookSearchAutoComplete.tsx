import { Autocomplete, Box, Stack, TextField, Typography } from '@mui/material';
import { useSearchBooksQuery } from '@features/BookSearchPage/api/bookSearchApi';

interface BookSearchAutoCompleteProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedBook: {
    title: string;
    itemId: number;
    author: string;
    cover: string;
  } | null;
  setSelectedBook: (
    book: {
      title: string;
      itemId: number;
      author: string;
      cover: string;
    } | null,
  ) => void;
}

const BookSearchAutoComplete = ({
  searchQuery,
  setSearchQuery,
  setSelectedBook,
}: BookSearchAutoCompleteProps) => {
  const { data: searchResults } = useSearchBooksQuery(
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
        options={searchResults?.item || []}
        getOptionLabel={(option) => option.title}
        onChange={(_, newValue) => {
          setSelectedBook(newValue);
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
