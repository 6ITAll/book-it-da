import { useState, useEffect } from 'react';

export const useRememberMe = () => {
  const [rememberMe, setRememberMe] = useState<boolean>(false);
  const [savedUserEmail, setSavedUseEmail] = useState<string>('');

  const handleRememberMeChange = (userEmail: string, isChecked: boolean) => {
    setRememberMe(isChecked);
    if (isChecked) {
      localStorage.setItem('savedUserId', userEmail);
    } else {
      localStorage.removeItem('savedUserId');
    }
  };

  useEffect(() => {
    const storedUserEmail = localStorage.getItem('savedUserId');
    console.log(storedUserEmail);
    if (storedUserEmail) {
      setSavedUseEmail(storedUserEmail);
      setRememberMe(true);
    }
  }, []);

  return { rememberMe, savedUserEmail, handleRememberMeChange };
};
