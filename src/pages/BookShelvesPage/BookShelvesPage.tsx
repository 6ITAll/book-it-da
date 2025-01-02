import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box } from '@mui/material';
import Grid from '@mui/material/Grid2';
import ShelvesBookCard from '@components/BookShelvesPage/ShelvesBookcard/ShelvesBookCard';
import SortSelector, {
  SortOption,
} from '@components/BookShelvesPage/SortSelector';
import { sortBooks } from '@components/BookShelvesPage/sortBooks';
import ViewToggle, { ViewMode } from '@components/BookShelvesPage/ViewToggle';
import BookShelvesDetailDialog from '@components/BookShelvesPage/BookDetailDialog.tsx/BookDetailDialog';
import { SavedBook } from '@shared/types/type';
import BookshelfHeader from '@components/BookShelvesPage/BookShelvesHeader';
import {
  useDeleteBookFromShelfMutation,
  useGetBookshelfQuery,
} from '@features/BookShelvesPage/api/bookShelvesApi';
import {
  setViewMode,
  setSortOption,
} from '@features/BookShelvesPage/slice/bookShelvesSlice';
import type { RootState } from '@store/index';
import { useParams } from 'react-router-dom';

const BookShelvesPage = () => {
  const dispatch = useDispatch();
  const { viewMode, sortOption } = useSelector(
    (state: RootState) => state.bookshelves,
  );
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedBook, setSelectedBook] = useState<SavedBook | null>(null);
  const [deleteBook] = useDeleteBookFromShelfMutation();

  const { userId, bookshelfId } = useParams();

  const { data, error, isLoading } = useGetBookshelfQuery({
    userId: Number(userId),
    bookshelfId: Number(bookshelfId),
  });

  const handleMenuOpen = (
    event: React.MouseEvent<HTMLElement>,
    bookId: number,
  ) => {
    event.stopPropagation();
    const book = data?.books.find((book) => book.id === bookId);
    setSelectedBook(book || null);
    setOpenDialog(true);
  };

  const handleDeleteBook = async () => {
    if (!selectedBook) return;

    try {
      await deleteBook({
        userId: 1, // TODO: 실제 사용자 ID로 변경
        bookshelfId: selectedBook.bookshelfId,
        bookId: selectedBook.id,
      });
      setOpenDialog(false);
    } catch (error) {
      console.error('Failed to delete book:', error);
      // TODO: 에러 처리
    }
  };

  const handleViewModeChange = (mode: ViewMode) => {
    dispatch(setViewMode(mode));
  };

  const handleSortOptionChange = (option: SortOption) => {
    dispatch(setSortOption(option));
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading bookshelf</div>;
  if (!data) return null;

  const sortedBooks = sortBooks(data.books, sortOption);

  return (
    <Box sx={{ p: 3 }}>
      <BookshelfHeader name={data.bookshelfName} bookCount={data.totalCount} />

      <Box
        sx={{ display: 'flex', gap: 2, mb: 3, justifyContent: 'space-between' }}
      >
        <SortSelector
          sortOption={sortOption}
          onSortChange={handleSortOptionChange}
        />
        <ViewToggle viewMode={viewMode} onViewChange={handleViewModeChange} />
      </Box>

      <Grid
        container
        spacing={4}
        sx={{
          alignItems: 'flex-end',
          mt: 2,
        }}
      >
        {sortedBooks.map((book) => (
          <Grid
            key={book.id}
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
        key={`${userId}-${selectedBook?.id}`}
        openDialog={openDialog}
        setOpenDialog={setOpenDialog}
        handleDeleteBook={handleDeleteBook}
        book={selectedBook}
      />
    </Box>
  );
};

export default BookShelvesPage;
