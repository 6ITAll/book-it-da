import { useState, useEffect } from 'react';

export const useRememberMe = () => {
  const [rememberMe, setRememberMe] = useState<boolean>(false);
  const [savedUserId, setSavedUserId] = useState<string>('');

  const handleRememberMeChange = (userId: string, isChecked: boolean) => {
    setRememberMe(isChecked);
    console.log(userId);
    if (isChecked) {
      localStorage.setItem('savedUserId', userId);
    } else {
      localStorage.removeItem('savedUserId');
    }
  };

  useEffect(() => {
    const storedUserId = localStorage.getItem('savedUserId');
    console.log(storedUserId);
    if (storedUserId) {
      setSavedUserId(storedUserId);
      setRememberMe(true);
    }
  }, []);

  return { rememberMe, savedUserId, handleRememberMeChange };
};
