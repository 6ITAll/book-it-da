import { SortOption } from '@components/BookShelvesPage/types';
import { SavedBook } from '@shared/types/type';

export const sortBooks = (books: SavedBook[], sortOption: SortOption) => {
  return [...books].sort((a, b) => {
    switch (sortOption) {
      case 'recent':
        return new Date(b.addedAt).getTime() - new Date(a.addedAt).getTime();
      case 'title':
        return a.title.localeCompare(b.title);
      case 'author':
        return a.author.localeCompare(b.author);
      default:
        return 0;
    }
  });
};
