import { feedHandlers } from './feed';
import { libraryHandlers } from './library';

export const handlers = [...libraryHandlers, ...feedHandlers];
