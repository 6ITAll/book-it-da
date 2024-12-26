import { useState } from 'react';
import {
  Box,
  Typography,
  ToggleButton,
  ToggleButtonGroup,
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
import SortSelector from '@components/BookShelvesPage/SortSelector';
import { SortOption } from '@components/BookShelvesPage/SortSelector';
import { sortBooks } from '@components/BookShelvesPage/sortBooks';

const BookShelvesPage = () => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortOption, setSortOption] = useState<SortOption>('recent');
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

  const sortedBooks = sortBooks(mockBooks, sortOption);

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
        <SortSelector
          sortOption={sortOption}
          onSortChange={(option) => setSortOption(option)}
        />
      </Box>
      <Grid
        container
        spacing={4}
        sx={{
          alignItems: 'flex-end',
          mt: 2,
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
