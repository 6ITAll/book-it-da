import { bookshelvesHandlers } from './bookshelves';
import { feedHandlers } from './feed';
import { libraryHandlers } from './library';

export const handlers = [
  ...libraryHandlers,
  ...feedHandlers,
  ...bookshelvesHandlers,
];
