import { bookshelvesHandlers } from './bookshelves';
import { libraryHandlers } from './library';
import { postingHandlers } from './posting';
import { kakaoHandlers } from './kakao';
import { userHandlers } from './user';

export const handlers = [
  ...libraryHandlers,
  ...bookshelvesHandlers,
  ...postingHandlers,
  ...kakaoHandlers,
  ...userHandlers,
];
