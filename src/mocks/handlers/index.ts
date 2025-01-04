import { bookshelvesHandlers } from './bookshelves';
import { libraryHandlers } from './library';

export const handlers = [...libraryHandlers, ...bookshelvesHandlers];
