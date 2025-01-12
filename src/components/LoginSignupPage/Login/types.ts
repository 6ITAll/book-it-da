import React from 'react';

export interface LoginMessage {
  content: string;
  isError: boolean;
}

export interface LoginProps {
  handleLogin: (e: React.FormEvent<HTMLFormElement> | null) => void;
}
