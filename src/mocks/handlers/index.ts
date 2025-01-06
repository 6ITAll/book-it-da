import { bookshelvesHandlers } from './bookshelves';
import { feedHandlers } from './feed';
import { libraryHandlers } from './library';
import { postingHandlers } from './posting';
import { kakaoHandlers } from './kakao';
import { userHandlers } from './user';

export const handlers = [
  ...libraryHandlers,
  ...feedHandlers,
  ...bookshelvesHandlers,
  ...postingHandlers,
  ...kakaoHandlers,
  ...userHandlers,
];
