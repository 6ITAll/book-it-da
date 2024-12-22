import {
  Autocomplete,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CloseIcon from '@mui/icons-material/Close';
import React, { useEffect, useState } from 'react';
import { PostType } from './WriteDialog';
import { useSearchBooksQuery } from '@features/BookSearchPage/api/bookSearchApi';

interface OneLineReviewDialogProps {
  handleBack: () => void;
  selectedType: PostType;
  setSelectedType: React.Dispatch<React.SetStateAction<PostType>>;
}

const OneLineReviewDialog = ({
  selectedType,
  setSelectedType,
  handleBack,
}: OneLineReviewDialogProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBook, setSelectedBook] = useState<null | {
    title: string;
    itemId: number;
    author: string;
    cover: string;
  }>(null);

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
  // 다이얼로그 닫히면 책 검색 결과 초기화
  useEffect(() => {
    if (selectedType !== 'review') {
      setSelectedBook(null);
      setSearchQuery('');
    }
  }, [selectedType]);

  return (
    <Dialog
      fullWidth
      maxWidth="xs"
      open={selectedType === 'review'}
      onClose={() => setSelectedType(null)}
      sx={{
        '& .MuiDialog-paper': {
          borderRadius: '10px',
        },
      }}
    >
      <DialogTitle>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Stack direction="row" alignItems="center" spacing={1}>
            <IconButton onClick={handleBack}>
              <ArrowBackIcon />
            </IconButton>
            <Typography>한줄평 작성</Typography>
          </Stack>
          <IconButton onClick={() => setSelectedType(null)}>
            <CloseIcon />
          </IconButton>
        </Stack>
      </DialogTitle>
      <DialogContent
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: '30px',
          '&.MuiDialogContent-root': {
            padding: '30px 20px',
          },
        }}
      >
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

        {selectedBook && (
          <Box sx={{ mb: 2 }}>
            <Stack direction="row" spacing={2} alignItems="center">
              <img
                src={selectedBook.cover}
                alt={selectedBook.title}
                style={{ width: 60, height: 90 }}
              />
              <Stack>
                <Typography>{selectedBook.title}</Typography>
                <Typography variant="body2">{selectedBook.author}</Typography>
                <Typography>{selectedBook.itemId}</Typography>
              </Stack>
            </Stack>
          </Box>
        )}

        <TextField
          fullWidth
          multiline
          label="한줄평"
          variant="outlined"
          placeholder="한줄평을 입력하세요"
          minRows={12}
          sx={{
            '& .MuiOutlinedInput-root': {
              borderRadius: '8px',
              height: '200px',
              '& textarea': {
                height: '100% !important',
              },
            },
          }}
        />
      </DialogContent>
      <DialogActions
        sx={{
          justifyContent: 'center',
          padding: '0',
        }}
      >
        <Button
          variant="contained"
          sx={{
            margin: '0',
            width: '100%',
            padding: '10px',
            borderRadius: '0px 0px 10px 10px',
          }}
        >
          한줄평 작성
        </Button>{' '}
      </DialogActions>
    </Dialog>
  );
};

export default OneLineReviewDialog;
