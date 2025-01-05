import { bookshelvesHandlers } from './bookshelves';
import { libraryHandlers } from './library';
import { postingHandlers } from './posting';
import { kakaoHandlers } from './kakao';

export const handlers = [
  ...libraryHandlers,
  ...bookshelvesHandlers,
  ...postingHandlers,
  ...kakaoHandlers,
];
