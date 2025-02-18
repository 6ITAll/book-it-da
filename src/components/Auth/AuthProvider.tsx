import { ReactNode } from 'react';
import { useAuthStateChange } from '@hooks/useAuthStateChange';

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps): JSX.Element => {
  useAuthStateChange();
  return <>{children}</>;
};
