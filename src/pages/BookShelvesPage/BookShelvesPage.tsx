import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Container } from '@mui/material';
import Grid from '@mui/material/Grid2';
import ShelvesBookCard from '@components/BookShelvesPage/ShelvesBookcard/ShelvesBookCard';
import SortSelector, {
  SortOption,
} from '@components/BookShelvesPage/SortSelector';
import { sortBooks } from 'src/utils/BookShelvesPage/sortBooks';
import ViewToggle, { ViewMode } from '@components/BookShelvesPage/ViewToggle';
import BookShelvesDetailDialog from '@components/BookShelvesPage/BookDetailDialog/BookDetailDialog';
import { SavedBook } from '@shared/types/type';
import BookshelfHeader from '@components/BookShelvesPage/BookShelvesHeader';
import {
  useDeleteBookMutation,
  useGetBookshelfQuery,
} from '@features/BookShelvesPage/api/bookShelvesApi';
import {
  setViewMode,
  setSortOption,
} from '@features/BookShelvesPage/slice/bookShelvesSlice';
import type { RootState } from '@store/index';
import { useParams } from 'react-router-dom';
import { bookShelvesStyles } from '@components/BookShelvesPage/BookShelves.styles';

const BookShelvesPage = () => {
  const dispatch = useDispatch();
  const { viewMode, sortOption } = useSelector(
    (state: RootState) => state.bookshelves,
  );
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedBook, setSelectedBook] = useState<SavedBook | null>(null);
  const [deleteBook] = useDeleteBookMutation();

  const { userId, bookshelfId } = useParams();

  const { data, error, isLoading, refetch } = useGetBookshelfQuery({
    userId: Number(userId),
    bookshelfId: Number(bookshelfId),
  });

  const handleMenuOpen = (
    event: React.MouseEvent<HTMLElement>,
    bookId: number,
  ) => {
    event.stopPropagation();
    const book = data?.books.find((book) => book.itemId === bookId);
    setSelectedBook(book || null);
    setOpenDialog(true);
  };

  const handleDeleteBook = async () => {
    if (!selectedBook) return;

    try {
      await deleteBook({
        userId: Number(userId),
        bookshelfId: Number(bookshelfId),
        itemId: selectedBook.itemId,
      });
      setOpenDialog(false);
      refetch();
    } catch (error) {
      console.error('Failed to delete book:', error);
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
    <Container maxWidth="lg" sx={bookShelvesStyles.container}>
      <BookshelfHeader name={data.bookshelfName} bookCount={data.totalCount} />

      <Box sx={bookShelvesStyles.filterViewBox}>
        <SortSelector
          sortOption={sortOption}
          onSortChange={handleSortOptionChange}
        />
        <ViewToggle viewMode={viewMode} onViewChange={handleViewModeChange} />
      </Box>

      <Grid container spacing={4} sx={bookShelvesStyles.bookGridContainer}>
        {sortedBooks.map((book) => (
          <Grid
            key={book.itemId}
            size={
              viewMode === 'grid' ? { xs: 6, sm: 3, md: 2, lg: 2, xl: 2 } : 12
            }
            sx={bookShelvesStyles.bookGridItem}
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
        key={`${userId}-${selectedBook?.itemId}`}
        openDialog={openDialog}
        setOpenDialog={setOpenDialog}
        handleDeleteBook={handleDeleteBook}
        book={selectedBook!}
      />
    </Container>
  );
};

export default BookShelvesPage;
