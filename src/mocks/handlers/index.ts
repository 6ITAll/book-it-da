import { bookshelvesHandlers } from './bookshelves';
import { feedHandlers } from './feed';
import { libraryHandlers } from './library';
import { postingHandlers } from './posting';
import { userHandlers } from './user';

export const handlers = [
  ...libraryHandlers,
  ...feedHandlers,
  ...bookshelvesHandlers,
  ...postingHandlers,
  ...userHandlers,
];
