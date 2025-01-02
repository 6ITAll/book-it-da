import { libraryHandlers } from './library';
import { genderAgeHandlers } from './genderAge';
import { reviewHandlers } from './DetailPageReview';
import { postHandlers } from './DetailPagePost';
export const handlers = [
  ...libraryHandlers,
  ...genderAgeHandlers,
  ...reviewHandlers,
  ...postHandlers,
];
