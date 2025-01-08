import { SavedBook } from '@shared/types/type';
import { SortOption } from '../../components/BookShelvesPage/SortSelector';

export const sortBooks = (books: SavedBook[], sortOption: SortOption) => {
  return [...books].sort((a, b) => {
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
};
