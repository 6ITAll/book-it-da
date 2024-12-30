import { useState } from 'react';
import { Box, Typography } from '@mui/material';
import Grid from '@mui/material/Grid2';
import ShelvesBookCard from '@components/BookShelvesPage/ShelvesBookCard';
import {
  mockBooks,
  mockBookshelf,
} from '@components/BookShelvesPage/mockShelvesBooks';
import SortSelector from '@components/BookShelvesPage/SortSelector';
import { SortOption } from '@components/BookShelvesPage/SortSelector';
import { sortBooks } from '@components/BookShelvesPage/sortBooks';
import ViewToggle, { ViewMode } from '@components/BookShelvesPage/ViewToggle';
import BookShelvesDetailDialog from '@components/BookShelvesPage/BookShelvesDetailDialog';
import { Book } from '@shared/types/type';

const BookShelvesPage = () => {
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [sortOption, setSortOption] = useState<SortOption>('recent');
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);

  const handleMenuOpen = (
    event: React.MouseEvent<HTMLElement>,
    bookId: number,
  ) => {
    event.stopPropagation();
    const book = mockBooks.find((book) => book.id === bookId);
    setSelectedBook(book || null);
    setOpenDialog(true);
  };

  const handleDeleteBook = () => {
    setOpenDialog(false);
  };

  const sortedBooks = sortBooks(mockBooks, sortOption);

  return (
    <Box sx={{ p: 3 }}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          mb: 3,
          gap: '5px',
        }}
      >
        <Typography variant="h4">{mockBookshelf.name}</Typography>
        <Typography variant="body2" color="text.secondary">
          {mockBookshelf.bookCount}권
        </Typography>
      </Box>

      <Box
        sx={{ display: 'flex', gap: 2, mb: 3, justifyContent: 'space-between' }}
      >
        <SortSelector
          sortOption={sortOption}
          onSortChange={(option) => setSortOption(option)}
        />
        <ViewToggle viewMode={viewMode} onViewChange={setViewMode} />
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
              viewMode === 'grid' ? { xs: 6, sm: 4, md: 3, lg: 3, xl: 2 } : 12
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

      <BookShelvesDetailDialog
        openDialog={openDialog}
        setOpenDialog={setOpenDialog}
        handleDeleteBook={handleDeleteBook}
        book={selectedBook}
      />
    </Box>
  );
};

export default BookShelvesPage;
