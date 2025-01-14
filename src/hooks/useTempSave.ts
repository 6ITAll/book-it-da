import { useState, useEffect, useCallback, useMemo } from 'react';
import { Book } from '@shared/types/type';
import { debounce } from 'lodash';
import { TEMP_SAVE_STORAGE_KEY } from 'src/constants/postingWrite';
import { TempSaveData } from '@components/PostingWritePage/types';

export const useTempSave = (
  title: string,
  content: string,
  selectedBook: Book | null,
  bookFromDetail: Book | null,
  setTitle: (title: string) => void,
  setContent: (content: string) => void,
  setSelectedBook: (book: Book | null) => void,
  isEditing: boolean,
  hasBookFromDetail: boolean,
) => {
  const [showLoadDialog, setShowLoadDialog] = useState(false);
  const [tempSaveDate, setTempSaveDate] = useState<Date | null>(null);

  const debouncedSave = useMemo(
    () =>
      debounce((data: TempSaveData) => {
        const tempPosting = {
          ...data,
          date: new Date().toISOString(),
        };
        localStorage.setItem(
          TEMP_SAVE_STORAGE_KEY,
          JSON.stringify(tempPosting),
        );
      }, 500),
    [],
  );

  // 작성중인 글 로컬스토리지에 임시저장 (debounce 로 비효율적인 저장 방지)
  const saveTempPosting = useCallback(() => {
    if (title.trim() || content.trim() || selectedBook) {
      debouncedSave({
        title,
        content,
        selectedBook,
        date: new Date().toISOString(),
      });
    } else {
      localStorage.removeItem(TEMP_SAVE_STORAGE_KEY);
    }
  }, [debouncedSave, title, content, selectedBook]);

  // 컴포넌트 마운트시, 임시저장 글 적용
  useEffect(() => {
    if (isEditing || hasBookFromDetail) {
      return;
    }

    const tempPostingString = localStorage.getItem(TEMP_SAVE_STORAGE_KEY);
    if (tempPostingString) {
      const tempPosting: TempSaveData = JSON.parse(tempPostingString);
      if (
        tempPosting.title.trim() ||
        tempPosting.content.trim() ||
        (tempPosting.selectedBook &&
          Object.keys(tempPosting.selectedBook).length > 0)
      ) {
        setSelectedBook(tempPosting.selectedBook || null);
        setTitle(tempPosting.title || '');
        setContent(tempPosting.content || '');
        setTempSaveDate(new Date(tempPosting.date));
        setShowLoadDialog(true);
      } else {
        localStorage.removeItem(TEMP_SAVE_STORAGE_KEY);
      }
    }
  }, [
    bookFromDetail,
    setSelectedBook,
    setTitle,
    setContent,
    isEditing,
    hasBookFromDetail,
  ]);

  // 변경사항 있을 때마다 임시저장
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      saveTempPosting();
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [title, content, selectedBook, saveTempPosting]);

  // 설정한 정보 유지
  const loadTempPosting = useCallback(() => {
    const tempPostingString = localStorage.getItem(TEMP_SAVE_STORAGE_KEY);
    if (tempPostingString) {
      const tempPosting: TempSaveData = JSON.parse(tempPostingString);
      setTitle(tempPosting.title || '');
      setContent(tempPosting.content || '');
      setSelectedBook(tempPosting.selectedBook || null);
    }
    setShowLoadDialog(false);
  }, [setTitle, setContent, setSelectedBook]);

  // 취소 누르면 데이터 초기화
  const ignoreTempPosting = useCallback(() => {
    setSelectedBook(bookFromDetail || null);
    setTitle('');
    setContent('');
    localStorage.removeItem(TEMP_SAVE_STORAGE_KEY);
    setShowLoadDialog(false);
  }, [bookFromDetail, setSelectedBook, setTitle, setContent]);

  return {
    showLoadDialog,
    setShowLoadDialog,
    tempSaveDate,
    loadTempPosting,
    ignoreTempPosting,
    saveTempPosting,
  };
};
