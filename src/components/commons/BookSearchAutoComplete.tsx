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
import { useEffect, useState } from 'react';
import { BookResponse } from '@features/BookSearchPage/types/types';

interface BookSearchAutoCompleteProps {
  selectedBook: Book | null;
  setSelectedBook: (book: Book | null) => void;
}

const BookSearchAutoComplete = ({
  setSelectedBook,
}: BookSearchAutoCompleteProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1);
  const [allItems, setAllItems] = useState<BookResponse['item']>([]);

  const { data: searchResults, isLoading } = useSearchBooksQuery(
    {
      query: searchQuery,
      page,
      sort: 'Accuracy',
    },
    {
      skip: !searchQuery,
    },
  );

  useEffect(() => {
    setPage(1);
    setAllItems([]);
  }, [searchQuery]);

  useEffect(() => {
    if (searchResults?.item) {
      if (page === 1) {
        setAllItems(searchResults.item);
        setPage(2);
      } else {
        setAllItems((prev) => [...prev, ...searchResults.item]);
      }
    }
    // 의존성 배열 경고 메시지 무시
    // eslint-disable-next-line
  }, [searchResults]);

  return (
    <Autocomplete
      fullWidth
      size="small"
      loading={isLoading}
      loadingText="Loading..."
      noOptionsText="검색 결과가 없습니다"
      options={allItems}
      getOptionLabel={(option) => option.title}
      getOptionKey={(option) => `${option.isbn}-${option.title}`}
      onChange={(_, newValue) => {
        if (newValue) {
          const selectedBook: Book = {
            title: newValue.title,
            author: newValue.author,
            imageUrl: newValue.cover,
            isbn: newValue.isbn,
          };
          setSelectedBook(selectedBook);
        } else {
          setSelectedBook(null);
        }
      }}
      slotProps={{
        listbox: {
          onScroll: (event: React.UIEvent<HTMLUListElement>) => {
            const listboxNode = event.currentTarget;
            if (
              listboxNode.scrollTop + listboxNode.clientHeight >=
                listboxNode.scrollHeight - 20 &&
              searchResults?.item.length === 4 &&
              !isLoading
            ) {
              setPage((prev) => prev + 1);
            }
          },
          sx: {
            maxHeight: '300px',
          },
        },
      }}
      renderOption={(props, option) => {
        const { key, ...otherProps } = props;
        return (
          <Box
            component="li"
            key={key}
            {...otherProps}
            sx={{
              padding: '5px 10px !important',
              borderBottom: '1px solid #ccc',
            }}
          >
            <Stack
              direction="row"
              spacing={2}
              alignItems="center"
              sx={{ width: '100%', height: '100%' }}
            >
              <img
                src={option.cover}
                alt={option.title}
                style={{ width: 40, height: 60 }}
              />
              <Stack>
                <Typography
                  variant="body1"
                  sx={{
                    fontSize: '14px',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    maxWidth: {
                      xs: '150px',
                      md: '200px',
                    },
                  }}
                >
                  {option.title}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{
                    fontSize: '11px',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    maxWidth: {
                      xs: '150px',
                      md: '200px',
                    },
                  }}
                >
                  {option.author}
                </Typography>
              </Stack>
            </Stack>
          </Box>
        );
      }}
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
  );
};

export default BookSearchAutoComplete;
