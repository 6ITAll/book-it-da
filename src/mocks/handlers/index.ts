import { bookshelvesHandlers } from './bookshelves';
// import { feedHandlers } from './feed';
import { libraryHandlers } from './library';
// import { postingHandlers } from './posting';
import { kakaoHandlers } from './kakao';
import { userHandlers } from './user';

import { genderAgeHandlers } from './genderAge';
import { reviewHandlers } from './DetailPageReview';
import { postHandlers } from './DetailPagePost';
import { addToLibraryHandlers } from './addToLibrary';
// import { followHandlers } from './follow';
// import { savedPostingHandlers } from './savePosting';
export const handlers = [
  ...libraryHandlers,
  // ...feedHandlers,
  ...bookshelvesHandlers,
  ...postHandlers,
  // ...postingHandlers,
  ...kakaoHandlers,
  ...userHandlers,
  ...genderAgeHandlers,
  ...reviewHandlers,
  ...addToLibraryHandlers,
  // ...followHandlers,
  // ...savedPostingHandlers,
];
