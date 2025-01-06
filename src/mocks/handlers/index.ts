import { bookshelvesHandlers } from './bookshelves';
import { libraryHandlers } from './library';
import { postingHandlers } from './posting';
import { userHandlers } from './user';

export const handlers = [
  ...libraryHandlers,
  ...bookshelvesHandlers,
  ...postingHandlers,
  ...userHandlers,
];
