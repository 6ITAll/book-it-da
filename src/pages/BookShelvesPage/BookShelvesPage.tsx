import { useState } from 'react';
import { Box } from '@mui/material';
import Grid from '@mui/material/Grid2';
import ShelvesBookCard from '@components/BookShelvesPage/ShelvesBookcard/ShelvesBookCard';
import {
  mockBooks,
  mockBookshelf,
} from '@components/BookShelvesPage/mockShelvesBooks';
import SortSelector from '@components/BookShelvesPage/SortSelector';
import { SortOption } from '@components/BookShelvesPage/SortSelector';
import { sortBooks } from '@components/BookShelvesPage/sortBooks';
import ViewToggle, { ViewMode } from '@components/BookShelvesPage/ViewToggle';
import BookShelvesDetailDialog from '@components/BookShelvesPage/BookDetailDialog.tsx/BookDetailDialog';
import { Book } from '@shared/types/type';
import BookshelfHeader from '@components/BookShelvesPage/BookShelvesHeader';

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
      {/* 책장 정보 */}
      <BookshelfHeader
        name={mockBookshelf.name}
        bookCount={mockBookshelf.bookCount}
      />

      <Box
        sx={{ display: 'flex', gap: 2, mb: 3, justifyContent: 'space-between' }}
      >
        <SortSelector
          sortOption={sortOption}
          onSortChange={(option) => setSortOption(option)}
        />
        <ViewToggle viewMode={viewMode} onViewChange={setViewMode} />
      </Box>
      {/* 책장 */}
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
              viewMode === 'grid' ? { xs: 6, sm: 3, md: 2, lg: 2, xl: 1.5 } : 12
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
