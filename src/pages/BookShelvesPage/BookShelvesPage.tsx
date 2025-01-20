import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Container } from '@mui/material';
import Grid from '@mui/material/Grid2';
import ShelvesBookCard from '@components/BookShelvesPage/ShelvesBookcard/ShelvesBookCard';
import SortSelector from '@components/BookShelvesPage/SortSelector';

import ViewToggle from '@components/BookShelvesPage/ViewToggle';
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
  setBooks,
  setTotalCount,
  setBookshelfName,
  deleteBook as deleteBookAction,
} from '@features/BookShelvesPage/slice/bookShelvesSlice';
import type { RootState } from '@store/index';
import { useParams } from 'react-router-dom';
import { bookShelvesStyles } from '@components/BookShelvesPage/BookShelves.styles';
import { SortOption, ViewMode } from '@components/BookShelvesPage/types';
import { sortBooks } from 'src/utils/BookShelvesPage/sortBooks';

const BookShelvesPage = () => {
  const dispatch = useDispatch();
  const { viewMode, sortOption, books, totalCount, bookshelfName } =
    useSelector((state: RootState) => state.bookshelves);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedBook, setSelectedBook] = useState<SavedBook | null>(null);
  const [deleteBook] = useDeleteBookMutation();

  const { userId, bookshelfId } = useParams();

  const { data, error, isLoading } = useGetBookshelfQuery({
    userId: userId!,
    bookshelfId: Number(bookshelfId),
  });

  useEffect(() => {
    if (data) {
      dispatch(setBooks(data.books));
      dispatch(setTotalCount(data.totalCount));
      dispatch(setBookshelfName(data.bookshelfName));
    }
  }, [data, dispatch]);

  const handleMenuOpen = (
    event: React.MouseEvent<HTMLElement>,
    bookId: string,
  ) => {
    event.stopPropagation();
    const book = books.find((book) => book.isbn === bookId);
    setSelectedBook(book || null);
    setOpenDialog(true);
  };

  const handleDeleteBook = async () => {
    if (!selectedBook) return;

    try {
      await deleteBook({
        userId: userId!,
        bookshelfId: Number(bookshelfId),
        isbn: selectedBook.isbn,
      });
      dispatch(deleteBookAction(selectedBook.isbn));
      setOpenDialog(false);
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
      <BookshelfHeader name={bookshelfName} bookCount={totalCount} />

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
            key={book.isbn}
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
        key={`${userId}-${selectedBook?.isbn}`}
        openDialog={openDialog}
        setOpenDialog={setOpenDialog}
        handleDeleteBook={handleDeleteBook}
        book={selectedBook!}
      />
    </Container>
  );
};

export default BookShelvesPage;
