// pages/BookShelvesPage.tsx
import { useState } from 'react';
import {
  Box,
  Typography,
  ToggleButton,
  ToggleButtonGroup,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Button,
} from '@mui/material';
import Grid from '@mui/material/Grid2';
import { ViewModule, ViewList } from '@mui/icons-material';
import ShelvesBookCard from '@components/BookShelvesPage/ShelvesBookCard';
import {
  mockBooks,
  mockBookshelf,
} from '@components/BookShelvesPage/mockShelvesBooks';
import HybridDialog from '@components/commons/HybridDialog';

const BookShelvesPage = () => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortOption, setSortOption] = useState('recent');
  const [selectedBookId, setSelectedBookId] = useState<number | null>(null);
  const [openDialog, setOpenDialog] = useState(false);

  const handleMenuOpen = (
    event: React.MouseEvent<HTMLElement>,
    bookId: number,
  ) => {
    event.stopPropagation();
    setSelectedBookId(bookId);
    setOpenDialog(true);
  };

  const handleDeleteBook = () => {
    setOpenDialog(false);
    setSelectedBookId(null);
  };

  const sortedBooks = [...mockBooks].sort((a, b) => {
    switch (sortOption) {
      case 'recent':
        return new Date(b.savedAt).getTime() - new Date(a.savedAt).getTime();
      case 'title':
        return a.bookTitle.localeCompare(b.bookTitle);
      case 'author':
        return a.author.localeCompare(b.author);
      default:
        return 0;
    }
  });

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h4">{mockBookshelf.name}</Typography>
        <Box>
          <ToggleButtonGroup
            value={viewMode}
            exclusive
            onChange={(_, value) => value && setViewMode(value)}
          >
            <ToggleButton value="grid">
              <ViewModule />
            </ToggleButton>
            <ToggleButton value="list">
              <ViewList />
            </ToggleButton>
          </ToggleButtonGroup>
        </Box>
      </Box>

      <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
        <FormControl sx={{ minWidth: 120 }}>
          <InputLabel>정렬</InputLabel>
          <Select
            value={sortOption}
            label="정렬"
            onChange={(e) => setSortOption(e.target.value)}
          >
            <MenuItem value="recent">최근 저장순</MenuItem>
            <MenuItem value="title">제목순</MenuItem>
            <MenuItem value="author">저자순</MenuItem>
          </Select>
        </FormControl>
      </Box>
      <Grid
        container
        spacing={4}
        sx={{
          alignItems: 'flex-end',
          mt: 2, // 상단 여백 추가
        }}
      >
        {sortedBooks.map((book, index) => (
          <Grid
            key={index}
            size={
              viewMode === 'grid'
                ? { xs: 12, sm: 6, md: 4, lg: 3, xl: 2 }
                : { xs: 12, sm: 12, md: 12, lg: 12, xl: 12 }
            }
            sx={{ display: 'flex', flexDirection: 'column' }}
          >
            <ShelvesBookCard
              book={book}
              view={viewMode}
              onMenuOpen={handleMenuOpen}
            />
          </Grid>
        ))}
      </Grid>

      <HybridDialog
        open={openDialog}
        setOpen={setOpenDialog}
        title="책 관리"
        contentNode={
          <Box sx={{ width: '100%' }}>
            <Button
              fullWidth
              color="error"
              onClick={handleDeleteBook}
              sx={{ mt: 1 }}
            >
              삭제
            </Button>
          </Box>
        }
      />
    </Box>
  );
};

export default BookShelvesPage;
