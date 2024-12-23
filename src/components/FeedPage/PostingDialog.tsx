import {
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
import TextEditor from '@components/commons/TextEditor';
import BookSearchAutoComplete from '@components/commons/BookSearchAutoComplete';
import { Book } from '@shared/types/type';

interface PostingDialogProps {
  handleBack: () => void;
  selectedType: PostType;
  setSelectedType: React.Dispatch<React.SetStateAction<PostType>>;
}

const PostingDialog = ({
  selectedType,
  setSelectedType,
  handleBack,
}: PostingDialogProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');

  // 다이얼로그 닫히면 책 검색 결과 초기화
  useEffect(() => {
    if (selectedType !== 'review') {
      setSelectedBook(null);
      setSearchQuery('');
    }
  }, [selectedType]);
  return (
    <Dialog
      fullScreen
      open={selectedType === 'post'}
      onClose={() => setSelectedType(null)}
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
            <Typography>포스트 작성</Typography>
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
        {/* 책 검색 */}
        <BookSearchAutoComplete
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          selectedBook={selectedBook}
          setSelectedBook={setSelectedBook}
        />
        {/* 선택한 책 정보 추후 고유 id 뺼 예정 */}
        {selectedBook && (
          <Box sx={{ mb: 2 }}>
            <Stack direction="row" spacing={2} alignItems="center">
              <img
                src={selectedBook.imageUrl}
                alt={selectedBook.bookTitle}
                style={{ width: 60, height: 90 }}
              />
              <Stack>
                <Typography>{selectedBook.bookTitle}</Typography>
                <Typography variant="body2">{selectedBook.author}</Typography>
                <Typography>{selectedBook.itemId}</Typography>
              </Stack>
            </Stack>
          </Box>
        )}
        {/* 포스팅 제목 입력창 */}
        <TextField
          fullWidth
          multiline
          label="제목"
          variant="outlined"
          placeholder="제목을 입력하세요"
          minRows={1}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          sx={{
            '& .MuiOutlinedInput-root': {
              borderRadius: '8px',
              height: '50px',
              '& textarea': {
                height: '100% !important',
              },
            },
          }}
        />
        <TextEditor value={content} setValue={setContent} />
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

export default PostingDialog;
