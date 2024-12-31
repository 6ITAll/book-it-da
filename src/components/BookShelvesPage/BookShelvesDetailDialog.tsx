import CommonBookCard from '@components/commons/CommonBookCard';
import HybridDialog from '@components/commons/HybridDialog';
import {
  Box,
  Button,
  Stack,
  ToggleButton,
  ToggleButtonGroup,
  Tooltip,
  Typography,
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
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import BookIcon from '@mui/icons-material/Book';
import EditIcon from '@mui/icons-material/Edit';
import Zoom from '@mui/material/Zoom';
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
      <Box
        sx={{
          width: '100%',
          height: '100px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          mb: '1rem',
          boxSizing: 'border-box',
        }}
      >
        {book && (
          <CommonBookCard
            image={book.imageUrl}
            title={book.bookTitle}
            author={book.author}
            sx={{
              width: '100%',
              display: 'flex !important',
              flexDirection: 'row !important',
              padding: '1rem',
              height: '100px',
              boxShadow: 'none',
              '& .MuiCardMedia-root': {
                width: '100px',
                height: '100%',
                padding: 'auto',
                borderRadius: '0',
              },
              '& .MuiCardContent-root': {
                flex: 1,
                padding: '1rem',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                boxSizing: 'border-box',
              },
              '& .MuiTypography-body1': {
                fontSize: '14px',
              },
              '& .MuiTypography-body2': {
                fontSize: '11px',
              },
            }}
          />
        )}
      </Box>

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
          variant="outlined"
          startIcon={<BookIcon />}
          sx={{
            fontSize: '14px',
            p: 1.5,
            flex: 1,
            backgroundColor: '#f0f0f0',
            color: '#333',
            border: 'none',
            borderRadius: '8px',
            '&:hover': {
              backgroundColor: '#eaeaea',
            },
          }}
        >
          책 정보
        </Button>
        <Button
          variant="outlined"
          startIcon={<EditIcon />}
          sx={{
            fontSize: '14px',
            flex: 1,
            backgroundColor: '#f0f0f0',
            color: '#333',
            border: 'none',
            borderRadius: '8px',
            '&:hover': {
              backgroundColor: '#eaeaea',
            },
          }}
        >
          글쓰기
        </Button>
        <Button
          variant="outlined"
          startIcon={<ShareIcon />}
          sx={{
            fontSize: '14px',
            flex: 1,
            backgroundColor: '#f0f0f0',
            color: '#333',
            border: 'none',
            borderRadius: '8px',
            '&:hover': {
              backgroundColor: '#eaeaea',
            },
          }}
        >
          공유하기
        </Button>
      </Box>
      <Stack>
        <Box
          sx={{
            width: '100%',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            px: 1.5,
            boxSizing: 'border-box',
            height: '6vh',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              gap: '7px',
            }}
          >
            <AutoStoriesIcon fontSize="small" />
            <Typography sx={{ fontSize: '14px' }}>독서 상태</Typography>
          </Box>
          <ToggleButtonGroup
            value={readingStatus}
            exclusive
            onChange={handleReadingStatus}
            aria-label="독서 상태"
            sx={{
              width: '40%',
              justifyContent: 'space-between',
              '& .MuiToggleButton-root': {
                width: '30px',
                height: '30px',
                minWidth: '30px',
                borderRadius: '50%',
                padding: '5px',
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
            <Tooltip
              title="읽고 싶은 책"
              placement="bottom"
              slots={{
                transition: Zoom,
              }}
            >
              <ToggleButton value="want" aria-label="읽고 싶은 책">
                <BookmarkIcon sx={{ fontSize: '1.2rem' }} />
              </ToggleButton>
            </Tooltip>
            <Tooltip
              title="읽고 있는 책"
              placement="bottom"
              slots={{
                transition: Zoom,
              }}
            >
              <ToggleButton value="reading" aria-label="읽고 있는 책">
                <MenuBookIcon sx={{ fontSize: '1.2rem' }} />
              </ToggleButton>
            </Tooltip>
            <Tooltip
              title="완독한 책"
              placement="bottom"
              slots={{
                transition: Zoom,
              }}
            >
              <ToggleButton value="done" aria-label="완독한 책">
                <DoneIcon sx={{ fontSize: '1.2rem' }} />
              </ToggleButton>
            </Tooltip>
          </ToggleButtonGroup>
        </Box>
        <Button
          fullWidth
          startIcon={<FavoriteBorderIcon />}
          sx={{
            height: '6vh',
            justifyContent: 'flex-start',
            px: 2,
            py: 1.5,
            border: 'none',
            borderRadius: 0,
            color: '#333',
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
            height: '6vh',
            px: 2,
            py: 1.5,
            border: 'none',
            borderRadius: 0,
            color: '#333',
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
          color="error"
          startIcon={<DeleteOutlineIcon />}
          sx={{
            justifyContent: 'flex-start',
            height: '6vh',
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
      </Stack>
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
