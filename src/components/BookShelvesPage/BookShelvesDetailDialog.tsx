import CommonBookCard from '@components/commons/CommonBookCard';
import HybridDialog from '@components/commons/HybridDialog';
import {
  Box,
  Button,
  Stack,
  ToggleButton,
  ToggleButtonGroup,
} from '@mui/material';
import { Book } from '@shared/types/type';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import DoneIcon from '@mui/icons-material/Done';
import { useState } from 'react';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import ShareIcon from '@mui/icons-material/Share';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

interface BookShelvesDetailDialogProps {
  openDialog: boolean;
  setOpenDialog: React.Dispatch<React.SetStateAction<boolean>>;
  handleDeleteBook: () => void;
  book: Book | null;
}

const BookShelvesDetailDialog = ({
  openDialog,
  setOpenDialog,
  handleDeleteBook,
  book,
}: BookShelvesDetailDialogProps) => {
  const [readingStatus, setReadingStatus] = useState<string | null>(null);

  const handleReadingStatus = (
    _: React.MouseEvent<HTMLElement>,
    newStatus: string | null,
  ) => {
    setReadingStatus(newStatus);
  };

  const contentNode = (
    <Stack sx={{ width: '100%', boxSizing: 'border-box' }}>
      {book && (
        <CommonBookCard
          image={book.imageUrl}
          title={book.bookTitle}
          author={book.author}
          sx={{
            mb: 2,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-start',
            // '& .card-media': {
            //   backgroundColor: '#d0d0d0',
            //   padding: '1rem 0',
            // },
            // '& .card-content': {
            //   display: 'flex',
            //   flexDirection: 'column',
            //   justifyContent: 'center',
            //   alignItems: 'center',
            // },
          }}
        />
      )}

      <Box
        sx={{
          width: '100%',
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          gap: 2,
          mt: 1,
          mb: 2,
        }}
      >
        <Button
          sx={{
            flex: 1,
            py: 1.5,
            backgroundColor: 'rgba(0, 0, 0, 0.04)',
            color: 'text.primary',
            border: 'none',
            '&:hover': {
              backgroundColor: 'rgba(0, 0, 0, 0.08)',
              border: 'none',
            },
          }}
        >
          책 정보
        </Button>
        <Button
          sx={{
            flex: 1,
            py: 1.5,
            backgroundColor: 'rgba(0, 0, 0, 0.04)',
            color: 'text.primary',
            border: 'none',
            '&:hover': {
              backgroundColor: 'rgba(0, 0, 0, 0.08)',
              border: 'none',
            },
          }}
        >
          글쓰기
        </Button>
      </Box>
      <Box
        sx={{
          width: '100%',
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          mb: 2,
        }}
      >
        <ToggleButtonGroup
          value={readingStatus}
          exclusive
          onChange={handleReadingStatus}
          aria-label="독서 상태"
          sx={{
            width: '60%',
            justifyContent: 'space-between',
            gap: 2,
            '& .MuiToggleButton-root': {
              width: '40px',
              height: '40px',
              minWidth: '40px',
              borderRadius: '50%',
              padding: '8px',
              border: '1px solid rgba(0, 0, 0, 0.12)',
              '&[value="want"].Mui-selected': {
                backgroundColor: '#90A595',
                color: 'white',
                '&:hover': {
                  backgroundColor: '#7A8F7F',
                },
              },
              '&[value="reading"].Mui-selected': {
                backgroundColor: '#D4A088',
                color: 'white',
                '&:hover': {
                  backgroundColor: '#BF8A72',
                },
              },
              '&[value="done"].Mui-selected': {
                backgroundColor: '#9B8AA6',
                color: 'white',
                '&:hover': {
                  backgroundColor: '#857491',
                },
              },
            },
          }}
        >
          <ToggleButton value="want" aria-label="읽고 싶은 책">
            <BookmarkIcon sx={{ fontSize: '1.2rem' }} />
          </ToggleButton>
          <ToggleButton value="reading" aria-label="읽고 있는 책">
            <MenuBookIcon sx={{ fontSize: '1.2rem' }} />
          </ToggleButton>
          <ToggleButton value="done" aria-label="완독한 책">
            <DoneIcon sx={{ fontSize: '1.2rem' }} />
          </ToggleButton>
        </ToggleButtonGroup>
      </Box>
      <Box
        sx={{
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          borderTop: '1px solid rgba(0, 0, 0, 0.12)',
          borderBottom: '1px solid rgba(0, 0, 0, 0.12)',
        }}
      >
        <Button
          fullWidth
          startIcon={<FavoriteBorderIcon />}
          sx={{
            justifyContent: 'flex-start',
            px: 2,
            py: 1.5,
            border: 'none',
            borderRadius: 0,
            '&:hover': {
              backgroundColor: 'rgba(0, 0, 0, 0.04)',
              border: 'none',
            },
          }}
        >
          좋아요
        </Button>
        <Button
          fullWidth
          startIcon={<BookmarkBorderIcon />}
          sx={{
            justifyContent: 'flex-start',
            px: 2,
            py: 1.5,
            border: 'none',
            borderRadius: 0,
            '&:hover': {
              backgroundColor: 'rgba(0, 0, 0, 0.04)',
              border: 'none',
            },
          }}
        >
          책장에 담기
        </Button>
        <Button
          fullWidth
          startIcon={<ShareIcon />}
          sx={{
            justifyContent: 'flex-start',
            px: 2,
            py: 1.5,
            border: 'none',
            borderRadius: 0,
            '&:hover': {
              backgroundColor: 'rgba(0, 0, 0, 0.04)',
              border: 'none',
            },
          }}
        >
          공유하기
        </Button>
        <Button
          fullWidth
          color="error"
          startIcon={<DeleteOutlineIcon />}
          sx={{
            justifyContent: 'flex-start',
            px: 2,
            py: 1.5,
            border: 'none',
            borderRadius: 0,
            '&:hover': {
              backgroundColor: 'rgba(0, 0, 0, 0.04)',
              border: 'none',
            },
          }}
          onClick={handleDeleteBook}
        >
          책장에서 삭제
        </Button>
      </Box>
    </Stack>
  );
  return (
    <>
      <HybridDialog
        open={openDialog}
        setOpen={setOpenDialog}
        title="책 관리"
        contentNode={contentNode}
      />
    </>
  );
};

export default BookShelvesDetailDialog;
