import { bookshelvesHandlers } from './bookshelves';
import { libraryHandlers } from './library';
import { postingHandlers } from './posting';
import { genderAgeHandlers } from './genderAge';
import { reviewHandlers } from './DetailPageReview';
import { postHandlers } from './DetailPagePost';

export const handlers = [
  ...libraryHandlers,
  ...bookshelvesHandlers,
  ...postingHandlers,
  ...genderAgeHandlers,
  ...reviewHandlers,
  ...postHandlers,
];
