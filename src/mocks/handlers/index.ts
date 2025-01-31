import { bookshelvesHandlers } from './bookshelves';
import { libraryHandlers } from './library';
import { kakaoHandlers } from './kakao';
// import { userHandlers } from './user';

import { genderAgeHandlers } from './genderAge';
import { reviewHandlers } from './DetailPageReview';
import { postHandlers } from './DetailPagePost';
import { addToLibraryHandlers } from './addToLibrary';
export const handlers = [
  ...libraryHandlers,
  ...bookshelvesHandlers,
  ...postHandlers,
  ...kakaoHandlers,
  // ...userHandlers,
  ...genderAgeHandlers,
  ...reviewHandlers,
  ...addToLibraryHandlers,
];
