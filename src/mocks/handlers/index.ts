import { libraryHandlers } from './library';
import { postingHandlers } from './posting';

export const handlers = [...libraryHandlers, ...postingHandlers];
