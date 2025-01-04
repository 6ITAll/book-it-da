import { bookshelvesHandlers } from './bookshelves';
import { libraryHandlers } from './library';
import { postingHandlers } from './posting';

export const handlers = [
  ...libraryHandlers,
  ...bookshelvesHandlers,
  ...postingHandlers,
];
