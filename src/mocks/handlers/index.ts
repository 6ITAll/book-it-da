import { genderAgeHandlers } from './genderAge';
import { reviewHandlers } from './DetailPageReview';
import { postHandlers } from './DetailPagePost';
export const handlers = [
  ...postHandlers,
  ...genderAgeHandlers,
  ...reviewHandlers,
];
