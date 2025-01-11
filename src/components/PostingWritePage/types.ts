import { Book } from '@shared/types/type';

export interface TempSaveData {
  title: string;
  content: string;
  selectedBook: Book | null;
  date: string;
}
