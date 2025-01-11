import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';

const useSearchInput = () => {
  const [inputValue, setInputValue] = useState('');
  const [searchParams, setSearchParams] = useSearchParams();

  // 검색어 변경 함수
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  // 검색 실행 함수
  const handleSearch = () => {
    const trimmedQuery = inputValue.trim(); // 공백 제거
    if (trimmedQuery) {
      setSearchParams({ query: trimmedQuery }); // 검색어를 URL에 반영
    } else {
      setSearchParams({}); // 검색어가 없으면 URL 초기화
    }
  };

  return {
    inputValue,
    setInputValue,
    searchParams,
    handleInputChange,
    handleSearch,
  };
};

export default useSearchInput;
