import { bookshelvesHandlers } from './bookshelves';
import { libraryHandlers } from './library';
import { postingHandlers } from './posting';
import { genderAgeHandlers } from './genderAge';
import { reviewHandlers } from './DetailPageReview';
import { postHandlers } from './DetailPagePost';
import { addToLibraryHandlers } from './addToLibrary';
export const handlers = [
  ...libraryHandlers,
  ...bookshelvesHandlers,
  ...postHandlers,
  ...postingHandlers,
  ...genderAgeHandlers,
  ...reviewHandlers,
  ...addToLibraryHandlers,
];
